(function(){
  angular.module('app').factory('msgs',[
    'toastr',
    MsgFactory
  ])

  function MsgFactory(toastr){
    function addMsg(msg,title,method){
      if (msg instanceof Array){
        msg.forEach(msg => toastr[method](msg,title))
      }else{
        toastr[method](msg,title)
      }
    }

    function addSuccess(msg){
      addMsg(msg,'Sucesso','success')
    }

    function addError(msg){
      addMsg(msg,'Erro','error')
    }

    return {addSuccess,addError}
  }
})()
