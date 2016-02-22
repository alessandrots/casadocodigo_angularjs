// public/js/controllers/foto-controller.js
//$routeParams da acesso aos parametros que se quer acessar
angular.module('alurapic')
    .controller('FotoController', function($scope, $http, $routeParams, recursoFoto){//$resource) {

        $scope.foto = {};
        $scope.mensagem = '';

        // var recursoFoto = $resource('/v1/fotos/:fotoId');

        // novidade aqui! Alteramos a criação de recursoFoto!
        // var recursoFoto = $resource('/v1/fotos/:fotoId', null, {
        //     'update' : {
        //         method: 'PUT'
        //     }
        // });


        if($routeParams.fotoId) {
            console.log('Foto Parametros = ',$routeParams.fotoId);
            // $http.get('/v1/fotos/' + $routeParams.fotoId)
            // .success(function(foto) {
            //     $scope.foto = foto;
            // })
            // .error(function(erro) {
            //     console.log(erro);
            //     $scope.mensagem = 'Não foi possível obter a foto'
            // });
            recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
                $scope.foto = foto;
            }, function(erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível obter a foto'
            });
        }

        $scope.submeter = function() {
             console.log($scope.foto);

            if ($scope.formulario.$valid) {
              //alteracao
              if($routeParams.fotoId) {
                    // $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
                    // .success(function() {
                    //     $scope.mensagem = 'Foto alterada com sucesso';
                    //
                    // })
                    // .error(function(erro) {
                    //     console.log(erro);
                    //     $scope.mensagem = 'Não foi possível alterar';
                    // });

                    // Novidade aqui! Usando nosso update!
                    recursoFoto.update({fotoId: $scope.foto._id},
                        $scope.foto, function() {
                        $scope.mensagem = 'Foto alterada com sucesso';
                    }, function() {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível alterar';
                    });

             } else {
                  //insercao
                  // $http.post('/v1/fotos', $scope.foto)
                  //  .success(function() {
                  //      console.log('Foto adicionada com sucesso');
                  //      $scope.mensagem = 'Foto cadastrada com sucesso';
                  //  })
                  //  .error(function(erro) {
                  //      console.log('Não foi possível cadastrar a foto');
                  //      $scope.mensagem = 'Não foi possível cadastrar a foto';
                  //  })
                  recursoFoto.save($scope.foto, function() {
                        $scope.foto = {};
                        $scope.mensagem = 'Foto cadastrada com sucesso';
                  }, function(erro) {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível cadastrar a foto';
                  });
              }
            }


       };



    });
