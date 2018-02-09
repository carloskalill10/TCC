const Model =reservasModel
const msg = ''
const async =require ('async')

module.exports ={
  create: function (req,res, cb){
    const dados =req.body
    dados.dt_reserva=returnDate()
    const model = new Model(dados)

    model.save (function(err,data){
      cb (err,data, res)
    })
  },

  retrieve: function(req,res,cb){ // consertar para trazer nome do usuario e do laboratorio que foi feita a reserva
    Model.find({}, function (err,data){
      
      cb (err,data,res)
    })
  },

  show: function (req,res,cb){ // consertar para trazer nome do usuario e do laboratorio que foi feita a reserva 
    const query = {_id: req.params.id}

    Model.findOne (query, function (err, data){
      cb (err, data, res)
    })
  } ,
  
  update: function (req,res,cb){
    const query={_id:req.params.id}
    const mod = req.body

    delete mod._id
    Model.update (query, mod, function(err,data){
      cb (err,data,res);
    })
  },

  deletar: function (req,res,cb){
    const query={_id:req.params.id}

    Model.remove (query, function(err,data){
      cb (err,data,res);
    })
  },

}

function returnDate() {
  let dateNow = new Date();
  let day = dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate();
  let month = (dateNow.getMonth() + 1) < 10 ? "0" + (dateNow.getMonth() + 1) : (dateNow.getMonth() + 1);
  let hours = dateNow.getHours() < 10 ? "0" + dateNow.getHours() : dateNow.getHours();
  let minutes = dateNow.getMinutes() < 10 ? "0" + dateNow.getMinutes() : dateNow.getMinutes();
  let dataString = dateNow.getFullYear() + "-" + month + "-" +day + "T" + hours + ":" + minutes + ":00";
  return dataString;
}