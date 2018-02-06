const mongoose =require ('mongoose')

const dbURI = 'mongodb://localhost/db_laboratorios';
//const dbURI = ' mongodb://adrisson:dmr123321@ds125618.mlab.com:25618/teste';

mongoose.connect (dbURI);

mongoose.connection.on ('connected',function(){
  console.log (`conectado a ${dbURI}`)

})

mongoose.connection.on ('error',function(err){
  console.log (`erro na conexão ${err}`)

})

require ('../models/index')
