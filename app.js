const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:biblioteca@bibliotecaonline-du8iz.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser: true});
var userSchema = new mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    nume: {
      type: String,
      required: true
    },
    prenume: {
      type: String,
      required: true
    },
    mail: {
      type: String,
      required: true
    },
    telefon: {
      type: String,
      required: true
    },
    facultate: {
      type: String,
      required: true
    },
    parola: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      required: true
    },
  }
);


var User = mongoose.model("User", userSchema);


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

MongoClient.connect(url, { useNewUrlParser: true }, (err, res) => {
  assert.equal(null, err)
  dbo = res.db("test");
  app.listen(port, () => console.log(`Server listening to port ${port}`))
})

app.post('/adduser', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err,hash) =>{
    if(err) {
      return res.status(500).json({
        error: err
      })
    } else {
      var user = new User({
        _id: mongoose.Types.ObjectId(),
        nume: req.body.firstName,
        prenume: req.body.lastName,
        mail: req.body.email,
        telefon: req.body.phone,
        facultate: req.body.university,
        parola: hash,
        userType: req.body.userType
      });
      console.log(user);
      dbo.collection("bibliotecaOnline").insertOne(user, function(err, res) {
        if (err) throw err;
        console.log("User entry created");
      });
    }
  });
});

app.post('/userData', (req,res) => {
  dbo.collection("bibliotecaOnline").findOne({_id:ObjectId(req.body.userId)}).then((foundUser) => {
    res.status(200).json({
      displayName: foundUser.nume
    })
  }).catch(err => console.log(err));
});

app.post('/login', (req, res) => {
  console.log(req.body);
  dbo.collection('bibliotecaOnline').findOne({mail: req.body.username}).then(foundUser => {
    bcrypt.compare(req.body.password, foundUser.parola).then((result) => {
      if(result){
        const token = jwt.sign({
          id: foundUser._id,
          displayName: foundUser.firstName,
          mail: foundUser.email,
          userType: foundUser.userType
        }, "secretString");
        res.status(200).json({
          token: token,
          userType: foundUser.userType,
          userId: foundUser._id
        });
      } else{
        res.status(401).json({message: 'Credentials Wrong'});
      }
    }).catch(err => {
      console.log("error in login()");
      res.status(500).json({
        error:err
      });
    });
  });
});

app.get("/getCarti",(req, res, next) => {
  dbo.collection("carte").find({}).toArray(function(err, booksFound) {
    if (err) throw err;
    res.status(200).json({
      carti: booksFound
    });
  });
});

app.get("/getCategorii",(req, res, next) => {
  dbo.collection("gen").find({}).toArray(function(err, categoriesFound) {
    if (err) throw err;
    res.status(200).json({
      categorii: categoriesFound
    });
  });
});





/*
app.get('/getcarti', (req,res) =>{
  dbo.collection('carte').find({}, (err, res) => {
    if(err) throw err;
    console.log(res.body);
    res.status(200).json(res);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});
*/
var contactSchema= new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  email: String,
  subiect: String,
  mesaj: String

})
var Contact = mongoose.model("Contact", contactSchema);

app.post('/contactu', (req, res) => {
  var contact = new Contact({
    _id: mongoose.Types.ObjectId(),
    email: req.body.email,
    subiect: req.body.subiect,
    mesaj: req.body.mesaj,
  });
  console.log(contact);
  dbo.collection("mesajeUser").insertOne(contact, function(err, res) {
    if (err) throw err;
    console.log("message entry created");
  });
});


app.get("/getMesaje",(req, res, next) => {
  dbo.collection("mesajeUser").find({}).toArray(function(err, mesajeFound) {
    //console.log (mesajeFound);
    if (err) throw err;
    res.status(200).json({
      mesaje: mesajeFound
    });
  });
});


var bookSchema= new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  isbn: String,
  titlu: String,
  autor: String,
  categoria: String

})
var categoriaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  nume: {
    type: String,
    unique: true
  }
})

var Categorie = mongoose.model("Categorie", categoriaSchema);

var Book = mongoose.model("Book", bookSchema);
app.post('/addBook', (req, res) => {
  var book = new Book({
    _id: mongoose.Types.ObjectId(),
    isbn: req.body.isbn,
    titlu: req.body.titlu,
    autor: req.body.autor,
    categoria: req.body.categoria,
  });
  var categoria = new Categorie({
    _id: mongoose.Types.ObjectId(),
    nume: req.body.categoria,
  })

    dbo.collection("gen").insertOne(categoria, function (err, res) {
      if (err) throw err;
      console.log("categoria entry created");
    });



  console.log(book);
  dbo.collection("carte").insertOne(book, function(err, res) {
    if (err) throw err;
    console.log("book entry created");
  });
});

var rezervareSchema= new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  email: String,
  carte: String,
  data_imp: String,
  data_ret: String

})
var Rezervare = mongoose.model("Rezervare", rezervareSchema);

app.post('/addRezervare', (req, res) => {
  var rezervare = new Rezervare({
    _id: mongoose.Types.ObjectId(),
    email: req.body.email,
    carte: req.body.titlu,
    data_imp: req.body.data_imp,
    data_ret: req.body.data_ret,
  });
  dbo.collection("rezervare").insertOne(rezervare, function (err, res) {
    if (err) throw err;
    console.log("rezervare entry created");
  });
})


app.get("/getRezervare",(req, res, next) => {
  dbo.collection("rezervare").find({}).toArray(function(err, rezervareFound) {
    console.log (rezervareFound);
    if (err) throw err;
    res.status(200).json({
      mesaje: rezervareFound
    });
  });
});



