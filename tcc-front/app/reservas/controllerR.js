(function () {
    angular.module('app').controller('reservaCtrl', [
        '$scope',
        '$http',
        reservaController
    ])
    function reservaController($scope, $http) {
        const urls = ['http://localhost:3000/api/usuarios', 'http://localhost:3000/api/laboratorios'
            , 'http://localhost:3000/api/reservas'];
        $scope.users = [];
        $scope.labs = [];
        $scope.listarUsers = function () {
            $http.get(urls[0]).then(function (response) {
                $scope.users = response.data;
            }).catch(function (resp) {
                console.log(resp);
            });
        };
        $scope.listarLabs = function () {
            $http.get(urls[1]).then(function (response) {
                $scope.labs = response.data;
            }).catch(function (resp) {
                console.log(resp);
            });
        };
        $scope.cadastrarReserva = function () {
            let reserva = $scope.reserva;
            reserva.dt_entrada = converterData(reserva.data, reserva.hora_entrada);
            reserva.dt_saida = converterData(reserva.data, reserva.hora_saida);
            $http.post(urls[2], reserva).then(function (response) {
                alert('Reserva realizada!!');
            }).catch(function (resp) {
                console.log(resp)
            });
        };
        $scope.listarUsers();
        $scope.listarLabs();
    }
    function converterData(data, hora) {
        //let date = new Date(data);
        let day = data.getDate() < 9 ? "0" + data.getDate() : data.getDate();
        let month = (data.getMonth() + 1) < 9 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
        let hours = hora.getHours() < 9 ? "0" + hora.getHours() : hora.getHours();
        let minutes = hora.getMinutes() < 9 ? "0" + hora.getMinutes() : hora.getMinutes();
        let dataString = day + "/" + month + "/" + data.getFullYear() + " " + hours + ":" + minutes + ":00";
        let date = new Date(dataString);
        return date;
    }
})()