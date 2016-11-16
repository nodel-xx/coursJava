/*
 Javier Gutierrez 1695491
 Artur Gudima 1695932
 Lionel Noudja Djengoue 1695935
 */


var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodel',
    password: '',
    database: 'MonApplication'
});

var fin = 0;


function ajoutClient(i)
{
    var nom = "nom" + i;
    var prenom = "prenom" + i;
    var tel = Math.floor(Math.random()*1000000000);
    var adresse = String(Math.floor(Math.random()*10000)) + " rue Bonsecours";
    var courriel = "courriel" + i + "@cmaisonneuve.qc.ca";
    var nas = Math.floor(Math.random()*1000000000);
    var date_nais = new Date("1940-11-12");
    date_nais = new Date(date_nais.setDate(date_nais.getDate() + (2*i)));

    connection.query( //Ajoute client
        {
            sql: "insert into client values(null, ?, ?, ?, ?, ?, ?, ?)",
            values:[nom, prenom, tel, adresse, courriel, nas, date_nais]
        }, function (err, rows, fields) {
            if (err) throw err;
            ajoutCheque(rows, i);
            ajoutEpargne(rows, i);
        });
}

function ajoutCheque(ligneAjouter, i)
{
    var no_compte = Math.floor(Math.random()*1000000000);
    var type = "cheque";
    var succursale = Math.floor(Math.random()*100000);
    var solde = Math.floor(Math.random()*1000000000);
    var propritaire = ligneAjouter.insertId;
    var date_debut = new Date("1980-5-2");
    date_debut = new Date(date_debut.setDate(date_debut.getDate() + (3*i)));

    connection.query( //Ajoute les comptes cheques
        {
            sql: "insert into compte values(null, ?, ?, ?, ?, ?, ?)",
            values:[no_compte, type, succursale, date_debut, solde, propritaire]
        }, function (err, rows, fields) {
            if (err) throw err;
            ajoutCarte(rows, i);
        });
}

function ajoutEpargne(ligneAjouter, i)
{
    if (ligneAjouter.insertId % 2 != 0) // Debut ajout compte epargne
    {
        var no_compte = Math.floor(Math.random()*1000000000);
        var type1 = "epargne";
        var succursale = Math.floor(Math.random()*100000);
        var propritaire = ligneAjouter.insertId;
        var solde = Math.floor(Math.random()*1000000000);
        var date_ouvert = new Date("1995-5-2");
        date_ouvert = new Date(date_ouvert.setDate(date_ouvert.getDate() + i));
        connection.query( //Ajoute les comptes epargne
            {
                sql: "insert into compte values(null, ?, ?, ?, ?, ?, ?)",
                values: [no_compte, type1, succursale, date_ouvert, solde, propritaire]
            }, function (err, rows, fields) {
                if (err) throw err;
            });
    }
}

function ajoutCarte(ligneAjouter, i)
{
    var type_carte = "debit";
    var numero_carte = Math.floor(Math.random()*1000000000);
    var expiration = new Date("1998-1-20");
    expiration = new Date(expiration.setDate(expiration.getDate() + (4*i)));
    var num_compte = ligneAjouter.insertId;
    connection.query( //Ajout des carte pour les comptes cheques
        {
            sql: "insert into carte values(null, ?, ?, ?, null, ?)",
            values:[type_carte, numero_carte, expiration, num_compte]
        }, function(err, rows, fields){
            if(err) throw err;
            fin++;
            if (fin > 499) {
                connection.end();
            }
        });
}

//Programme principale
connection.connect(function (err)
{
    if (err) throw err;
    for(var i = 0; i < 500; i++)
    {
        ajoutClient(i);
    }
});
