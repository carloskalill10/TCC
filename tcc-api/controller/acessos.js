const Model = acessosModel
const ModelReservas = reservasModel
const ModelUsuarios = usuariosModel
const msg = ''
const async = require('async')

module.exports = {
  create: function (req, res, cb) {
    const dados = req.body.acesso;
    let queryUser = { "tag": dados.tag };

    ModelUsuarios.findOne(queryUser, function (err, data) {
      if (data != null) {
        let queryLab = {
          lab_res: dados.id_laboratorio,
          dt_entrada: { $gte: new Date(returnDate() + ' 00:00:00'), $lt: new Date(returnDate() + ' 23:59:59') },
          usuario_res: data._id
        };//criando query para pesquisar se existe laboratorio resenvado para o hora e dia para o usuario definido
        ModelReservas.findOne(queryLab, function (err, data) {//pesquindo se ha reserva
          if (data != null) {

            if (validaHora(data)) {//validando se existe laboratorio para hora definida
              dados.tag = queryLab.usuario_res;
              dados.dt_acesso = returnDateHora();
              const model = new Model(dados)

              model.save(function (err, data) {//salvando acesso
                respEsp = { 'ok': 'ok' }

                cb(err, respEsp, res)


              })
            } else {
              respEsp = { 'ok': 'nop1' }

              cb(err, respEsp, res)
            }

          }
          else {
            respEsp = { 'ok': 'nop2' }

            cb(err, respEsp, res)

          }

        })

      } else {
        respEsp = { 'ok': 'nop3' }
        cb(err, respEsp, res)


      }

    })

  },

  // arrumar os selects para trazer nome do laboratorio e nome do usuario
  retrieve: function (req, res, cb) {
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


function returnDate() {
  let dateNow = new Date();
  dateNow = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
  return dateNow;
}

function validaHora(data) {
  let horaEntrada = new Date(data.dt_entrada).getUTCHours();
  let horaSaida = new Date(data.dt_saida).getUTCHours();
  let horaAgora = new Date().getHours();
  if (horaAgora <= horaSaida) {
    return true;
  } else {
    return false;
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