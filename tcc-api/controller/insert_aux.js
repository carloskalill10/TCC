const Model = insert_auxModel
const msg = ''
const async = require('async')
var moment = require('moment-timezone');
module.exports = {

  create: function (req, res, cb) {
    const dados = req.body.insert_aux
    let queryUser = { "tag": dados.tag }
    const model = new Model(queryUser)

    model.save(function (err, data) {

      cb(err, data, res)
    })
  },

  retrieve: function (req, res, cb) { // consertar para trazer nome do usuario e do laboratorio que foi feita a reserva
    Model.find({}, function (err, data) {
      cb(err, data, res)
    })
  },

  show: function (req, res, cb) {
    const query = { _id: req.params.id }
    Model.findOne(query, function (err, data) {
      cb(err, data, res)
    })
  },
}

