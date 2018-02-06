const fs = require ('fs')

const MODELS_FOLDER ='./models'

fs.readdirSync (MODELS_FOLDER).forEach (function(file){
  if (file !== 'index.js'){
    require ('./'+file);
    console.log ('modulo adicionado: '+file)
  }
})
