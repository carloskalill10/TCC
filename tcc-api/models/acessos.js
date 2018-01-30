const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const acessosSchema =  new Schema({
  id_laboratorio :{type: Schema.Types.ObjectId, ref: 'labs', required:true},
  id_usuario : {type: Schema.Types.ObjectId, ref: 'usuarios', required:true},
  dt_acesso :{type: Date,default:Date.now, required:true},
})

module.exports= acessosModel= mongoose.model ('acessos',acessosSchema)
