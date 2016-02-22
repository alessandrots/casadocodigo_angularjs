//este eh o modulo principal, eh o primeiro que sera carregado,
//o array sao as dependencias para tal
//nao pode omitir esse array

angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos'])

//para ser uma SPA tem q na URL ter um #, senao vai transferir a chamada para o server
//com a tralha o angular sabe q tem q tratar a pagina do lado do cliente
.config(function($routeProvider, $locationProvider) {//objeto injetado por conta do ngRoute

  /*
  Outro ponto importante é que se o seu navegador não suportar este modo, automaticamente o Angular adotará a estratégia com # (hash).

  ATENÇÃO: para usar html5Mode seu servidor precisa estar preparado. Esta configuração está fora do escopo deste treinamento e você deve consultar a documentação do seu servidor favorito.

*/

   $locationProvider.html5Mode(true);

   //http://localhost:3000/#/fotos
   $routeProvider.when('/fotos', {
      templateUrl: 'partials/principal.html',
      controller: 'FotosController'
   });

   //http://localhost:3000/#/fotos/new
   $routeProvider.when('/fotos/new', {
      templateUrl: 'partials/foto.html',
      controller: 'FotoController'
   });

   $routeProvider.when('/fotos/edit/:fotoId', {
      templateUrl: 'partials/foto.html',
      controller: 'FotoController'
   });

   //http://localhost:3000/#/fotos/xxxxx vai sempre para fotos
   $routeProvider.otherwise({redirectTo: '/fotos'});

});
