const mongoose = require ('mongoose')
const timeZone = require('mongoose-timezone')
const Schema = mongoose.Schema

const insert_auxSchema =  new Schema({
  tag : {type: String,required:true},
  data :{type: Date,required:true},
})
insert_auxSchema.plugin(timeZone,{paths:['data']})
module.exports= insert_auxModel= mongoose.model ('insert_aux',insert_auxSchema)