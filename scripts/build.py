# privet

import sys
import time
import os

if __name__ == "__main__":
    print('Number of arguments: {}'.format(len(sys.argv)))
    print('Argument(s) passed: {}'.format(str(sys.argv)))
    
    currentVersion = int(time.time())
    print(currentVersion)
    # delete old versions
    os.system("rm static/css/*.css && rm static/js/*.js")

    os.system("npx tsc --build")

    #os.system("npx sass scss/:static/css/")

    os.system("npx rollup -c rollup.config.js")

    jsBundle = "js/app"+str(currentVersion)+".min.js" 
    cssBundle = "css/app"+str(currentVersion)+".css"

    print(jsBundle)
    print(cssBundle)

    os.rename("static/css/main.css", "static/"+cssBundle)
    os.rename("static/js/app.min.js", "static/"+jsBundle)


    html_output = open("static/index.html", "w")

    output = """
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <link href=\""""
    output=output.rstrip()+cssBundle
    output=output.rstrip()+"""\" rel="stylesheet">
        <title>Feed</title>
    </head>

    <body>
        <div id="app" class="app"></div>
    </body>

    <script src=\""""
    #output+=f'js/{jsBundle}.min.js'
    output+=jsBundle
    output+="""\" type="module"></script>

</html>
    """

    html_output.write(output)
    #print(f'CSS bundle: {cssBundle}')
    #print(f'JS bundle: {jsBundle}')
