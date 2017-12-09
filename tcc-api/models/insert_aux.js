const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const insert_auxSchema =  new Schema({
  id_laboratorio :{type: Schema.Types.ObjectId, ref: 'labs'},
  tag : {type: String,required:true},
  data :{type: Date,required:true},
})

module.exports= insert_auxModel= mongoose.model ('insert_aux',insert_auxSchema)
