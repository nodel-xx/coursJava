var mysql = require('mysql');

/*var connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodel',
    password: '',
    database: 'MonApplication'
});*/

var pool = mysql.createPool({
    host: 'localhost',
    user: 'nodel',
    password: '',
    database: 'MonApplication'
});

/*
connection.connect(function (err) {
    if(err) throw err;
    connection.query(
    {
        sql: "select * from professeur"
    }, function(err, rows, fields){
            if(err) throw err;
            console.log(rows.length);
            console.log(JSON.stringify(rows));
            connection.end();
        });

});

connection.connect(function (err) {
    if(err) throw err;
    for(var i = 1; i <= 1000; i++)
    {
        var prenom = "user" + i;
        var nom = "Last" + i;
        connection.query(
            {
                sql: "insert into professeur values(null, ?, ?)",
                values:[prenom, nom]
            }, function(err, rows, fields){
                if(err) throw err;
                console.log("added", i);
            });
    }
    connection.end();

});
*/

pool.query(
    {
        sql: "select * from professeur"
    },
    function (err, rows, fields)
    {
        if(err) throw err;

        for(var i = 0; i < rows.length; i++)
        {
            console.log("Etudiant", rows[i].prenom, rows[i].nom);
        }
    }
);
