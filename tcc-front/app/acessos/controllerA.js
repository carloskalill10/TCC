(function(){
  angular.module('app').controller('acessoCtrl',[
    '$scope',
    '$http',
    acessoController

  ])

  function acessoController($scope,$http){

    const urls = ['http://localhost:3000/api/usuarios', 'http://localhost:3000/api/laboratorios'
    , 'http://localhost:3000/api/reservas'];
  
    $scope.labs = [];
    
    $scope.listarLabs = function () {
      $http.get(urls[1]).then(function (response) {
          $scope.labs = response.data;
      }).catch(function (resp) {
          console.log(resp);
      });
  };  

    $scope.listarLabs()
  }

})()
