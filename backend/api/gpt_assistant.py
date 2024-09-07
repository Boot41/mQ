import logging
from .models import UniversalContent
from .ai_models import AIModelFactory
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank, TrigramSimilarity
from django.db.models import Q, F, Value, FloatField, ExpressionWrapper
from django.db.models.functions import Coalesce, Greatest
import random

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GPTAssistant:
    def __init__(self, is_tour_started=False, current_page='home', model_name='4o-mini'):
        self.is_tour_started = is_tour_started
        self.current_page = current_page
        self.model_name = model_name
        self.ai_model = AIModelFactory.get_model(model_name)
        self.full_response = ""
        self.engagement_phrases = [
            "What would you like to explore next?",
            "Is there a particular aspect you're curious about?",
            "How can I provide more detailed information for you?",
            "Which part of Think41 intrigues you the most?",
            "What other areas of our company would you like to discover?",
            "Is there anything specific you'd like me to elaborate on?",
            "Where shall we focus our exploration next?",
            "What other questions do you have about Think41?",
            "How else can I assist you in learning about our company?",
            "Which of our services or areas would you like to know more about?"
        ]

    def generate_response(self, user_input):
        logger.info(f"Generating response for user input: {user_input}")
        context = self.get_context(user_input)
        
        # Prepare a more robust prompt for the AI model
        prompt = f"""You are an AI assistant for Think41, a technology consulting company with a product mindset. Your role is to act as a knowledgeable and helpful concierge for the Think41 website, providing a tour and relevant information about the company. Always maintain a professional, friendly, and helpful tone.

Current page: {self.current_page}
Tour started: {"Yes" if self.is_tour_started else "No"}

Based on the following information about Think41, please respond to the user's input: '{user_input}'

Context:
{context}

Guidelines:
1. Provide a concise initial response (50-75 words) that addresses the main point of the user's query.
2. Follow the initial response with "Would you like to know more about this?" to offer additional information.
3. If the user asks about Think41's services, founders, background, or any related information, focus on the most relevant details in the initial response.
4. For website tours:
   a. If the tour hasn't started and the user asks to start a tour, respond enthusiastically and mention that you'll guide them through the main sections (Home, Services, About Us, Contact).
   b. If the tour is in progress and the user asks for the next step, provide information about the next section and how to navigate there.
   c. Briefly mention the main sections (Home, Services, About Us, Contact) in the initial response when discussing the tour.
5. If asked about navigating to a specific page, provide brief instructions in the initial response.
6. For unrelated questions, politely redirect to Think41 topics in the initial response.
7. Address inappropriate language with a brief, polite message about professional communication.
8. If unsure, offer to help find information on the Think41 website or suggest contacting Think41 directly.
9. Always maintain a professional, friendly, and helpful tone.
10. If the user asks to end the tour, confirm that the tour has ended and offer to answer any other questions about Think41.

Initial Response:"""
        
        # Call the AI model to generate a response
        ai_response = self.ai_model.generate_response(prompt)
        
        if ai_response:
            # Remove the fixed phrase from the AI response
            ai_response = ai_response.replace("Would you like to know more about this?", "").strip()
            
            # Choose a random engagement phrase
            engagement_phrase = random.choice(self.engagement_phrases)
            
            # Combine the AI response with the engagement phrase
            response = f"{ai_response}\n\n{engagement_phrase}"
            
            # Store the full response without the engagement phrase
            self.full_response = ai_response
        else:
            response = "I apologize, but I'm having trouble generating a response at the moment. How else can I assist you with information about Think41 or help you navigate our website?"
            self.full_response = ""

        logger.info(f"Generated initial response: {response[:100]}...")  # Log first 100 chars of response

        return {
            "response": response,
            "current_page": self.current_page,
            "is_tour_started": self.is_tour_started,
            "has_more_info": bool(self.full_response)
        }

    def get_more_info(self):
        if self.full_response:
            return {"response": self.full_response}
        else:
            return {"response": "I'm sorry, but I don't have any additional information on this topic at the moment. Is there anything else you'd like me to elaborate on regarding Think41 or navigating our website?"}

    def get_context(self, user_input):
        relevant_content = self.search_relevant_content(user_input)
        context = ""
        
        if relevant_content:
            logger.info(f"Found {len(relevant_content)} relevant content items")
            for content in relevant_content:
                logger.info(f"Content item: Title: {content.title}, Type: {content.content_type}")
                context += f"{content.title}:\n{content.content}\n\n"
        else:
            logger.info("No relevant content found, using default context")
            context = "No specific context found in the database. Please provide a general response based on the user's input."

        return context

    def search_relevant_content(self, query):
        logger.info(f"Searching for relevant content with query: {query}")

        # Normalize the query
        normalized_query = query.lower().strip()

        # Create a more sophisticated search query
        search_query = SearchQuery(normalized_query, config='english')

        # Use both full-text search and trigram similarity
        relevant_content = UniversalContent.objects.annotate(
            search_rank=Coalesce(SearchRank(F('search_vector'), search_query), Value(0.0)),
            title_rank=Coalesce(SearchRank(F('search_vector'), SearchQuery(normalized_query, config='english', search_type='phrase')), Value(0.0)),
            content_rank=Coalesce(SearchRank(F('search_vector'), search_query), Value(0.0)),
            trigram_similarity_title=TrigramSimilarity('title', normalized_query),
            trigram_similarity_content=TrigramSimilarity('content', normalized_query),
            combined_rank=ExpressionWrapper(
                F('search_rank') * 2 +
                F('title_rank') * 3 +
                F('content_rank') * 1.5 +
                Greatest(F('trigram_similarity_title') * 2, F('trigram_similarity_content')),
                output_field=FloatField()
            )
        ).filter(
            Q(search_vector=search_query) |
            Q(title__icontains=normalized_query) |
            Q(content__icontains=normalized_query) |
            Q(trigram_similarity_title__gt=0.1) |
            Q(trigram_similarity_content__gt=0.1)
        ).order_by('-combined_rank')

        logger.info(f"Initial search found {relevant_content.count()} results")

        # If no results or low-quality results, try splitting the query into words and search again
        if not relevant_content.exists() or relevant_content.first().combined_rank < 0.1:
            logger.info("No results or low-quality results found, trying word-by-word search")
            words = normalized_query.split()
            q_objects = Q()
            for word in words:
                q_objects |= Q(title__icontains=word) | Q(content__icontains=word)
            
            word_by_word_content = UniversalContent.objects.filter(q_objects).distinct().annotate(
                search_rank=Coalesce(SearchRank(F('search_vector'), SearchQuery(' '.join(words), config='english')), Value(0.0)),
                title_rank=Coalesce(SearchRank(F('search_vector'), SearchQuery(' '.join(words), config='english', search_type='phrase')), Value(0.0)),
                content_rank=Coalesce(SearchRank(F('search_vector'), SearchQuery(' '.join(words), config='english')), Value(0.0)),
            )

            # Handle trigram similarity for single and multiple words
            if len(words) == 1:
                word_by_word_content = word_by_word_content.annotate(
                    trigram_similarity_title=TrigramSimilarity('title', words[0]),
                    trigram_similarity_content=TrigramSimilarity('content', words[0])
                )
            else:
                word_by_word_content = word_by_word_content.annotate(
                    trigram_similarity_title=Greatest(*[TrigramSimilarity('title', word) for word in words]),
                    trigram_similarity_content=Greatest(*[TrigramSimilarity('content', word) for word in words])
                )

            relevant_content = word_by_word_content.annotate(
                combined_rank=ExpressionWrapper(
                    F('search_rank') * 2 +
                    F('title_rank') * 3 +
                    F('content_rank') * 1.5 +
                    Greatest(F('trigram_similarity_title') * 2, F('trigram_similarity_content')),
                    output_field=FloatField()
                )
            ).order_by('-combined_rank')

            logger.info(f"Word-by-word search found {relevant_content.count()} results")

        results = relevant_content.filter(combined_rank__gt=0.01)[:5]  # Return top 5 results with a minimum rank
        logger.info(f"Returning top {len(results)} results")
        
        # Log the titles of the results for debugging
        for result in results:
            logger.info(f"Result: {result.title} (Combined Rank: {result.combined_rank:.4f}, "
                        f"Search Rank: {result.search_rank:.4f}, Title Rank: {result.title_rank:.4f}, "
                        f"Content Rank: {result.content_rank:.4f}, "
                        f"Trigram Sim Title: {result.trigram_similarity_title:.4f}, "
                        f"Trigram Sim Content: {result.trigram_similarity_content:.4f})")

        return results

def gpt_assistant(prompt, prompt_type='create', model_name='4o-mini'):
    assistant = GPTAssistant(model_name=model_name)
    return assistant.generate_response(prompt)