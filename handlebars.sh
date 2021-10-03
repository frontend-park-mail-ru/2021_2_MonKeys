#!/bin/bash
	FILES="templates/*"
	for f in $FILES
	do
		echo "Processing $f file..."
		handlebars $f -f $f.tpl.js
	done