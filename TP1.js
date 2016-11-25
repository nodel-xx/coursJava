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
    response.end("Erreur 404: Vérifié votre URL");
}

function respondWithMessage(response, message) {

    response.statusCode = 200;
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(message));
}

//Handler functions for table Carte
function handleCreateClient(request, response)
{

}

function handleReadClient(request, response, id)
{
    if(id != undefined)
    {
        connection.query(
            {
                sql: "Select * from client where id_client = ?",
                values: [id]
            }, function(err, rows){
                if(err) throw err;
                respondWithMessage(response, rows);
                connection.end();
            });
    }
    else
    {
        connection.query(
            {
                sql: "Select * from client"
            }, function(err, rows){
                if(err) throw err;
                respondWithMessage(response, rows);
                connection.end();
            });
    }
}

function handleUpdateClient(request, response, id)
{

}

function handleDeleteClient(request, response, id)
{

}

//Handler functions for table Compte
function handleCreateCompte(request, response)
{

}

function handleReadCompte(request, response, id)
{
    if(id != undefined)
    {
        connection.query(
            {
                sql: "Select * from compte where id_compte = ?",
                values: [id]
            }, function(err, rows){
                if(err) throw err;
                respondWithMessage(response, rows);
                connection.end();
            });
    }
    else
    {
        connection.query(
            {
                sql: "Select * from compte"
            }, function(err, rows){
                if(err) throw err;
                respondWithMessage(response, rows);
                connection.end();
            });
    }
}

function handleUpdateCompte(request, response, id)
{

}

function handleDeleteCompte(request, response, id)
{

}

//Handler functions for table Carte
function handleCreateCarte(request, response)
{

}

function handleReadCarte(request, response, id)
{
    if(id != undefined)
    {
        connection.query(
            {
                sql: "Select * from carte where id_carte = ?",
                values: [id]
            }, function(err, rows){
                if(err) throw err;
                respondWithMessage(response, rows);
                connection.end();
            });
    }
    else
    {
        connection.query(
            {
                sql: "Select * from carte"
            }, function(err, rows){
                if(err) throw err;
                respondWithMessage(response, rows);
                connection.end();
            });
    }
}

function handleUpdateCarte(request, response, id)
{

}

function handleDeleteCarte(request, response, id)
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
    connection.connect(function (err) {
        if (err) throw err;
        if(table == "client")
        {
            handleReadClient(request, response, id)
        }
        else if(table == "compte")
        {
            handleReadCompte(request, response, id)
        }
        else if(table == "carte")
        {
            handleReadCarte(request, response, id)
        }
        else
        {
            response.end("L'addresse n'est pas conforme.");
        }
    });

}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {

    console.log("Server listening on: http://localhost:%s", PORT);
});