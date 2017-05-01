/**
 * Created by Xavok on 4/30/2017.
 */
"use strict";

const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// app.use((req,res,next) => {
//     res.render('maintenance');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});



app.get('/', (req,res) => {
    res.render('home', {
        title: 'Home Page',
        welcomeMessage: 'Welcome text',
    });
});
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'Error'
    })
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});