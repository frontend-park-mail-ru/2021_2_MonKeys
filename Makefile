run: 
	go get ./...
	go run server

run-local:
	go get ./...
	go run server -p=:80 -ssl=false

render-handlebars:
	bash handlebars.sh
