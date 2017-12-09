const mongoose =require ('mongoose')

const Schema = mongoose.Schema

const usuariosSchema =  new Schema({
  tag :{type: String,required:true},
  nome: {type: String, required:true},
  tipo: {type: Number, default:2,required:true },
  funcao:{type: String, required:true, uppercase:true,
        enum:['ADMINISTRADOR','PROFESSOR','ALUNO','ASSISTENTE ADMINISTRATIVO','EXTERNO']
      },
  ativo:{type:Boolean,default:true,required:true},
  senha:{type:String, required:true},

})

module.exports = usuariosModel= mongoose.model ('usuarios',usuariosSchema)
