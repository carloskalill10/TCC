(function(){
  angular.module('app').controller('userCtrl',[
    '$scope',
    '$http',
    userController
  ])

  function userController($scope,$http){
    const url=['http://localhost:3000/api/usuarios','http://localhost:3000/api/insert_aux']
    $scope.userTipo=false
    $scope.user={}
    $scope.user.tipo=false

    $scope.listaruser=function () {
      $http.get(url[0]).then(function(response){
        let users =response.data
        $scope.users=[]
        users.forEach(function(data){
          if (data.tipo==1){
            data.tipo='ADMINISTRADOR'
            $scope.users.push(data)
          }else{
            data.tipo='COMUM'
            $scope.users.push(data)
          }
        })
      })
    }

    $scope.create=function(){
      if($scope.user.tipo==false){
        $scope.user.tipo=2
      }
      $http.post(url[0],$scope.user).then(function(response) {
        $scope.user ={}
        alert('Usuário cadastrado')
      }).catch(function(resp){
        alert('falha na operção')
      })
    }
    $scope.habilitarForm=function(){
      $http.get(url[1]).then(function(response){
        const retorno = response.data;
        if(retorno!==null){
         
          $scope.user.tag=retorno[0].tag;
        }
      });
    }
    $scope.iniciarModalDeletarU=function(user){
      $('#modal-DeletarU').modal('show')
      $scope.user=user
      var str1="ADMINISTRADOR"
      if(str1==$scope.user.tipo){
          $scope.userTipo=true
      }else{
          $scope.userTipo=false
      }

    }

    $scope.fecharModalDeletarU=function(){
      $('#modal-DeletarU').modal('hide');
      $scope.listaruser()
    }

    $scope.desabilitar=function () {
       let desabilitar = url+"/"+$scope.user._id
       $http.delete(desabilitar).then(function(response){
         $scope.fecharModalDeletarU()
         alert('Usuário Excluído')
       }).catch(function(resp){
          $scope.fecharModalDeletarU()
         alert('Erro na exclusão')
       })
     }

     $scope.iniciarModalU=function(user){
       $('#modal-atualizarU').modal('show')
       $scope.user=user
       var str1="ADMINISTRADOR"
       if(str1==$scope.user.tipo){
          $scope.user.tipo=true
       }else{
          $scope.user.tipo=false
       }

     }

     $scope.fecharModalU=function(){
       $('#modal-atualizarU').modal('hide');
       $scope.listaruser()
     }

     $scope.atualizarU=function(){
       let atualizar = url+"/"+$scope.user._id
       if($scope.user.tipo==true){
          $scope.user.tipo=1
       }else{
          $scope.user.tipo=2
       }
       console.log($scope.user.tipo)
       $http.put(atualizar,$scope.user).then(function(response){
         $scope.fecharModalU()
         alert('Atualização Realizada')

       }).catch(function(resp){
         $scope.fecharModalU()
         alert('Erro na Atualização')

       })
     }

    $scope.listaruser()
    $scope.habilitarForm()

  }

})()
