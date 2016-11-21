var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodel',
    password: '',
    database: 'MonApplication'
});

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
