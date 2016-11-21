/*
 Javier Gutierrez 1695491
 Artur Gudima 1695932
 Lionel Noudja Djengoue 1695935
 */


var http = require('http');

const PORT = 8080;

function handleRequest(request, response) {
    var url = request.url;

    if (!request.url.match(/^\/[a-z]+$/)) {
        fail404(response);
        return;
    }

    var identifiant = (url.split("/")[1]).toLowerCase();


    if (identifiant == "date") {
        var date = new Date();
        respondWithMessage(response, JSON.stringify(date.toUTCString().slice(0,16)));
    }


    if (identifiant == "time") {
        var date = new Date();
        respondWithMessage(response, JSON.stringify(date.toTimeString().split(" ")[0]));
    }

    response.end("L'addresse n'est pas conforme.");
}

function fail404(response) {
    response.statusCode = 404;
    response.end("Erreur 404");
}

function respondWithMessage(response, message) {

    response.statusCode = 200;
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(message);
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {

    console.log("Server listening on: http://localhost:%s", PORT);
});
