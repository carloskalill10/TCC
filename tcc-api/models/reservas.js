const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const reservasSchema =  new Schema({
  dt_reserva :{type: Date,required:true},
  dt_entrada: {type: Date, required:true},
  dt_saida: {type: Date, required:true},
  usuario_res: {type: Schema.Types.ObjectId, ref: 'usuarios'},
  lab_res: {type: Schema.Types.ObjectId, ref:'labs'},
})

module.exports = reservasModel= mongoose.model ('reservas',reservasSchema)
