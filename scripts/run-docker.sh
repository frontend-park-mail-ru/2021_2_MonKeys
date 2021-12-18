#!/bin/sh
docker run --rm \
  -p 0.0.0.0:80:80 \
  -p 0.0.0.0:443:443/tcp \
  -p 0.0.0.0:443:443/udp \
  -v "$PWD/static":/usr/share/nginx/html/ \
 --name nginx-brotli \
  -t nginx-brotli