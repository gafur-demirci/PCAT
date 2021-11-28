const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileUpload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const fs = require('fs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

const app = express();

// Connect Db
mongoose.connect('mongodb://localhost:27017/pcat-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET'],
}));

// ROUTES

// Photo Controllers

// index view render
app.get('/', photoController.getAllPhotos);
// single photo page
app.get('/photos/:id', photoController.getPhoto);
// post (db ye nesne gönderir)
app.post('/photos', photoController.createPhoto);
// Edit den sonrası
app.put('/photos/:id', photoController.updatePhoto);
// Delete photo
app.delete('/photos/:id', photoController.deletePhoto);

// Page Controllers

// about view render
app.get('/about', pageController.getAboutPage);
// add view render
app.get('/add', pageController.getAddPage);
// Edit e gönderme
app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});
