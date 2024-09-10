
FROM node:22 AS client_build

WORKDIR /code

COPY ./client /code
RUN npm install --legacy-peer-deps
RUN npm run build


# Stage 2: Build the Django backend and serve static files with Whitenoise
FROM python:3.12.3


COPY backend/requirements.txt /code/requirements.txt
RUN pip install gunicorn
RUN pip install -r requirements.txt

WORKDIR /codeRUN Xvfb :99 -screen 0 1024x768x24 &
ENV DISPLAY=:99

RUN apt-get update && apt-get install -y \
    xvfb \
    python3-pip



COPY --from=client_build /code/build/static/ /code/static/
COPY --from=client_build /code/build/ /code/static/
COPY ./backend/config  /code

# Run Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]