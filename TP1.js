/*
 Javier Gutierrez 1695491
 Artur Gudima 1695932
 Lionel Noudja Djengoue 1695935
 */


var http = require('http');
const PORT = 8080;

var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'nodel',
    password: '',
    database: 'MonApplication'
});

function fail400(response) {
    response.statusCode = 400;
    response.end("Erreur 400: Élément introuvable");
}

function fail404(response) {
    response.statusCode = 404;
    response.end("Erreur 404: Vérifié votre URL");
}

function fail500(response, message) {
    response.statusCode = 500;
    response.end(JSON.stringify(message));
}

function respondWithMessage(response, message) {

    response.statusCode = 200;
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(message));
}

function respondWithMessageAndChild(response, message, parenturl, childId) {

    response.writeHead(201, {
        'Content-Type': 'application/json',
        'Location': parenturl + "/" + childId
    });

    response.end(message);
}

function checkAndReturn(response, err) {

    if ( err ) {
        fail500(response, err);
        console.log(err);
        return true;
    } else {
        return false;
    }
}

//Handler functions for table Carte
function handleCreateClient(request, response)
{
    var body = [];
    request.on('data', function(chunk) {
        body.push(chunk);
    }).on("error", function() {
        fail500(response);
    }).on('end', function() {
        var stringBody = Buffer.concat(body).toString();
        var input = JSON.parse(stringBody);

        connection.query("insert into client set ?", input, function(err, rows) {

            if ( checkAndReturn(response, err) ) return;

            input.id_client = rows.insertId;
            respondWithMessageAndChild(response, JSON.stringify(input), request.url, rows.insertId);
        });
    });
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
                if ( checkAndReturn(response, err) ) return;
                if (JSON.stringify(rows) == "[]")
                {
                    fail400(response);
                }
                else
                {
                    respondWithMessage(response, rows);
                }

            });
    }
    else
    {
        connection.query(
            {
                sql: "Select * from client"
            }, function(err, rows){
                if ( checkAndReturn(response, err) ) return;
                respondWithMessage(response, rows);
            });
    }
}

function handleUpdateClient(request, response, id)
{
    if(id == undefined)
    {
        fail404(response);
        return;
    }

    var body = [];
    request.on('data', function(chunk) {
        body.push(chunk);
    }).on("error", function() {
        fail500(response);
    }).on('end', function() {
        var stringBody = Buffer.concat(body).toString();
        var input = JSON.parse(stringBody);
        delete input.id_client;

        connection.query("update client set ? where id_client = ?", [input, id], function(err) {

            if ( checkAndReturn(response, err) ) return;

            respondWithMessage(response, "Modification faite avec succès");
        });
    });
}

function handleDeleteClient(request, response, id)
{
    if(id != undefined)
    {
        connection.query(
            {
                sql: "delete from client where id_client = ?",
                values: [id]
            }, function(err, rows) {
                if ( checkAndReturn(response, err) ) return;
                if (JSON.stringify(rows) == "[]")
                {
                    fail400(response);
                }
                else
                {
                    respondWithMessage(response, "La client " + id + " a été supprimé.");
                }
            });
    }
    else
    {
        fail404(response);
    }
}

//Handler functions for table Compte
function handleCreateCompte(request, response)
{
    var body = [];
    request.on('data', function(chunk) {
        body.push(chunk);
    }).on("error", function() {
        fail500(response);
    }).on('end', function() {
        var stringBody = Buffer.concat(body).toString();
        var input = JSON.parse(stringBody);

        connection.query("insert into compte set ?", input, function(err, rows) {

            if ( checkAndReturn(response, err) ) return;

            input.id_compte = rows.insertId;
            respondWithMessageAndChild(response, JSON.stringify(input), request.url, rows.insertId);
        });
    });
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
                if ( checkAndReturn(response, err) ) return;
                if (JSON.stringify(rows) == "[]")
                {
                    fail400(response);
                }
                else
                {
                    respondWithMessage(response, rows);
                }

            });
    }
    else
    {
        connection.query(
            {
                sql: "Select * from compte"
            }, function(err, rows){
                if ( checkAndReturn(response, err) ) return;
                respondWithMessage(response, rows);
            });
    }
}

function handleUpdateCompte(request, response, id)
{
    if(id == undefined)
    {
        fail404(response);
        return;
    }

    var body = [];
    request.on('data', function(chunk) {
        body.push(chunk);
    }).on("error", function() {
        fail500(response);
    }).on('end', function() {
        var stringBody = Buffer.concat(body).toString();
        var input = JSON.parse(stringBody);
        delete input.id_compte;

        connection.query("update compte set ? where id_compte = ?", [input, id], function(err) {

            if ( checkAndReturn(response, err) ) return;

            respondWithMessage(response, "Modification faite avec succès");
        });
    });
}

function handleDeleteCompte(request, response, id)
{
    if(id != undefined)
    {
        connection.query(
            {
                sql: "delete from compte where id_compte = ?",
                values: [id]
            }, function(err, rows) {
                if ( checkAndReturn(response, err) ) return;
                if (JSON.stringify(rows) == "[]")
                {
                    fail400(response);
                }
                else
                {
                    respondWithMessage(response, "La compte " + id + " a été supprimé.");
                }
            });
    }
    else
    {
        fail404(response);
    }
}

//Handler functions for table Carte
function handleCreateCarte(request, response)
{
    var body = [];
    request.on('data', function(chunk) {
        body.push(chunk);
    }).on("error", function() {
        fail500(response);
    }).on('end', function() {
        var stringBody = Buffer.concat(body).toString();
        var input = JSON.parse(stringBody);

        connection.query("insert into carte set ?", input, function(err, rows) {

            if ( checkAndReturn(response, err) ) return;

            input.id_carte = rows.insertId;
            respondWithMessageAndChild(response, JSON.stringify(input), request.url, rows.insertId);
        });
    });
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
                if ( checkAndReturn(response, err) ) return;
                if (JSON.stringify(rows) == "[]")
                {
                    fail400(response);
                }
                else
                {
                    respondWithMessage(response, rows);
                }

            });
    }
    else
    {
        connection.query(
            {
                sql: "Select * from carte"
            }, function(err, rows){
                if ( checkAndReturn(response, err) ) return;
                respondWithMessage(response, rows);
            });
    }
}

function handleUpdateCarte(request, response, id)
{
    if(id == undefined)
    {
        fail404(response);
        return;
    }

    var body = [];
    request.on('data', function(chunk) {
        body.push(chunk);
    }).on("error", function() {
        fail500(response);
    }).on('end', function() {
        var stringBody = Buffer.concat(body).toString();
        var input = JSON.parse(stringBody);
        delete input.id_carte;

        connection.query("update carte set ? where id_carte = ?", [input, id], function(err) {

            if ( checkAndReturn(response, err) ) return;

            respondWithMessage(response, "Modification faite avec succès");
        });
    });
}

function handleDeleteCarte(request, response, id)
{
    if(id != undefined)
    {
        connection.query(
            {
                sql: "delete from carte where id_carte = ?",
                values: [id]
            }, function(err, rows) {
                if ( checkAndReturn(response, err) ) return;
                if (JSON.stringify(rows) == "[]")
                {
                    fail400(response);
                }
                else
                {
                    respondWithMessage(response, "La carte " + id + " a été supprimé.");
                }
            });
    }
    else
    {
        fail404(response);
    }
}


function handleRequest(request, response) {
    var url = request.url;

    if (!(request.url.match(/^\/[a-z]+\/[0-9]+$/) || (request.url.match(/^\/[a-z]+$/)))) {
        fail404(response);
        return;
    }

    var table = url.split("/")[1];
    var id = url.split("/")[2];
    connection.getConnection(function (err) {
        if (err) throw err;
        if ( request.method == "PUT" ) {
            if(table == "client")
            {
                handleUpdateClient(request, response, id);
            }
            else if(table == "compte")
            {
                handleUpdateCompte(request, response, id);
            }
            else if(table == "carte")
            {
                handleUpdateCarte(request, response, id);
            }
            else
            {
                response.end("L'addresse n'est pas conforme.");
            }
            return;
        }

        if ( request.method == "GET" ) {
            if(table == "client")
            {
                handleReadClient(request, response, id);
            }
            else if(table == "compte")
            {
                handleReadCompte(request, response, id);
            }
            else if(table == "carte")
            {
                handleReadCarte(request, response, id);
            }
            else
            {
                response.end("L'addresse n'est pas conforme.");
            }
            return;
        }

        if ( request.method == "POST" ) {

            if(table == "client")
            {
                handleCreateClient(request, response);
            }
            else if(table == "compte")
            {
                handleCreateCompte(request, response);
            }
            else if(table == "carte")
            {
                handleCreateCarte(request, response);
            }
            else
            {
                response.end("L'addresse n'est pas conforme.");
            }
            return;
        }

        if ( request.method == "DELETE" ) {
            if(table == "client")
            {
                handleDeleteClient(request, response, id);
            }
            else if(table == "compte")
            {
                handleDeleteCompte(request, response, id);
            }
            else if(table == "carte")
            {
                handleDeleteCarte(request, response, id);
            }
            else
            {
                response.end("L'addresse n'est pas conforme.");
            }
        }

    });

}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {

    console.log("Server listening on: http://localhost:%s", PORT);
});