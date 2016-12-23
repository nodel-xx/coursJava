var http = require('http');
var fs = require("fs");
const PORT = 8080;


function fail500(response) {
    response.statusCode = 500;
    response.end();
}


function handleFile(request, response) {

    if (! request.url.match(/^.*\..*$/)) {
        return false;
    }

    var extension = request.url.split(".")[1];
    var types = {
        "html": "text/html",
        "jpg": "image/jpeg",
        "gif": "image/gif"
    };

    var mimeType = types[extension];
    if ( mimeType != undefined) {

        response.setHeader('Content-Type', mimeType);
    }

    fs.readFile( "/home/nodel/WebstormProjects/html/" + request.url, function (err, data) {
        if (err) {
            response.statusCode = 404;
            response.end();
            return true;
        }

        response.statusCode = 200;
        response.end(data);
        return true;
    });

    return true;
}



function checkAndReturn(response, err) {

    if ( err ) {
        fail500(response);
        return true;
    } else {
        return false;
    }
}



function handleRequest(request, response)
{
    if(!handleFile(request, response))
    {
        checkAndReturn(response, "Mauvaise URL");
    }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {

    console.log("Server listening on: http://localhost:%s", PORT);
});