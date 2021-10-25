#!/bin/bash

cd ..
sudo service nginx stop
sudo cp Drip.nginx /etc/nginx/nginx.conf
sudo service nginx start
sudo nginx -t
