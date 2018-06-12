var app = angular.module("app", ['ui.bootstrap']);

app.controller("myController", function($scope, $http, $uibModal, ) {
 
  // obtiene los datos del archivo json
  $http.get("dataLibros.json")
    .then(function(response){
        $scope.listaLibros = response.data;
    });

  // remueve a un elemento de la lista
  $scope.removeItem = function (x) {
    $scope.listaLibros.splice(x, 1);
  };

  //ordena los elementos de la lista
  $scope.orderByMe = function(x) {
    $scope.myOrderBy = x;
  }

//funcion que abre el modal
  $scope.open = function() {
    $scope.nuevoLibro={};
    var modalInstance = $uibModal.open({
      templateUrl: "agregarLibro.html",
      controller: 'ModalInstanceCtrl',
      resolve:{
        nuevoLibro: function(){
          return $scope.nuevoLibro
        }
      }
    });

    modalInstance.result.then(function(selectedItem){
    $scope.listaLibros.push({
      "name":$scope.nuevoLibro.name,
      "autor":$scope.nuevoLibro.autor,
      "editorial":$scope.nuevoLibro.editorial,
      "edition":$scope.nuevoLibro.edition + "°",
    })
  })
  }
});

//el controlador del modal, con la funcion de cerrar y agregar
app.controller('ModalInstanceCtrl', function($scope ,$uibModalInstance,nuevoLibro) {
  

  $scope.nuevoLibro = nuevoLibro;

  $scope.agregarNuevoLibro = function(){
    $uibModalInstance.close(nuevoLibro);
  }

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});





