from django.core.management.base import BaseCommand
from api.models import WebsiteSection

class Command(BaseCommand):
    help = 'Populate the WebsiteSection table with predefined content'

    def handle(self, *args, **options):
        sections = [
            {
                "section_id": "hero-section",
                "title": "Hero Section",
                "description": "Empowering Digital Innovation & Transformation with Autopods",
                "content": (
                    "Reimagining Enterprise Software in the age of Generative AI. "
                    "Innovate faster. Transform faster. Predictable outcome with Autopods. "
                    "Build As You Think. Custom Software-As-A-Service (C-SaaS). "
                    "Supercharging your software development to deliver AI driven tailored solutions."
                )
            },
            {
                "section_id": "about-section",
                "title": "About Section",
                "description": "Unlocking AI’s Potential with the 3Ps",
                "content": (
                    "1. Productivity: Streamline and optimise existing software or business processes to enhance efficiency & speed. "
                    "2. Possibilities: Transform previously impossible use-cases into reality, enabling innovative solutions. "
                    "3. Pioneering: Explore and develop use-cases that push the boundaries of what's imaginable."
                )
            },
            {
                "section_id": "autopods-section",
                "title": "Autopods Section",
                "description": "Introducing Autopods: Revolutionizing Development with Dev41",
                "content": (
                    "Autopods are cross-functional teams consisting of full stack engineers, engineering & product managers, "
                    "working alongside Gen AI agents. This approach ensures robust, end-to-end products and services tailored to your specific needs."
                )
            },
            {
                "section_id": "services-section",
                "title": "Services Section",
                "description": "Our Key Differentiators",
                "content": (
                    "POC to Production: Transforming GenAI proof of concepts into robust, scalable solutions. "
                    "Conversational AI at Scale: Building scalable, low-cost voice systems. "
                    "Custom Agent Development: Developing autonomous, adaptive AI agents that predict, recommend, and evolve."
                )
            },
            {
                "section_id": "press-section",
                "title": "Press Section",
                "description": "Press Section",
                "content": "No content"
            },
            {
                "section_id": "demo-section",
                "title": "Demo Section",
                "description": "Demo Section",
                "content": (
                    "RQ: An audio-based user interface for engaging with a virtual agent. "
                    "Recruit41: An AI-driven platform automating interviews. "
                    "Podcast: A platform creating fully automated podcast episodes based on user input."
                )
            }
        ]

        for section in sections:
            WebsiteSection.objects.update_or_create(
                section_id=section['section_id'],
                defaults={
                    'title': section['title'],
                    'description': section['description'],
                    'content': section['content'],
                    'is_active': True
                }
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully populated WebsiteSection data'))