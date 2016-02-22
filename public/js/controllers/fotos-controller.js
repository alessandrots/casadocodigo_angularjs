//neste caso aqui quer indicar um modulo ja existente, no caso um controller
angular.module('alurapic').controller('FotosController', function($scope, $http, recursoFoto){//$resource) {
//   var fotos = [
//       {
//        titulo:'Leaozinho',
//        url: 'http://www.fundosanimais.com/Minis/leoes.jpg'
//       },
//       {
//        titulo:'Leaozinho2',
//        url: 'http://www.fundosanimais.com/Minis/leoes.jpg'
//       },
//       {
//        titulo:'Leaozinho3',
//        url: 'http://www.fundosanimais.com/Minis/leoes.jpg'
//       },
//       {
//        titulo:'Leaozinho4',
//        url: 'http://www.fundosanimais.com/Minis/leoes.jpg'
//       },
// ];

  var fotos =[];


  //OK
  // var promise = $http.get('v1/fotos');
  // promise.then(function(retorno)  {
  //    fotos = retorno.data;
  //    $scope.fotos = fotos;
  // }).catch(function(error) {
  //    console.log('ERROr = ', error);
  // });

  $scope.filtro = '';

  //OK
  // $http.get('v1/fotos')
  // .success(function(data_) {
  //     // console.log('url ', data.url);
  //     fotos = data_;
  //     $scope.fotos = fotos;
  // })
  // .error(function(error) {
  //    console.log('ERROr = ', error);
  // });

  //Para substituir a rotina acima
  // var recursoFoto = $resource('/v1/fotos/:fotoId');

  // recursoFoto.query();
  // novidade aqui! Saiu $http.get!
  recursoFoto.query(function(fotos) {
      $scope.fotos = fotos;
  }, function(erro) {
      console.log(erro);
  });

  $scope.remover = function(foto) {
     console.log(foto);

     /*
     $http.delete("v1/fotos/" + foto._id)
     .success(function(){
        //atualizando a lista (pega o indice na lista e retira o mesmo com splice)
        var indiceDaFoto = $scope.fotos.indexOf(foto);
        $scope.fotos.splice(indiceDaFoto, 1);
        console.log('Foto ' + foto.titulo + ' removida com sucesso');
        $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
     })
     .error(function(erro) {
        console.log('Error = ', error);
        $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
     })
    */

    // novidade aqui! substituindo a rotina acima
    recursoFoto.delete({fotoId: foto._id}, function() {
        var indiceDaFoto = $scope.fotos.indexOf(foto);
        $scope.fotos.splice(indiceDaFoto, 1);
        $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
    }, function(erro) {
        console.log(erro);
        $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
    });
  };



});
