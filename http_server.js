var http = require('http');
var mysql = require('mysql');

const PORT = 8080;
var reqId = {
    professeur: "select * from professeur where id = ?",
    etudiant: "select * from etudiant where id = ?"};

var reqNoId = {
    professeur: "select * from professeur",
    etudiant: "select * from etudiant"};

function handleRequest(request, response)
{
    var url = request.url;
    if(url == "/favicon.ico")
    {
        response.end();
        return;
    }
    var profId = url.split("/")[1];
    var tId = url.split("/")[2];
    console.log(tId);
    //response.end('It Works!! Path Hit: ' + request.url);
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'nodel',
        password: '',
        database: 'MonApplication'
    });
    connection.connect(function (err) {
        if(err) throw err;
       if(tId != undefined && tId != "")
       {
           connection.query(
               {
                   sql: reqId[profId],
                   values: [tId]
               }, function(err, rows, fields){
                   if(err) throw err;
                   response.end(JSON.stringify(rows));
                   connection.end();
               });
       }
       else
       {
           connection.query(
               {
                   sql: reqNoId[profId]
               }, function(err, rows, fields){
                   if(err) throw err;
                   response.end(JSON.stringify(rows));
                   connection.end();
               });
       }

    });
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
})