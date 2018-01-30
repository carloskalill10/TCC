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


    //---------------------------------------------------------
  /*

    $scope.iniciarModal=function(nome,id){
      $('#modal-atualizar').modal('show')
      $scope.labNome=nome
      $scope.labId=id

    }

    $scope.fecharModal=function(){
      $('#modal-atualizar').modal('hide');
    }

    $scope.atualizarLab=function(){
      let atualizar =url+"/"+$scope.labId
      let json = {"nome":$scope.labNome}

      $http.put(atualizar,json).then(function(response){
        alert('Atualização Realizada')
        $scope.fecharModal()
        $scope.listarLab()

      }).catch(function(resp){
        alert('Erro na Atualização')
        $scope.fecharModal()

      })
    }
    */
    $scope.listaruser()

  }

})()
