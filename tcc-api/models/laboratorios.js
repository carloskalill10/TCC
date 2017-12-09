const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const labsSchema =  new Schema({
  nome :{type: String,required:true},
  ativo:{type:Boolean,default:true,required:true},
})

module.exports = labsModel= mongoose.model ('labs',labsSchema)
