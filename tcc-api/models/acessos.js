const mongoose = require('mongoose')
const timeZone = require('mongoose-timezone')
const Schema = mongoose.Schema

const acessosSchema = new Schema({
  id_laboratorio: { type: Schema.Types.ObjectId, ref: 'labs', required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true },
  dt_acesso: 
    { 
      type: Date, 
      default: Date.now, 
      required: true 
    },
})
acessosSchema.plugin(timeZone,{paths:['dt_acesso']})
module.exports = acessosModel = mongoose.model('acessos', acessosSchema)
