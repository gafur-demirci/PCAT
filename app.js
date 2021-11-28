const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileUpload');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const fs = require('fs');

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

// ROUTES

// index view render
app.get('/', async (req, res) => {
    //   res.send('Merhaba');
    // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
        photos,
    });
});

// single photo page
app.get('/photos/:id', async (req, res) => {
    // console.log(req.params.id);
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo,
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

// post (db ye nesne gönderir)
app.post('/photos', async (req, res) => {

    const uploadDir = 'public/uploads';

    if(!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image
    let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image : '/uploads/' + uploadeImage.name
        })
        res.redirect('/');
    });

    //console.log(req.files.image);
    //await Photo.create(req.body)
    //res.redirect('/');

});





const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});
