Aula 1
Angular é um script como outro qualquer, por isso precisa ser importado em nossa página através da tag script, mas isso não é suficiente. Precisamos criar um módulo (outro script) e importá-lo em nossa página. Este módulo é apelidado de principal, porque é o primeiro que será carregado pelo Angular e que pode ou não carregar outros a partir dele, isto é, suas dependências. Importar o script do módulo também não é suficiente, por quê? Se tivéssemos carregado vários scripts de módulos em nossa página, como o Angular saberia qual inicializar primeiro? É por isso que precisamos usar a diretiva ng-app, que possui como valor o nome do módulo que desejamos carregar assim que nossa página for carregada.

Usamos Angular Expressions (AE's) para abrir lacunas em views. Essa ideia de termos lacunas que precisam ser preenchidas remete à ideia de templates, que nada mais são do que um modelo com um monte de coisa pronta, mas que possui lacunas que precisam ser preenchidas para que fique completo.
A sintaxe de uma AE é {{nomeDaPropriedade}}. Mas quem fornece os dados para que essas "lacunas" sejam tapadas? Essa é a responsabilidade de um Controller no mundo MVC e também no mundo Angular. Caso não exista nenhum controller ou caso o controller não forneça os dados de que a AE precisa, Angular não emite um erro, simplesmente considera seu valor uma String em branco, como "".

Um controller pode ser criado com um módulo ou mais tarde adicionado em um módulo já existente. Por exemplo:
// criando com um módulo
angular.module('contabilidade', []).controller('LancamentosController', function() { });
A função controller recebe como primeiro parâmetro o nome do controller e como segundo a função que o define, que pode ou não receber via injeção de dependência o $scope. Lembre-se que é através dele que disponibilizamos dados para a view, adicionando propriedades dinamicamente.

Vejamos agora um exemplo criando um controller para um módulo já existente, que está perfeitamente correto:

angular.module('estoque').controller('Provisao', function($scope) { });
No exemplo anterior, como não passamos o array [] como segundo parâmetro da função module, significa que estamos criando um controller para o módulo estoque que já foi criado. Controllers podem ser criados ao mesmo tempo em que criamos módulos ou posteriormente para um módulo já criado, sendo assim, podemos criar perfeitamente um controller para um módulo já existente e foi isso que fizemos no capítulo:

angular.module('alurapic').controller('FotosController', function($scope) {

    $scope.foto = {
        titulo : 'Leão',
        url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
    };

});

Quando criamos um controller, não basta declararmos variáveis com o mesmo nome das Angular Expressions dentro deles. A comunicação é feita através de $scope, um objeto que é a ligação entre o controller e a view. Qualquer propriedade adicionada neste objeto estará disponível na view e acessível através de AEs. Porém, caso o elemento que use a AE não contenha a diretiva ng-controller ou não seja filho de quem a contenha, a AE não será resolvida.

*********************************************************************************************************************
Aula 2

O código <p ng-repeat="frase in frases">{{frase}}</p> é funcional. Ele itera sobre a lista frases, que existe no escopo de algum controller e para cada elemento da lista fornece um apelido, no caso frase. É através desse apelido que conseguimos acessar cada elemento da lista através da Angular Expression (AE) {{frase}}. Para o primeiro elemento da lista, {{frase}} será o primeiro elemento e o parágrafo será criado, para o segundo elemento da lista, {{frase}} será este elemento e um novo parágrafo será criado. Essa repetição acontecerá até que a diretiva ng-repeat chegue ao final da lista.

*********************************************************************************************************************
Aula 3
Angular foi o pioneiro no suporte à injeção de dependências no lado do cliente (navegador). Uma característica desse sistema é que toda injeção é feita pelo nome do parâmetro, por isso é muito importante passarmos os parâmetros nomeados de acordo com o serviço ou recurso do Angular que desejamos usar.
Ah, as opções 1 e 3 injetam corretamente, mas não eram alternativas de resposta, pelo contrário, a alternativa dizia que elas não injetavam corretamente. Pegadinha! :)


Diretivas são componentes reutilizáveis que podem encapsular marcação e comportamento. São criadas sempre dentro de um módulo através da função .directive:
angular.module('caplositaSA').directive('papagaioDePirata', function() {

});
Toda diretiva deve sempre retornar um DDO (Directive Definition Object) configurado para que funcione:

angular.module('caplositaSA').directive('papagaioDePirata', function() {
      var meuDDO = {};
      // configura o DDO
     return meuDDO;
});

Mesmo usando camelCase na definição da diretiva, devemos utilizar o hífen na marcação HTML. Com a propriedade restrict declaramos que ela pode ser utilizada tanto como atributo (A) quanto elemento (E).
Ou seja, podemos usar a diretiva como elemento:

<abas-dinamicas-especiais></abas-dinamicas-especiais>
E como atributo:

<div abas-dinamicas-especiais></div>
Quando usamos como elemento, somos obrigados a abrir e fechar a tag da diretiva, sendo assim, esta forma é inválida:

<abas-dinamicas-especiais/>

A propriedade url não faz parte de um DDO, no entanto existe a propriedade templateUrl. A templateUrl permite criar um arquivo HTML separado para toda a marcação HTML dessa diretiva. Ou seja, na diretiva fica apenas o caminho para aquele HTML. Alternativamente podemos usar a propriedade template com toda marcação necessária da diretiva.
Lembrando também, a propriedade restrict é para dizer onde a diretiva é valida (Elemento, Atributo, Comentário). A transclude usamos quando a diretiva quer manter elementos filhos e a scope é para capturar informações da diretiva. Não confunda-o com $scope do controller!

No vídeo vimos a diretiva que representa um painel, usando restrict, transclude, scope e templateUrl:

angular.module('minhasDiretivas', [])
    .directive('meuPainel', function() {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.scope = {
            titulo: '@'
        };

        ddo.templateUrl = 'js/directives/meu-painel.html';

        return ddo;
    });
Segue também o link da documentação oficial sobre diretivas (em inglês) com mais exemplos: https://docs.angularjs.org/guide/directive

Repare que o atributo no elemento HTML se chama nome-completo e no JavaScript da diretiva usamos apenas nome. Se os dois fossem iguais, bastaria colocar @ no lugar de AQUI. No entanto, como possuem nomes diferentes, é preciso ser explicito na declaração do scope. Devemos usar @nome-completo para capturar o valor do atributo:
ddo.scope = {
    nome: '@nome-completo'
};
Lembrando também que @ siginfica que o valor é copiado como string.

É importante reforçar que cada diretiva possui o seu escopo privado!

Vamos destrinchar a resposta correta:
angular.module('minhasDiretivas').directive('meuParagrafo', function() {
    var ddo = {};
        ddo.restrict = 'A';
        ddo.scope = {
            titulo : '@titulo'
       };
      ddo.template = '<p>{{titulo}}</p>'
      return ddo;
}):
Uma diretiva é criada através da função .directive, porém ela deve ser chamada para um módulo já existente ou para um novo módulo. No código acima, estamos partindo da ideia de que o módulo minhasDiretivas já existe, porque não passamos um array como segundo parâmetro. Muito bem, toda diretiva deve retornar um DDO, caso contrário como o Angular saberá de suas configurações?

Diretivas também possuem escopo privado, característica que permite seu reuso, inclusive a existência da mesma diretiva mais de uma vez na marcação HTML. No exemplo acima, para meu-paragrafo terá seu próprio título, sem bagunçar os dos demais. Se temos atributos isolados em uma diretiva, como passamos valores do mundo externo para dentro dela? Isso é feito para uma API, interface de uso baseada em atributos.

Se no HTML (uso da diretiva) usamos o atributo titulo, podemos capturar o valor passado para o título da seguinte maneira:

scope.titulo = '@titulo'
Existe o atributo privado scope.titulo da diretiva e através de @titulo copiamos o valor em string do atributo no HTML para dentro da diretiva. Mas quando o atributo no HTML é igual à propriedade no escopo isolado, podemos deixar apenas @:

scope.titulo = '@'
Como estamos definindo o template diretamente na diretiva e não em um arquivo externo, usamos a propriedade ddo.template.

*********************************************************************************************************************
Aula 4

Não faz sentido usarmos ng-model-options sem ng-model, pelo fato da primeira ser a responsável em passar opções especiais para a segunda. A diretiva ng-model-options, para postergar a atualização do model, recebe um objeto com a propriedade debounce e lá indicamos em milissegundos quanto tempo queremos postergar a atualização. Vejamos um exemplo:
<input ng-model="filtro" ng-model-options="{ debounce: 500 }">
A ordem das diretivas também não importa, podemos ter:

<input  ng-model-options="{ debounce: 500 }" ng-model="filtro">
No exemplo acima, estamos postergando meio segundo.

Bônus: como o Angular sabe qual diretiva aplicar primeiro? Internamente, todas as diretivas do angular possuem a propriedade priority. Por exemplo, a diretiva ng-model possui a prioridade 1 enquanto a ng-model-options 0. A diretiva ng-repeat possui prioridade 1000. Diretivas com menor número de prioridade são aplicadas primeiro. Isso faz todo sentido, pois ng-model-options precisa ser aplicada antes de ng-model entrar em ação.

O módulo ngAnimate precisa ser carregado, uma vez que o módulo core angular.min.js não o carrega automaticamente. Este módulo, apesar do nome sugestivo, não traz qualquer animação pronta para uso, ele apenas habilita para uma série de diretivas a capacidade de adicionarem ou removerem classes de acordo com o estado de seus elementos. Fazendo uma analogia com CSS, é como se fossem pseudo classes.
Não é do mundo CSS? Não se preocupe, o mais importante é saber que se temos algo do tipo:

.carnaval.ng-leave-active {
   background-color: red;
   color: black;
}
Ela será aplicada apenas se algum elemento de nossa página tiver as classes carnaval e ng-leave-active. Basta uma não existir para que o estilo não seja aplicado. Sendo assim, sabemos que um elemento repetido por ng-repeat, ao deixar a lista, ganhará a classe ng-leave-active. Resumindo: o estilo acima só será aplicado se o elemento tiver a classe carnaval e estiver saindo da lista.



*********************************************************************************************************************
Aula 5

Para que possamos configurar rotas no lado do cliente, o módulo ngRoute precisa estar carregado, isso significa que precisamos importar o script do módulo e adicioná-lo como dependência de algum módulo que realizará a configuração de rotas. Por exemplo, partindo do pressuposto que o script do módulo de rotas está carregado:
angular.module('sistema',['ngRoute'])
É através da função config que configuramos rotas, solicitando através de injeção $routeProvider:

angular.module('sistema',['ngRoute'])
.config(function($routeProvider){
});
O artefato $routeProvider só estará disponível para injeção apenas se o módulo ngRoute tiver sido carregado previamente.

O $routeProvider possui a função when, que configura efetivamente a rota. Ela recebe dois parâmetros: o primeiro é o nome da rota (endereço) que desejamos configurar e o segundo um objeto JavaScript com duas propriedades: controller e templateUrl. O primeiro associa um controller à parcial e o segundo indica seu template. Um exemplo:

angular.module('sistema',['ngRoute'])
.config(function($routeProvider){
    $routeProvider.when('/produtos', { controller: 'ProdutosController', templateUrl : 'partials/produtos.html'});
});
Porém, podemos configurar uma rota sem associá-la a um controller, algo perfeitamente aceitável dentro do Angular. Por exemplo, a rota que exibe a parcial sobre.html, que só exibe dados, sem qualquer outro uso do Angular:

angular.module('sistema',['ngRoute'])
.config(function($routeProvider){
    $routeProvider.when('/sobre', { templateUrl : 'partials/sobre.html'});
});



*********************************************************************************************************************
Aula 6

*********************************************************************************************************************
Aula 7

A resposta correta é :
$http.delete('v1/fotos/12')
.success(function() {
})
.error(function(erro) {
});
Repare que o código foi indentado quebrando linha nas funções success e error. Não é raro o desenvolvedor esquecer de colocar o ponto quando realiza essa quebra, como no seguinte exemplo:

$http.delete('v1/fotos/12')
success(function() {
})
.error(function(erro) {
});

*********************************************************************************************************************
Aula 8

<select
        ng-model="foto.grupo"
        ng-controller="GruposController"
        ng-options="grupo._id as grupo.nome for grupo in grupos">
    <option value="">Escolha um grupo</option>
</select>

A diretiva ng-options possui comportamento parecido com ng-repeat, porém a sintaxe "grupo._id as grupo.nome" indica que o valor do elemento será o ID do grupo e o que será exibido para seleção será seu título. O restante "for grupo in grupos" percorrerá a lista de grupos disponibilizada no escopo do controller, construindo cada item de nossa lista.

Angular possui filtros (não confundir com filter, da diretiva ng-repeat). Eles são aplicados através de | seguido do nome do filtro:
// altere aqui
<p>{{frase | uppercase}}</p>

*********************************************************************************************************************
Aula 9

O primeiro passo para usarmos ngResource é importar o script do módulo ngResoure em nossa view index.html.
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="pt-br" ng-app="alurapic">
    <head>
        <script src="js/lib/angular.min.js"></script>
        <script src="js/lib/angular-resource.min.js"></script>
        <script src="js/main.js"></script>
    </head>
    <body>
        // código omitido
    </body>
</html>
O segundo, não menos importante, é declararmos ngResource como dependência do módulo principal da aplicação:

// public/js/main.js

angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'ngResource'])
    .config(function($routeProvider, $locationProvider) {

          // código omitido
    });
E por último, podemos começar a modificar o nosso FotosController para utilizar o $resource no local do $http:

// public/js/controllers/fotos-controller.js

angular.module('alurapic').controller('FotosController', function($scope, $resource) {
    var recursoFoto = $resource('/v1/fotos/:fotoId');

    $scope.fotos = [];
    $scope.filtro = '';
    $scope.mensagem = '';

   // código posterior omitido
});


O $resource não suporta o verbo HTTP PUT, porém é possível implementá-lo. Por fim, a declaração correta da função query é:

recursoFoto.query(function(fotos) {
    $scope.fotos = fotos;
}, function(erro) {
    console.log(erro);
});

*********************************************************************************************************************
Aula 10

*********************************************************************************************************************
Aula 11

*********************************************************************************************************************
