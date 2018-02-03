const express = require ('express');
const router = express.Router();
const Controller =require ('../controller/insert_aux');

const cbResponseJSON = function (err,data,res){
    if (err){
      console.log ('Erro:',err)
      msg=`Erro: ${err}`
    }else {
      console.log ('Resposta: ',data)
      msg=data
    }
    res.json(msg);
}

const cbAstncResponseJSON = function (err,data,res,callback){
  if (err){
    console.log ('Erro:', err)
    msg=` Erro: ${err}`
  }else{
    console.log ('Resposta: ',data)
    msg=data
  }
  res.json(msg);
  callback()
}

router.get ('/', function (req,res){
  Controller.show (req,res,cbResponseJSON)
})

router.get ('/:id', function (req,res){
  Controller.show (req,res,cbResponseJSON)
})

router.post ('/', function (req,res){
  Controller.create (req,res,cbResponseJSON)
})

module.exports =router;
