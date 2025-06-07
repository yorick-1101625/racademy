# Use official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH=/backend

# Set work directory
WORKDIR /backend

# Install dependencies
COPY requirements.txt /backend/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy backend source code
COPY . /backend/

# Expose port 8000 for the Flask app
EXPOSE 8000

# Run the Flask app
CMD ["python", "app.py"]
