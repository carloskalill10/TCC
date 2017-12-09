const Model =usuariosModel
const msg = ''
const async =require ('async')

module.exports ={
  create: function (req,res, cb){
    const dados =req.body
    const model = new Model(dados)

    model.save (function(err,data){
      cb (err,data, res)
    })
  },

  retrieve: function(req,res,cb){
    Model.find({}, function (err,data){
      cb (err,data,res)
    })
  },


  show: function (req,res,cb){
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

  desabilitar: function (req,res,cb){
    const query={_id:req.params.id}
    const mod = {"ativo":false}

    delete mod._id
    Model.update (query, mod, function(err,data){
      cb (err,data,res);
    })
  },



}
