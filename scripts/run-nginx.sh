#!/bin/bash

cd ..
sudo service nginx stop

CONFIG_NAME="Drip.nginx"
STATIC_PATH=$(grep "/static/" $CONFIG_NAME)
NEW_STATIC_PATH=" \t\t\troot ""${PWD}""/static/;"

sed -i "s|$STATIC_PATH|$NEW_STATIC_PATH|g" $CONFIG_NAME

sudo cp $CONFIG_NAME /etc/nginx/nginx.conf

sudo service nginx start
sudo nginx -t
