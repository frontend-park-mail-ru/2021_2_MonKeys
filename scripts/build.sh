#!/bin/sh

#search current version css
cssPath=$(find static/css -name '*.css')
cssBaseName=$(basename -- "$cssPath")
cssFileName="${cssBaseName%.*}"

#search current version js
jsPath=$(find static/js -name '*.min.js')
jsBaseName=$(basename -- "$jsPath")
jsFileName="${jsBaseName%.min*}"

#clear old version
rm static/css/*.css
rm static/js/*.js

#typescript transpile
npx tsc --build

#css transpile
npx sass scss/:static/css/

#bundle js
npx rollup -c

#new file version
curDate=$(date +%s)
mv static/css/main.css static/css/main$curDate.css
mv static/js/app.min.js static/js/app$curDate.min.js

#update file name in index.html
sed -e "s/$cssFileName/main$curDate/; s/$jsFileName/app$curDate/" ./static/index.html > ./static/index.html.tmp && mv ./static/index.html.tmp ./static/index.html

#print version
printf "version - $curDate\n"
