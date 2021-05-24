const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const router = require('./network/routes');
const db = require('./db');

db('mongodb+srv://Felipe:123@clustertest.iehod.mongodb.net/HelloWorld?retryWrites=true&w=majority');

app.use(cors());

app.use(bodyParser.json());
//app.use(router);
app.use('/app', express.static('public'));

socket.connect(server);

router(app);
// app.use('/', function(req, res){
//     res.send('Hola');
// });

server.listen(3000, function(){
    console.log('Escuchando en puerto 3000');
});
