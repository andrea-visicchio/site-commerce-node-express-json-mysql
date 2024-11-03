const express = require('express');
const path = require('path');
const fs = require('fs');

// creiamo un'istanza dell'oggetto express
const app = express();

// porta di ascolto del server NodeJS
const porta = 3000;


// indicazione della cartella dei contenuti statici
app.use(  express.static('public')  );

// configuriamo con il meto set la cartella delle viste, ovvero la cartella che contiene i file dinamici
app.set('views', path.join(__dirname, 'views'));

// indichiamo a express che tipo di motore di templating dobbiamo usare
app.set('view egine', 'ejs');


// gestione della rotta che servirà a visualizzare la pagina che sarà la nostra home page
/* 
la funzione di call back di cui necessita il meto get, deve avere du parametri, i cui nomi possono essere arbitrari, ma le bone pratiche ci indicano di dare i seguenti nomi
req : che rappresenta la richiesta dell'utente (request)
res : che rappresenta la risposta del server (response)
*/
app.get('/', (req, res) => {
    res.render('home.ejs', {titolo_pagina : 'Home - Sito Commerce'})
});

// ========== caricamento dati da file JSON =======================


let dati = [];
fs.readFile('./dati/elencoprodotti.json', 'utf8', (errore, cont_file) => {

    if (errore) {
        console.log("Errore nel caricamento del file JSON" + errore);
    } else {
        dati = JSON.parse(cont_file);
    }

});


// ============================
// gestione rotta per la pagina che ospiterà l'elendo dei prodotti
app.get('/prodotti', (req, res) => {


        //console.log(dati.length);
        

        res.render('prodotti.ejs', {titolo_pagina : 'Elenco dei prodotti - Sito Commerce', elenco_prodotti : dati})

})

// rotta per pagina contatti
app.get('/contatti', (req, res) => {
    res.render('contatti.ejs', {titolo_pagina : 'Contattaci per le tue esigenze - Sito Commerce'})
})

// rotta per pagina scheda prodotto
app.get('/scheda-prodotto/:nome_prodotto', (req, res) => {

    const nome_prodotto = req.params.nome_prodotto;

    const prodotto = dati.find(  elemento => {
        if (elemento.nome_prodotto == nome_prodotto) {
            return elemento;
        }
    })

    let titolo_scheda_prodotto = `${prodotto.nome_prodotto} - Sito Commerce`

    res.render('scheda-prodotto.ejs', {titolo_pagina : titolo_scheda_prodotto, dati_prodotto : prodotto})

})

// rotta per gestire eventuali url non presenti sul sito
app.get('*', (req, res) => {
    res.render('404.ejs', {titolo_pagina : 'Pagina non trovata - Sito Commerce'})
})








app.listen(porta);