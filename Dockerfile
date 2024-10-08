# Use the official Nginx image as the base image
FROM nginx

# Set the working directory to Nginx's HTML directory
WORKDIR /usr/share/nginx/html

# Copy the current directory contents into the container's working directory
COPY . .

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
