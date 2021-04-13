const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
let handlebars = require('handlebars');
let fs = require('fs');

let readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}))

const db = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: '',
})


db.connect(function (err) {if(err) throw err; console.log('Connected')});


app.use(express.static('../client/build'));
app.get('/server/goods', function (req, res){

    db.query("SELECT * FROM goods", function (err, result, fields){
      if(err) throw err;
      res.json(result);

    });
})

app.get('/server/blogs', function (req, res){

  db.query("SELECT * FROM blogs", function (err, result, fields){
    if(err) throw err;
    res.json(result);

  });
})

app.post('/server/email', function (req, res){
  let mailOptions = {
    from: 'contact@newwaycos.com',
    to: 'olx@newwaycos.com',
    subject: 'Обратная связь',
    text: JSON.stringify(req.body)
  };
  let transporter = nodemailer.createTransport({
    host: 'mail.adm.tools',
    port: 465,
    secure: true,
    auth: {
      user: '',
      pass: ''
    }
  });
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.json(JSON.stringify({
        result: error
      }));
    } else {
      console.log('Email sent: ' + info.response);
      res.json(JSON.stringify({
        result: 'success'
      }))
    }
  });
  req.end;
})


app.get('/server/sessionCheck', function (req, res){
  if(req.session.id){
    console.log(req.session.id);
  } else {
    console.log('Not set')
  }
})

app.post('/server/postOrder', function (req, res){
  let sql = "INSERT INTO orders (products, name, surname, tel, email, delivery, deliveryTown, deliveryNumber, payment) VALUES ('"
  + JSON.stringify(req.body.products) + "', '"
  + req.body.name + "','"
  + req.body.surname + "', "
  + req.body.tel + " , '"
      + req.body.email + "',"
  + (req.body.delivery.type === 'np' ? 1 : 0) + " ,'"
  + req.body.delivery.inputNPState + "', "
  + req.body.delivery.inputNP2State + " ,"
  + (req.body.payment === 'cash' ? 1 : 0) + ")";
  db.query(sql , function (err, result, fields){
    if(err){
      res.json(JSON.stringify({
        result: err
      }));
    } else {
      if(req.body.email !== 'null' && req.body.email !== null){
          let transporter = nodemailer.createTransport({
              host: 'mail.adm.tools',
              port: 465,
              secure: true,
              auth: {
                  user: 'contact@newwaycos.com',
                  pass: ''
              }
          });
          readHTMLFile(__dirname + '/templates/emailThankYou.html', function (err, html) {
              let template = handlebars.compile(html);
              let productsForEmail = '';
              for (const [key, item] of Object.entries(req.body.products)) {
                  productsForEmail +=  item.name + ", Количество: " + item.quantity + "; \n";
              }
              let replacements = {
                  name: req.body.name,
                  surname: req.body.surname,
                  email: req.body.email,
                  tel: req.body.tel,
                  products: productsForEmail,
                  payment: req.body.payment === 'cash' ? 'Наложенный платёж' : 'Банковская картка',
                  deliveryToF: req.body.delivery === 'np' ? '' : 'none',
                  delivery: req.body.delivery === 'np' ? 'Нова пошта'  : 'Самовывоз',
                  delivery1: req.body.delivery.inputNPState,
                  delivery2: req.body.delivery.inputNP2State
              };
              let htmlToSend = template(replacements);
              let mailOptions = {
                  from: 'contact@newwaycos.com',
                  to: req.body.email,
                  subject: 'New Way Cosmetics - Спасибо за покупку:)',
                  html: htmlToSend
              };
              transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                      console.log(error);
                  } else {
                      console.log('Email sent: ' + info.response);
                  }
              });
          })
      }
      res.json(JSON.stringify({
        result: 'success'
      }))
    }
  });
  for (const [key, item] of Object.entries(req.body.products)) {
      let sqlUpdate = 'UPDATE goods SET quantity=' + parseInt(item.maxQuantity, 2) + ' WHERE id =' + item.id;
      db.query(sqlUpdate, function (err, result, fields){
          if(err){
              console.log(err)
          }
      })
  }
  req.end;
})

app.post('/server/login', function (req, res){


  let login = req.body.login;
  let password = req.body.password;

  db.query("SELECT id FROM users WHERE login = '" + login + "' AND password = '" + password +"'", function (err, result, fields){
    if(result[0]){
      req.session.id = result[0].id;
      res.json(JSON.stringify({
        result: 'success',
        id: result[0].id
      }));
    } else {
      res.json(JSON.stringify({
        result: 'error'
      }));
    }
  });



})

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(3002, ()=> {
  console.log("running on port 3003");
})



