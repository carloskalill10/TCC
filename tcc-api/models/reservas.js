const mongoose = require ('mongoose')
const timeZone = require('mongoose-timezone')
const Schema = mongoose.Schema

const reservasSchema = new Schema({
  dt_reserva :{type: Date, required:true},
  dt_entrada:{type: Date, required:true},
  dt_saida: {type: Date, required:true},
  usuario_res: {type: Schema.Types.ObjectId, ref: 'usuarios', required:true},
  lab_res: {type: Schema.Types.ObjectId, ref:'labs',required:true},
})
reservasSchema.plugin(timeZone,{paths:['dt_entrada','dt_saida','dt_reserva']})
module.exports = reservasModel= mongoose.model ('reservas',reservasSchema)
