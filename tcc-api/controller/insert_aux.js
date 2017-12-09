const Model =insert_auxModel
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

  //ainda falta arrumar para trazer somente o nome do usuario ao inves de id
  show: function (req,res,cb){
    const query = {_id: req.params.id}

    Model.findOne (query, function (err, data){
          cb (err,data,res)
    })
  } ,


}
