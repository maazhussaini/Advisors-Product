# FROM python:3-alpine

# # Install system dependencies for building pyodbc
# RUN apk update && apk add --no-cache g++ unixodbc-dev && rm -rf /var/cache/apk/*

# # Switch working directory
# WORKDIR /product1_backend

# # Copy files into the container
# COPY . .

# # Install Python dependencies
# RUN pip install --no-cache-dir -r req.txt

# # Expose the port
# EXPOSE 8200

# # Use JSON array syntax for CMD
# CMD ["python", "./run.py"]


FROM python:3.12.0

# Update the package lists
RUN apt-get update && apt-get install -y unixodbc unixodbc-dev gcc g++ make && rm -rf /var/lib/apt/lists/*

COPY . /product1_backend

WORKDIR /product1_backend

# Install the dependencies
RUN pip install --no-cache-dir -r req.txt

CMD ["python", "run.py"]
