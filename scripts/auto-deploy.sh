#!/bin/sh


SERVER_ADDRESS="95.163.209.195"
SERVER_USERNAME="ubuntu"
read -p "Enter deployment tag: " DEPLOYMENT_TAG

DEPLOYMENT_BRANCH="experimental"

KEY=$(cat .keys/ijia.me.key)
CRT=$(cat .keys/ijia.me.crt)

ssh -i .keys/2021-2-MonKeys-TWJYWS7b.pem "$SERVER_USERNAME@$SERVER_ADDRESS" "
    mkdir $DEPLOYMENT_TAG
    cd $DEPLOYMENT_TAG
    git clone --branch $DEPLOYMENT_BRANCH git@github.com:frontend-park-mail-ru/2021_2_MonKeys.git
    cd 2021_2_MonKeys
    mkdir .keys
    cd .keys
    touch ijia.me.key
    touch ijia.me.crt
    echo "$KEY" >> ijia.me.key
    echo "$CRT" >> ijia.me.crt
    echo "_______________________"
    cd .. 
    cat .keys/ijia.me.key
    echo "_______________________"
    echo "_______________________"
    echo "_______________________"
    echo "_______________________"
    cat .keys/ijia.me.crt
    sudo make start-docker-nginx-ssl
    
"

# (echo $KEY) >> test.key
#     cat test.key
#     ls