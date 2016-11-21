/*
 Javier Gutierrez 1695491
 Artur Gudima 1695932
 Lionel Noudja Djengoue 1695935
 */


var http = require('http');
const PORT = 8080;

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodel',
    password: '',
    database: 'MonApplication'
});

function fail400(response) {
    response.statusCode = 400;
    response.end();
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

function handleCreateClient(request, response)
{

}

function handleReadClient(request, response, id)
{

}

function handleUpdateClient(request, response, id)
{

}

function handleDeleteClient(request, response, id)
{

}


function handleRequest(request, response) {
    var url = request.url;

    if (!(request.url.match(/^\/[a-z]+\/[0-9]+$/) || (request.url.match(/^\/[a-z]+$/)))) {
        fail404(response);
        return;
    }

    var table = (url.split("/")[1]).toLowerCase();
    var id = (url.split("/")[2]).toLowerCase();




    response.end("L'addresse n'est pas conforme.");
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {

    console.log("Server listening on: http://localhost:%s", PORT);
});