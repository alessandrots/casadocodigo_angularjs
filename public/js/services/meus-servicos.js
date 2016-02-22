// public/js/servicos/meus-servicos.js
//funcao factory retora todas as acoes e propriedades que vc quer na forma de um objeto
//meusServicos esta agora injetavel
angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function($resource) {

        return $resource('/v1/fotos/:fotoId', null, {
            'update' : {
                method: 'PUT'
            }
        });
    });
