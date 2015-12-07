app.controller('adicionaGastoCtrl', function($scope, $rootScope, $state){

    $scope.addItem = function(item){
        //console.log("item");
        //console.log(item);
        if (typeof arrayGastos === "undefined") {

            item.id = 1;
            arrayGastos = [item];
        }else{
            item.id = arrayGastos.length + 1;
            arrayGastos.push(item);
        }

        salvaGastos(arrayGastos);
    }

    function salvaGastos(arrayGastos){
        console.log("gastos 1");
        console.log(arrayGastos);
        gastos = {"list": arrayGastos};

        console.log("gastos");
        console.log(JSON.stringify(gastos));
        var gastoConvertido = JSON.stringify(gastos);
        db.transaction(function(tx) {

            tx.executeSql("INSERT INTO gastos (data) VALUES (?)", [gastoConvertido], successCB, errorCB)
        });
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.message);
    }

    function successCB(tx, results) {
        tx.executeSql("SELECT * from gastos;", [], function(tx, res) {
                console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                alert("res.rows.item(0).data_num: " + res.rows.item(0).data + " -- should be 100");
              });
    }

    /*
    CRUD COM LOCAL STORAGE
    $scope.gasto = {};
    $scope.listaGastos = angular.fromJson(window.localStorage['listaGastos']);

    $scope.getInit = function()
    {
        $scope.gasto = angular.fromJson(window.localStorage['itemEditar']);
        var dt = $scope.gasto.date;
        $scope.gasto.date = new Date(dt);
    }

    $scope.addItem = function(item, acao)
    {
        if (acao === "adicionar") {
            if (typeof arrayGastos === "undefined") {

                item.id = 1;
                arrayGastos = [item];
            }else{
                item.id = arrayGastos.length + 1;
                arrayGastos.push(item);
            }
            console.log("arrayGastos");
            console.log(arrayGastos);
            window.localStorage['listaGastos'] = angular.toJson(arrayGastos);
        }else{
            for (var i = 0; i < $scope.listaGastos.length; i++) {
                if ($scope.listaGastos[i].id === item.id) {
                    $scope.listaGastos[i] = item;
                }
            }
                console.log("$scope.listaGastos");
                console.log($scope.listaGastos);
                window.localStorage['listaGastos'] = angular.toJson($scope.listaGastos);
        }
        $state.go("/");
    }

    $scope.excluirGasto = function(item){
        for (var i = 0; i < $scope.listaGastos.length; i++) {
            if ($scope.listaGastos[i].id === item.id) {
                $scope.listaGastos.splice(i, 1);
            }
        }
        window.localStorage['listaGastos'] = angular.toJson($scope.listaGastos);
        $state.go("/");
    }


    $scope.editarGasto = function(item){
        console.log("item");
        console.log(item);

        window.localStorage.setItem('itemEditar', angular.toJson(item));
        console.log("item");
        console.log($scope.gasto);

        $state.go("editaGasto");
    }

    $scope.addItemBanco = function(){
        db.transaction(function(tx) {


           tx.executeSql("INSERT INTO gastos (chave, gasto) VALUES (?,?)", [100, "teste"], function(tx, res) {
             console.log("insertId: " + res.insertId + " -- probably 1");
             console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");



           }, function(e) {
             console.log("ERROR: " + e.message);
           });
         });
    }

    */
});
