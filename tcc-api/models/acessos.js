const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const acessosSchema =  new Schema({
  id_laboratorio :{type: Schema.Types.ObjectId, ref: 'labs'},
  id_usuario : {type: Schema.Types.ObjectId, ref: 'usuarios'},
  dt_acesso :{type: Date,required:true},
})

module.exports= acessosModel= mongoose.model ('acessos',acessosSchema)
