#!/bin/sh

#typescript transpile

npx tsc --build

#css transpile

npx sass scss/:static/css/


go get ./...
sudo apt-get install lolcat -y
clear
echo "      __   _
    _(  )_( )_
   (_   _    _)
  / /(_) (__)
 / / / / / /
/ / / / / /" | lolcat
echo "running go local static server on: http://localhost:8080 🚀🚀🚀" | lolcat
go run server