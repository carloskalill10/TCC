const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const insert_auxSchema =  new Schema({
  tag : {type: String,required:true},
  data :{type: Date,required:true, default:Date.now},
})

module.exports= insert_auxModel= mongoose.model ('insert_aux',insert_auxSchema)