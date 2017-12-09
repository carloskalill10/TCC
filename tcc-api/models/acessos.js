const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const acessosSchema =  new Schema({
  nome_laboratorio :{type: String,required:true},
  nome_usuario : {type: String,required:true},
  data_acesso :{type: Date,required:true},
})

module.exports= acessosModel= mongoose.model ('acessos',acessosSchema)
