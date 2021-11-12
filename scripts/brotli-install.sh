#!/bin/sh

# Мы будем использовать этот исходный код для компиляции двоичных файлов *.so для сжатия Brotli.
# Теперь извлеките файл, используя следующую команду.
wget https://nginx.org/download/nginx-1.18.0.tar.gz
tar xzf nginx-1.18.0.tar.gz

# Модуль Brotli для Nginx от Google
git clone https://github.com/google/ngx_brotli --recursive

# установка зависимости
sudo apt-get install libpcre3-dev -y
sudo apt-get install zlib1g-dev

# конфигурация сборки nginx
cd nginx-1.18.0
sudo ./configure --with-compat --add-dynamic-module=../ngx_brotli

# сборка
sudo make modules

# копируем в папку модулей
cd objs
sudo cp  ngx_http_brotli*.so /usr/share/nginx/modules

# подчищаем за собой
