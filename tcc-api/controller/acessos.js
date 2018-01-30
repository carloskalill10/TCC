const Model =acessosModel
const ModelReservas = reservasModel
const msg = ''
const async =require ('async')

module.exports ={
  create: function (req, res, cb){
    const dados =req.body.acesso;
    const model = new Model(dados)
    let queryLab={
      lab_res:dados.id_laboratorio,
      dt_entrada:{$gte:new Date(returnDate()+' 00:00:00'),$lt:new Date(returnDate()+' 23:59:59')},
      usuario_res:dados.id_usuario
    };//criando query para pesquisar se existe laboratorio resenvado para o hora e dia para o usuario definido
    reservasModel.findOne (queryLab, function (err, data){//pesquindo se ha reserva
      if(data!=null){
        if(validaHora(data)){//validando se existe laboratorio para hora definida
          model.save (function(err,data){//salvando acesso
            respEsp={'ok':'ok'}
            cb (err,respEsp,res)
          })
        }else{
          respEsp={'ok':'nop'}
          cb (err,respEsp,res)
        }
      }else{
        respEsp={'ok':'nop'}
        cb (err,respEsp,res)
      }
    })
  },

  // arrumar os selects para trazer nome do laboratorio e nome do usuario
  retrieve: function(req,res,cb){
    Model.find({}, function (err,data){
      cb (err,data,res)
    })
  },

  show: function (req,res,cb){
    const query = {_id: req.params.id}
    Model.findOne (query, function (err, data){
          cb (err,data,res)
    })
  } ,

}


function returnDate(){
  let dateNow=new Date();
  dateNow = `${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}`;
  return dateNow;
}

function validaHora(data){
  let horaEntrada=new Date(data.dt_entrada).getUTCHours();
  let horaSaida = new Date(data.dt_saida).getUTCHours();
  let horaAgora = new Date().getHours();
  if(horaAgora<=horaSaida){
    return true;
  }else{
    return false;
  }

}