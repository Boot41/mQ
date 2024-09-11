# Stage 1: Build the frontend application
FROM node:22 AS client_build

WORKDIR /code

COPY ./client /code

RUN npm install --legacy-peer-deps
RUN npm run build

# Stage 2: Build the backend application
FROM python:3.12.3

WORKDIR /code
RUN apt-get update && apt-get install -y \
    xvfb \
    python3-pip

# Copy backend code
COPY backend /code

# Install Python dependencies
COPY backend/requirements.txt /code/requirements.txt
RUN pip install -r /code/requirements.txt

# Install Gunicorn
RUN pip install gunicorn

RUN mkdir /staticfiles

# Copy the built frontend files from the client_build stage
COPY --from=client_build /code/build/static/ /code/static/static/
COPY --from=client_build /code/build/ /code/static/

# Create the staticfiles directory
RUN mkdir -p /code/staticfiles

WORKDIR /code
RUN python manage.py collectstatic --noinput --clear

# Set the command to run the application
CMD ["gunicorn", "-b", "0.0.0.0:8080", "config.wsgi:application"]