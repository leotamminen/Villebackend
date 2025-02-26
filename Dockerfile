# Use official Python 3.12 slim image (lightweight)
FROM python:3.12-slim

# Set working directory inside the container
WORKDIR /app

# Copy only requirements.txt first (leverages Docker caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . .

# Expose FastAPI's default port
EXPOSE 8000

# Run FastAPI with Uvicorn
CMD ["uvicorn", "src.api.embed:app", "--host", "0.0.0.0", "--port", "8000"]
