/*
 Javier Gutierrez 1695491
 Artur Gudima 1695932
 Lionel Noudja Djengoue 1695935
 */


var http = require('http');
var fs = require("fs");
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
function handleCreate(request, response, table)
{
    var body = [];
    request.on('data', function(chunk) {
        body.push(chunk);
    }).on("error", function() {
        fail500(response);
    }).on('end', function() {
        var stringBody = Buffer.concat(body).toString();
        var input = JSON.parse(stringBody);

        connection.query("insert into " + table + " set ?", input, function(err, rows) {

            if ( checkAndReturn(response, err) ) return;

            input.id_client = rows.insertId;
            respondWithMessageAndChild(response, JSON.stringify(input), request.url, rows.insertId);
        });
    });
}

function handleRead(request, response, id, table)
{
    if(id != undefined)
    {
        connection.query(
            {
                sql: "Select * from " + table + " where id_client = ?",
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
                sql: "Select * from " + table
            }, function(err, rows){
                if ( checkAndReturn(response, err) ) return;
                respondWithMessage(response, rows);
            });
    }
}

function handleUpdate(request, response, id, table)
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

        connection.query("update " + table + " set ? where id_client = ?", [input, id], function(err) {

            if ( checkAndReturn(response, err) ) return;

            respondWithMessage(response, "Modification faite avec succès");
        });
    });
}

function handleDelete(request, response, id, table)
{
    if(id != undefined)
    {
        connection.query(
            {
                sql: "delete from " + table + " where id_client = ?",
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

function handleRequest(request, response) {
    var url = request.url;

    if(handleFile(request, response))
    {
        return;
    }

    if (!(request.url.match(/^\/[a-z]+\/[0-9]+$/) || (request.url.match(/^\/[a-z]+$/))))
    {
        fail404(response);
        return;
    }

    var table = url.split("/")[1];
    console.log(table);
    var id = url.split("/")[2];
    connection.getConnection(function (err) {
        if (err) throw err;
        if ( request.method == "PUT" ) {
            if(table == "client" || table == "compte" || table == "carte")
            {
                handleUpdate(request, response, id, table);
            }
            else
            {
                response.end("L'addresse n'est pas conforme.");
            }
            return;
        }

        if ( request.method == "GET" ) {
            if(table == "client" || table == "compte" || table == "carte")
            {
                handleRead(request, response, id, table);
            }
            else
            {
                response.end("L'addresse n'est pas conforme.");
            }
            return;
        }

        if ( request.method == "POST" ) {

            if(table == "client" || table == "compte" || table == "carte")
            {
                handleCreate(request, response, table);
            }
            else
            {
                response.end("L'addresse n'est pas conforme.");
            }
            return;
        }

        if ( request.method == "DELETE" ) {
            if(table == "client" || table == "compte" || table == "carte")
            {
                handleDelete(request, response, id, table);
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