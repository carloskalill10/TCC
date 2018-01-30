(function(){
  angular.module('app').controller('labCtrl',[
    '$scope',
    '$http',
    labController

  ])

  function labController($scope,$http){

    const url='http://localhost:3000/api/laboratorios'
    $scope.lab ={}
    $scope.listarLab=function () {
      $http.get(url).then(function(response){
        $scope.labs =response.data
      })
    }

    $scope.create=function(){
      $http.post(url,$scope.lab).then(function(response) {
        $scope.lab ={}
        alert('Laboratório cadastrado')
      }).catch(function(resp){
        alert('falha na operção')
      })
    }
    $scope.desabilitar=function (idLab) {
      let desabilitar = url+"/"+idLab
      $http.delete(desabilitar).then(function(response){
        $scope.listarLab()
        alert('Laboratorio Excluido')
      }).catch(function(resp){
        alert('Erro na exclusão')
      })
    }

    $scope.iniciarModal=function(nome,id){
      $('#modal-atualizar').modal('show')
      $scope.labNome=''
      $scope.labId=id
      console.log('ini '+$scope.labNome)

    }

    $scope.fecharModal=function(){
      $('#modal-atualizar').modal('hide');
    }

    $scope.atualizarLab=function(teste=1){
      let atualizar =url+"/"+$scope.labId
      let json = {"nome":$scope.labNome}
      console.log(json)
      /*$http.put(atualizar,json).then(function(response){
        alert('Atualização Realizada')
        $scope.fecharModal()
        $scope.listarLab()

      }).catch(function(resp){
        alert('Erro na Atualização')
        $scope.fecharModal()

      })*/
    }

    $scope.listarLab()

  }

})()
