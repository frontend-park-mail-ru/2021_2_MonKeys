run: 
	go get ./...
	go run server

eslint: 
	npm install
	npx eslint static/js/** --fix

run-local:
	go get ./...
	go run server -p=:80 -ssl=false

render-handlebars:
	./handlebars.sh
