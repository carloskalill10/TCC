const Model =insert_auxModel
const msg = ''
const async =require ('async')

module.exports ={

  create: function (req, res, cb){
    const dados =req.body.insert_aux
    let queryUser={"tag":dados.tag}
    const model = new Model(queryUser)

    model.save (function(err,data){
      cb (err,data, res)
    })
  },

  show: function (req,res,cb){
    const query = {_id: req.params.id}
    Model.findOne (query, function (err, data){
      cb (err,data,res)
    })
  },
}
