#!/bin/sh

docker build -t nginx -f docker/nginx-ssl.dockerfile .
docker run -i --rm -p 443:443 nginx
