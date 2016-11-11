var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodel',
    password: '',
    database: 'MonApplication'
});

//var date = Date().toISOString();
connection.connect(function (err)
{
    if (err) throw err;
    var fin = 0;
    for(var i = 0; i < 100; i++)
    {
        var nom = "nom" + i;
        var prenom = "prenom" + i;
        var tel = Math.floor(Math.random()*1000000000);
        var adresse = String(Math.floor(Math.random()*10000)) + " rue Bonsecours";
        var courriel = "courriel" + i + "@cmaisonneuve.qc.ca";
        var nas = Math.floor(Math.random()*1000000000);
        var an = String(Math.floor(1940 + Math.random() * 70));
        var mois = String(1 + (i % 12));
        var jr = String(1 + (i % 31));
        var date_nais = new Date(an + "-" + mois + "-" + jr).toISOString().substr(0,10);

        connection.query(
            {
                sql: "insert into client values(null, ?, ?, ?, ?, ?, ?, ?)",
                values:[nom, prenom, tel, adresse, courriel, nas, date_nais]
            }, function (err, rows, fields) {
                if (err) throw err;
                var no_compte = Math.floor(Math.random()*1000000000);
                var type = "cheque";
                var succursale = Math.floor(Math.random()*100000);
                var solde = Math.floor(Math.random()*1000000000);
                var propritaire = rows.insertId;


                connection.query(
                    {
                        sql: "insert into compte values(null, ?, ?, ?, ?, ?, ?)",
                        values:[no_compte, type, succursale, date_nais, solde, propritaire]
                    }, function (err, rows, fields) {
                        if (err) throw err;
                        if (rows.insertId % 2 != 0)
                        {
                            no_compte++;
                            var type1 = "epargne";
                            connection.query(
                                {
                                    sql: "insert into compte values(null, ?, ?, ?, ?, ?, ?)",
                                    values: [no_compte, type1, succursale, date_nais, solde, propritaire]
                                }, function (err, rows, fields) {
                                    if (err) throw err;
                                    fin++;
                                    if (fin > 49) {
                                        connection.end();
                                    }
                                });
                        }

                    });
            });
    }
});
