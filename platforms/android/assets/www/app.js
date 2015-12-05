var db;
app = angular.module("app", [
  'ui.router',
  'ngResource',
  'ngCordova'
])

.run(function($rootScope){
  console.log("abriu aplicativo");

  db = window.openDatabase("gasto", "1.0", "Gasto DB", 1000000);
  function populateDB(tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS GASTOS (id unique, data text)');
}
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!");
}
db.transaction(populateDB, errorCB, successCB);

})

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('/', {
        url: "/",
        controller: adicionaGastoCtrl,
        templateUrl: "views/listaGastos.html"
    })
      .state('adicionaGasto', {
      url: "/adicionaGasto",
      controller: adicionaGastoCtrl,
      templateUrl: "views/adicionaGasto.html"
    })
      .state('editaGasto', {
      url: "/editaGasto",
      controller: adicionaGastoCtrl,
      templateUrl: "views/editaGasto.html"
    })

}]);
