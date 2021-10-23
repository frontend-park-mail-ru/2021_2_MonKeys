FROM nginx:latest


# config copy (ssl)
COPY ../nginx-ssl.conf /etc/nginx/nginx.conf

# ssl keys
COPY .keys/ijia.me.crt /etc/nginx/ijia.me.crt
COPY .keys/ijia.me.key /etc/nginx/ijia.me.key 

# static
COPY ../static /usr/share/nginx/html

