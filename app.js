const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');

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

// ROUTES

// index view render
app.get('/', (req, res) => {
    //   res.send('Merhaba');
    // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    const photos = Photo.find({});
    res.render('index', {
        photos
    });
});

// about view render
app.get('/about', (req, res) => {
    res.render('about');
});

// add view render
app.get('/add', (req, res) => {
    res.render('add');
});

// post
app.post('/photos', async (req, res) => {
    await Photo.create(req.body)
    res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});
