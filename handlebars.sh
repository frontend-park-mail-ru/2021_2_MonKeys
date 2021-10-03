#!/bin/bash
	FILES="templates/*.handlebars"
	for f in $FILES
	do
		echo "Processing $f file..."
		handlebars $f -f $f.tpl.js
	done