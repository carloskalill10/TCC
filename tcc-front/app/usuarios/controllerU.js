(function(){
  angular.module('app').controller('userCtrl',[
    '$scope',
    '$http',
    userController

  ])

  function userController($scope,$http){

    const url='http://localhost:3000/api/usuarios'

    $scope.user={}
    $scope.user.tipo=false
    $scope.listaruser=function () {
      $http.get(url).then(function(response){
        let users =response.data
        $scope.users=[]
        users.forEach(function(data){
          data.tipo=data.tipo==1?'ADMINISTRADOR':'COMUM'
            $scope.users.push(data)
        })
      })
    }

    $scope.create=function(){
      if($scope.user.tipo==false){
        $scope.user.tipo=2
      }
      $http.post(url,$scope.user).then(function(response) {
        $scope.user ={}
        alert('Usuário cadastrado')
      }).catch(function(resp){
        alert('falha na operção')
      })
    }

    $scope.desabilitar=function (iduser) {
       let desabilitar = url+"/"+iduser
       $http.delete(desabilitar).then(function(response){
         $scope.listaruser()
         alert('Laboratorio Excluido')
       }).catch(function(resp){
         alert('Erro na exclusão')
       })
     }

     $scope.iniciarModalU=function(id,tag,nome,funcao,tipo){
       var str1="ADMINISTRADOR"
       if(str1==tipo){
         $scope.userTipo=true
       }else{
         $scope.userTipo=false
       }
       $('#modal-atualizarU').modal('show')
       $scope.userId=id
       $scope.userTag=tag
       $scope.userNome=nome
       $scope.userFuncao=funcao
     }

     $scope.fecharModalU=function(){
       $('#modal-atualizarU').modal('hide');
     }

     $scope.atualizarU=function(){
       let atualizar =url+"/"+$scope.userId
       let json = {"nome":$scope.userNome,
                  "funcao":$scope.userFuncao,
                  "tipo":$scope.userTipo}

       $http.put(atualizar,json).then(function(response){
         alert('Atualização Realizada')
         $scope.fecharModalU()
         $scope.listaruser()

       }).catch(function(resp){
         alert('Erro na Atualização')
         $scope.fecharModalU()

       })
     }

    $scope.listaruser()

  }

})()
