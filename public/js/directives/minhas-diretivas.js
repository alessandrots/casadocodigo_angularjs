/*
DDO directive definition object
*/
angular.module('minhasDiretivas', [])
.directive('meuPainel', function() {
  var ddo={}

   ddo.restrict = "AE";//Attribute Element, usar como atributo e elemento

   ddo.transclude = true;//indicando que deve manter os elementos filhos no DOM, que eh o caso da imagem

  //a diretiva deve ter o seu proprio, deve ficar isolada, encapsulada, ter seu escopo privado.
   ddo.scope = {
      // titulo:'@titulo';
      titulo:'@'
       //o @xxx eh variavel q vai receber o valor informado na view, eh o atributo q vai na diretiva
       //qdo o nome do atributo eh igual ao nome da propriedade da diretiva, pode deixar soh o arroba
       // se tiver {{foto.titulo}} passado no atributo, entao sera passado para o escopo privado dessa propriedade
      //<!-- a diretiva tem q ser com hifen
      // <meu-painel titulo="Cachorrao">
      // </meu-painel>
      // -->
   };

   //template com o html
   // ddo.template =
   //                '<div class="panel panel-default">'
   //            +   '   <div class="panel-heading">'
   //            +   '        <h3 class="panel-title text-center">{{titulo}}</h3> '
   //            +   '   </div>'
   //            +   '   <div class="panel-body" ng-transclude>'
   //            +   '   </div>'
   //            +   '</div>'
  ddo.templateUrl = 'js/directives/meu-painel.html'

 return ddo;
})

.directive('minhaFoto', function() {

        var ddo = {};

        ddo.restrict = "AE";

        ddo.scope = {
            titulo: '@',
            url: '@'
        };

        ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';

        return ddo;

})

.directive('meuBotaoPerigo', function() {
    var ddo = {};
    ddo.restrict = "E";
    ddo.scope = {
        nome: '@',//eh uma copia de valor e esse valor sempre eh uma string
        acao : '&'//aqui vai ser recebido como uma expressao e nao como uma string.. pq vai ser executado como uma fucnao
    }
    ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao()">{{nome}}</button>';

    return ddo;
});
