const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const insert_auxSchema =  new Schema({
  nome_laboratorio :{type: String,required:true},
  tag : {type: String,required:true},
  data :{type: Date,required:true},
})

module.exports= insert_auxModel= mongoose.model ('insert_aux',insert_auxSchema)
