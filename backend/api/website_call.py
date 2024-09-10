from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from .gpt_assistant import GPTAssistant
from .ai_models import AIModelFactory
from .models import WebsiteSection
import logging
import random

logger = logging.getLogger(__name__)

def generate_response_website(user_input, relevant_content, model_name, section_info, user_context=None):
    ai_model = AIModelFactory.get_model(model_name)
    
    context = "\n".join([f"{content.title}:\n{content.content}" for content in relevant_content])
    
    section_context = f"Section ID: {section_info.section_id}\nTitle: {section_info.title}\nDescription: {section_info.description}\nContent: {section_info.content}"
    
    # Customize prompt based on section
    if section_info.section_id == 'services-section':
        section_specific_instruction = "Focus on explaining Think41's services in detail, highlighting their unique aspects and benefits."
    elif section_info.section_id == 'autopods-section':
        section_specific_instruction = "Emphasize the concept of Autopods and how they revolutionize software development."
    elif section_info.section_id == 'hero-section':
        section_specific_instruction = "Provide an overview of Think41's mission and value proposition."
    else:
        section_specific_instruction = "Provide general information about Think41 relevant to the current section."
    
    # Format user context if provided
    user_context_str = ""
    if user_context:
        user_context_str = "User Context:\n" + "\n".join([f"{key}: {value}" for key, value in user_context.items()])
    
    prompt = f"""You are an AI assistant for Think41, a technology consulting company specializing in Custom Software as a Service (CSaaS) and leveraging Generative AI. Your role is to provide helpful information about Think41 and assist users navigating the website. Maintain a professional, friendly, and concise tone.

User query: '{user_input}'

Relevant information from the database:
{context}

Current section information:
{section_context}

{user_context_str}

{section_specific_instruction}

Guidelines:
1. Provide a concise response (50-100 words) that directly addresses the user's query.
2. Use the relevant information provided to answer the query accurately.
3. Tailor your response to the current section of the website.
4. If user context is provided, use it to personalize the response.
5. Highlight Think41's expertise in GenAI and custom software development.
6. If asked about specific services or Autopods, provide detailed information.
7. For questions about founders or company background, offer relevant insights.
8. If the information isn't available in the context, suggest contacting Think41 for more details.

Response:"""

    ai_response = ai_model.generate_response(prompt)
    
    engagement_phrases = [
        "Is there anything else you'd like to know about Think41's services or approach?",
        "How else can I assist you with information about our GenAI solutions?",
        "Do you have any other questions about Think41's expertise or Autopods?",
        "What other aspects of our custom software development would you like to explore?",
    ]
    
    if ai_response:
        response = f"{ai_response.strip()}\n\n{random.choice(engagement_phrases)}"
    else:
        response = "I apologize, but I'm having trouble generating a response. Is there a specific aspect of Think41's services or GenAI solutions you'd like to know more about?"

    return response

def generate_general_response(user_input, relevant_content, model_name):
    ai_model = AIModelFactory.get_model(model_name)
    
    context = "\n".join([f"{content.title}:\n{content.content}" for content in relevant_content])
    
    prompt = f"""You are an AI assistant for Think41, a technology consulting company specializing in Custom Software as a Service (CSaaS) and leveraging Generative AI. Your role is to provide helpful information about Think41 and assist users navigating the website. Maintain a professional, friendly, and concise tone.

User query: '{user_input}'

Relevant information from the database:
{context}

Guidelines:
1. Provide a concise response (50-100 words) that directly addresses the user's query.
2. Use the relevant information provided to answer the query accurately.
3. Highlight Think41's expertise in GenAI and custom software development.
4. If asked about specific services or Autopods, provide general information.
5. For questions about founders or company background, offer relevant insights.
6. If the information isn't available in the context, suggest contacting Think41 for more details.

Response:"""

    ai_response = ai_model.generate_response(prompt)
    
    engagement_phrases = [
        "Is there anything else you'd like to know about Think41?",
        "How else can I assist you with information about our company?",
        "Do you have any other questions about Think41's services or approach?",
        "What other aspects of our company would you like to explore?",
    ]
    
    if ai_response:
        response = f"{ai_response.strip()}\n\n{random.choice(engagement_phrases)}"
    else:
        response = "I apologize, but I'm having trouble generating a response. Is there a specific aspect of Think41 you'd like to know more about?"

    return response

def fetch_section_info(section_id):
    try:
        section_info = WebsiteSection.objects.get(section_id=section_id)
        logger.info(f"Fetched section information: Section ID: {section_info.section_id}, "
                    f"Title: {section_info.title}, "
                    f"Description: {section_info.description}, "
                    f"Content: {section_info.content}, "
                    f"Is Active: {section_info.is_active}")
        return section_info
    except WebsiteSection.DoesNotExist:
        logger.error(f"Section ID not found: {section_id}")
        return None

@csrf_exempt
@require_http_methods(["POST"])
def website_interaction(request):
    try:
        data = json.loads(request.body)
        user_input = data.get('user_input')
        model_name = data.get('model_name', '4o-mini')
        section_id = data.get('section_id')
        user_context = data.get('user_context')  # This can be None if not provided

        assistant = GPTAssistant(current_page='home', model_name=model_name)
        
        # Implement RAG by searching for relevant content
        relevant_content = assistant.search_relevant_content(user_input)
        
        # Fetch section information
        section_info = fetch_section_info(section_id)
        
        if section_info:
            # Generate response using the relevant content, section information, and user context
            response = generate_response_website(user_input, relevant_content, model_name, section_info, user_context)
            current_section = section_info.title
        else:
            # Use the general response function when section_id is not found
            response = generate_general_response(user_input, relevant_content, model_name)
            current_section = "General"

        return JsonResponse({
            'response': response,
            'has_more_info': bool(relevant_content),
            'relevant_content': [
                {
                    'title': content.title,
                    'content_type': content.content_type,
                    'snippet': content.content[:100] + '...' if len(content.content) > 100 else content.content
                } for content in relevant_content
            ],
            'current_section': current_section
        })
    except json.JSONDecodeError:
        logger.error("Invalid JSON in request body")
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        logger.error(f"Error in website_interaction: {str(e)}", exc_info=True)
        return JsonResponse({'error': 'Internal server error'}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def know_more_about_service(request):
    try:
        data = json.loads(request.body)
        service_name = data.get('service_name')
        model_name = data.get('model_name', '4o-mini')
        
        if not service_name:
            return JsonResponse({'error': 'Service name is required'}, status=400)
        
        assistant = GPTAssistant(current_page='services', model_name=model_name)
        
        # Implement RAG by searching for relevant content about the service
        relevant_content = assistant.search_relevant_content(service_name)
        
        # Fetch section information
        section_info = fetch_section_info('services-section')
        if not section_info:
            return JsonResponse({'error': 'Section ID not found'}, status=404)
        
        # Custom prompt for the know_more_about_service function
        context = "\n".join([f"{content.title}:\n{content.content}" for content in relevant_content])
        prompt = f"""You are an AI assistant for Think41, a technology consulting company with a product mindset. Your role is to provide detailed information about Think41's services. Maintain a professional, friendly, and concise tone.

Service: {service_name}

Relevant information from the database:
{context}

Section information:
Section ID: {section_info.section_id}
Title: {section_info.title}
Description: {section_info.description}
Content: {section_info.content}

Guidelines:
1. Provide a detailed response (100-150 words) that elaborates on the service.
2. Use the relevant information provided to answer accurately.
3. Highlight the benefits and features of the service.
4. If the user asks for additional information, elaborate on the details from the relevant content.
5. Focus on how Think41's services can help businesses.
6. If the information isn't available in the context, suggest contacting Think41 for more details.

Response:"""
        
        # Use the GPT4oMiniModel to generate the response
        ai_model = AIModelFactory.get_model(model_name)
        ai_response = ai_model.generate_response(prompt)
        
        engagement_phrases = [
            "Is there anything else you'd like to know about this service?",
            "How else can I assist you with information about our services?",
            "Do you have any other questions about this service?",
            "What other aspects of this service would you like to explore?",
        ]
        
        if ai_response:
            response = f"{ai_response.strip()}\n\n{random.choice(engagement_phrases)}"
        else:
            response = "I apologize, but I'm having trouble generating a response. Is there a specific aspect of this service you'd like to know more about?"

        return JsonResponse({
            'response': response,
            'service_name': service_name,
            'has_more_info': bool(relevant_content),
            'relevant_content': [
                {
                    'title': content.title,
                    'content_type': content.content_type,
                    'snippet': content.content[:100] + '...' if len(content.content) > 100 else content.content
                } for content in relevant_content
            ]
        })
    except json.JSONDecodeError:
        logger.error("Invalid JSON in request body")
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        logger.error(f"Error in know_more_about_service: {str(e)}", exc_info=True)
        return JsonResponse({'error': 'Internal server error'}, status=500)



