#!/bin/sh
docker run --rm \
  -p 0.0.0.0:80:80 \
  -p 0.0.0.0:443:443/tcp \
  -p 0.0.0.0:443:443/udp \
  -v "$PWD/static":/usr/share/nginx/html/ \
  -v "$PWD/star.monkeys.team.crt":/etc/nginx/localhost.crt:ro \
  -v "$PWD/star.monkeys.team.key":/etc/nginx/localhost.key:ro \
 --name test_nginx \
  -t nginx-brotli