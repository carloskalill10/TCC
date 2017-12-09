const debug =require ('debug')('poc')
const app = require ('../app')

app.set ('port',3000);

const server = app.listen (app.get ('port'), function(){
  debug (`Escutando a porta ${app.get ('port')}`)
})
