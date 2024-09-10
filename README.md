# Think41 Website

## Description
Think41 Website is a cutting-edge web application showcasing the services and capabilities of Think41, a company focused on AI-driven solutions and digital transformation. Built with React for the frontend and Django for the backend, this project demonstrates modern web development practices and integrates advanced AI features.

## Features
- Responsive design optimized for various devices and screen sizes
- Interactive UI components for engaging user experience
- AI-powered chatbot assistant for instant customer support
- Comprehensive sections including About Us, Services, Case Studies, and Careers
- Dynamic content management through Django backend API
- Seamless integration of AI technologies in web applications

## Technologies Used
- Frontend:
  - React 18
  - Tailwind CSS for styling
  - Framer Motion for smooth animations
  - PrimeReact for advanced UI components
- Backend:
  - Django 4.2
  - Django REST Framework for API development
  - PostgreSQL for database management
- AI Integration:
  - TensorFlow.js for client-side AI capabilities
  - Custom AI models for chatbot and predictive features
- Deployment:
  - Docker for containerization
  - Gunicorn as WSGI HTTP Server
  - Nginx as reverse proxy

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later) or yarn
- Python 3.12.3
- Docker and Docker Compose (for containerized deployment)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/think41/think41-website.git
   cd think41-website
   ```

2. Install frontend dependencies:
   ```
   cd client
   npm install
   ```

3. Install backend dependencies:
   ```
   cd ../backend
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the backend directory and add necessary environment variables, including database credentials and API keys.

### Running the Application

#### Development Mode

1. Start the frontend development server:
   ```
   cd client
   npm start
   ```

2. Start the backend development server:
   ```
   cd backend
   python manage.py runserver
   ```

3. Access the application at `http://localhost:3000`

#### Production Mode

Use Docker Compose to build and run the application:

```
docker-compose up --build
```

Access the application at `http://localhost:8080`

## Project Structure
- `/client`: React frontend application
  - `/src`: Source code for React components and logic
  - `/public`: Static assets and index.html
- `/backend`: Django backend application
  - `/api`: Django REST Framework API views and serializers
  - `/core`: Core application logic and models
- `Dockerfile`: Docker configuration for deployment
- `docker-compose.yml`: Docker Compose configuration for local development and production

## API Documentation
API documentation is available at `/api/docs/` when running the backend server. This documentation is generated using Django REST Framework's built-in tools and provides detailed information about available endpoints, request/response formats, and authentication requirements.

## Contributing
We welcome contributions to the Think41 Website project! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Testing
- Frontend: Run `npm test` in the `/client` directory to execute React component tests using Jest and React Testing Library.
- Backend: Run `python manage.py test` in the `/backend` directory to run Django tests.

## Deployment
Deployment instructions for various platforms (e.g., AWS, Heroku, DigitalOcean) can be found in the [DEPLOYMENT.md](DEPLOYMENT.md) file.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments
- The Think41 team for their innovative vision and continuous support
- All contributors who have dedicated their time and expertise to this project
- Open-source community for the amazing tools and libraries that made this project possible

## Contact
For any inquiries or support, please contact us at support@think41.com or visit our website at https://www.think41.com.
