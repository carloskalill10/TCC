(function(){
  angular.module('app').controller('acessoCtrl',[
    '$scope',
    '$http',
    acessoController

  ])

  function acessoController($scope,$http){

    const url='http://localhost:3000/api/acessos'
    $scope.lab ={}
    $scope.listarLab=function () {
      $http.get(url).then(function(response){
        $scope.labs =response.data
      })
    }

    $scope.listarLab()
  }

})()
