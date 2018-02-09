const Model = insert_auxModel
const ModelUser = usuariosModel
const msg = ''
const async = require('async')
var moment = require('moment-timezone');
//var teste={};
module.exports = {

  create: function (req, res, cb) {
    const dados = req.body.insert_aux
    let queryUser = { "tag": dados.tag, "data": returnDateHora() }

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

  showFirstLast: function (req, res, cb) {
    Model.find({}).sort({ "data": -1 }).limit(1).exec(function (err, data) {
      const queryUser = { "tag": data[0].tag, "ativo": true }
      ModelUser.find(queryUser, function (err, dataUser) {
        if (dataUser.length==0) {
          cb(err, data, res)
        } else {
            cb (err,null,res)
        }

      })
    });
  }
}

function returnDateHora() {
  let dateNow = new Date();
  let day = dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate();
  let month = (dateNow.getMonth() + 1) < 10 ? "0" + (dateNow.getMonth() + 1) : (dateNow.getMonth() + 1);
  let hours = dateNow.getHours() < 10 ? "0" + dateNow.getHours() : dateNow.getHours();
  let minutes = dateNow.getMinutes() < 10 ? "0" + dateNow.getMinutes() : dateNow.getMinutes();
  let dataString = dateNow.getFullYear() + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":00";
  return dataString;
}