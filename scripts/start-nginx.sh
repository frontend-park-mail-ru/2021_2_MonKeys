#!/bin/bash

if dpkg -l nginx
	then
		echo "NGINX found, starting server"
        nginx -v
        
	    sudo nginx -t -c "$(pwd)/nginx.conf"
        
        if sudo /etc/init.d/nginx status
            then
                echo "Nginx already started"
            else
                echo "Starting server"
                cp -rf ./static/* /usr/share/nginx/html
                sudo nginx -c "$(pwd)/nginx.conf"
        fi
        
	else
        
		echo "NGINX not found, do you want to install it? (y/n)"
        read VAR
            if [ "$VAR" = "y" ]
            then
                sudo apt-get install nginx -y
            else
                echo "Exiting"
            fi

    fi 
       