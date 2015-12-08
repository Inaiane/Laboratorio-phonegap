app.controller('adicionaGastoCtrl', function($scope, $rootScope, $state) {
    var listaGastos;
    //$scope.listaGastos = {};
    //$scope.temDados = false;
    $scope.getInit = function() {

        //var dt = $scope.gasto.date;
        //$scope.gasto.date = new Date(dt);

        db.transaction(function(tx) {

            tx.executeSql("SELECT * from gastos;", [], function(tx, res) {
                len = res.rows.length;
                console.log("tam: " + res.rows.length);
                if (len > 0) {
                    for (i = 0; i < len; i++) {

                        listaGastos = JSON.parse(res.rows.item(i).data);
                        alert("res.rows.item(0).data_num: " + res.rows.item(i).data);
                    }

                    console.log("listaGastos: " + listaGastos.list);

                    $scope.listaGastos = listaGastos;
                    setTimeout(function() {
                        $('#tableGasto').show();
                    }, 2000);
                    console.log("$scope.listaGastos 1: " + JSON.stringify($scope.listaGastos));
                    console.log("$scope.listaGastos.list 1: " + JSON.stringify($scope.listaGastos.list));
                }

            });
        });
    }
    $scope.getInit();

    $scope.addItem = function(item) {
        //console.log("item");
        //console.log(item);
        console.log('$scope.listaGastos');
        console.log($scope.listaGastos);
        if (typeof $scope.listaGastos === 'undefined') {

            //$scope.listaGastos.list = [];
            item.id = 1;
            console.log('if addgasto');
            $scope.listaGastos = {
                list: [item]
            }

        } else {
            console.log('else addgasto');
            item.id = $scope.listaGastos.list.length + 1;
            $scope.listaGastos.list.push(item);
        }
        console.log("gastos 1");
        console.log(JSON.stringify($scope.listaGastos));

        salvaGastos($scope.listaGastos);

    }

    function salvaGastos(gastos) {

        //gastos = {"list": arrayGastos};

        //console.log("gastos");
        //console.log(JSON.stringify(gastos));
        var gastoConvertido = JSON.stringify(gastos);
        if ($scope.listaGastos.list.length > 1) {
            console.log('length > 1');
            db.transaction(function(tx) {
                tx.executeSql("UPDATE gastos SET data=? WHERE id=?", [gastoConvertido, 1], successCB, errorCB)
            });

        } else {
            console.log('length = 1');
            db.transaction(function(tx) {
                tx.executeSql("INSERT INTO gastos (data) VALUES (?)", [gastoConvertido], successCB, errorCB)
            });
        }
    }

    $scope.limparGastos = function(){
        db.transaction(function(tx) {
            tx.executeSql('DROP TABLE gastos');
            tx.executeSql('CREATE TABLE IF NOT EXISTS gastos (id integer primary key, data text)');

        }, successCB, errorCB);

    }


    function errorCB(err) {
        alert("Error processing SQL: " + err.message);
    }

    function successCB(tx, results) {
        //$scope.getInit();
        /*tx.executeSql("SELECT * from gastos;", [], function(tx, res) {
            len = res.rows.length;
            console.log("res.rows.length: " + res.rows.length);
            //alert("res.rows.item(0).data_num: " + res.rows.item(0).data + " -- should be 100");
            for (i = 0; i < len; i++) {
                listaGastos = JSON.parse(res.rows.item(i).data);
                alert("res.rows.item(0).data_num: " + res.rows.item(i).data);
            }
            console.log("listaGastos: " + listaGastos);

            $scope.listaGastos = listaGastos;
            console.log("$scope.listaGastos: " + $scope.listaGastos);
            console.log("$scope.listaGastos.list: " + $scope.listaGastos);
        });*/
        $state.go("/");
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



    */
});
