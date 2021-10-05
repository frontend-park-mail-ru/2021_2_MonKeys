#!/bin/bash
	COMPONENTS="static/js/components/*"
	for c in $COMPONENTS
	do
		TEMPLATES="$c/templates/*.handlebars"
		for t in $TEMPLATES
			do
				echo "Processing $t file..."
				handlebars $t -f $t.tpl.js
			done
	done