#!/bin/bash

cd ..
sudo service nginx stop

CONFIG_NAME="nginx.conf"
STATIC_PATH=$(grep "/static/" $CONFIG_NAME)
NEW_STATIC_PATH=" \t\t\troot ""${PWD}""/static/;"

sed -i "s|$STATIC_PATH|$NEW_STATIC_PATH|g" $CONFIG_NAME

sudo cp $CONFIG_NAME /etc/nginx/nginx.conf

sudo service nginx start
sudo nginx -t
sudo apt-get install lolcat -y
clear
echo "      __   _
    _(  )_( )_
   (_   _    _)
  / /(_) (__)
 / / / / / /
/ / / / / /" | lolcat
echo "running NGINX local static server on: http://localhost 🚀🚀🚀" | lolcat
