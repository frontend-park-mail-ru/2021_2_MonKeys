FROM nginx:latest


# config copy
COPY ../nginx.conf /etc/nginx/nginx.conf

# static
COPY ../static /usr/share/nginx/html


