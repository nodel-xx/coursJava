CREATE TABLE client (id_client INT AUTO_INCREMENT PRIMARY KEY , nom VARCHAR(32) NOT NULL, prenom VARCHAR(32) NOT NULL,
                     telephone INT(10), addresse VARCHAR(64) NOT NULL , courriel varchar(32), nas int(9) UNIQUE NOT NULL,
                     date_naissance date NOT NULL);
CREATE TABLE compte (id_compte INT AUTO_INCREMENT PRIMARY KEY , no_compte int UNIQUE NOT NULL, type VARCHAR(32) NOT NULL,
                     succursale INT(5) NOT NULL, date_ouverture DATE NOT NULL, solde FLOAT NOT NULL, proprietaire INT NOT NULL,
                     INDEX  prop_ind (proprietaire), FOREIGN KEY(proprietaire) REFERENCES client(id_client));
CREATE TABLE carte (id_carte INT AUTO_INCREMENT PRIMARY KEY , type VARCHAR(32) NOT NULL, numero INT(16) NOT NULL UNIQUE,
                    expiration DATE NOT NULL, cvv INT(3), compte INT , INDEX cpt_ind(compte),
                    FOREIGN KEY(compte) REFERENCES compte (id_compte));

