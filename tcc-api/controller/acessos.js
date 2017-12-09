const Model =acessosModel
const ModelUser = usuariosModel
const msg = ''
const async =require ('async')

module.exports ={
  create: function (req, res, cb){
    const dados =req.body
    const model = new Model(dados)

    model.save (function(err,data){
      cb (err,data, res)
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
