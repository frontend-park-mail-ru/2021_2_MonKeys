
PORT:= 80

eslint-tslint:
	sudo bash scripts/eslint-tslint.sh

build-docker-nginx-ssl:
	docker build -t nginx -f docker/nginx-ssl.dockerfile .

start-docker-nginx-ssl:
	make build-docker-nginx-ssl
	docker run -i --rm -p 443:443 nginx

build-docker-nginx:
	docker build -t nginx -f docker/nginx.dockerfile .

start-docker-nginx:
	make build-docker-nginx
	docker run -i --rm -p ${PORT}:80 nginx

# Start nginx from local nginx.conf file
start-nginx:
	sudo bash scripts/start-nginx.sh

# Stop nginx
stop-nginx: 
	sudo /etc/init.d/nginx stop

restart-nginx:
	make stop-nginx
	make start-nginx

run-go-static-server: 
	go get ./...
	go run server

run-local:
	go get ./...
	go run server -p=:80 -ssl=false

