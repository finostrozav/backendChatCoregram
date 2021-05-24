const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');


const router = express.Router();

router.get('/:userId', function (req, res){
   const userId = req.params.userId || null;
   controller.listChats(userId)
   .then((users) => {
       response.success (req, res, users, 200);
   })
   .catch(e => {
       response.error(req, res, 'Error inesperado', 500, e)
   })
});

router.post('/', function (req, res){
    controller.addChat(req.body.users)
    .then((data) => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req,res, 'Error', 400, 'Ha ocurrido un error en el controlador', e);
    });
});



module.exports = router;