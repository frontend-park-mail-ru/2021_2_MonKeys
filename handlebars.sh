#!/bin/bash
	FILES="templates/*"
	for f in $FILES
	do
		echo "Processing $f file..."
		handlebars templates/$f -f templates/$f.tpl.js
	done