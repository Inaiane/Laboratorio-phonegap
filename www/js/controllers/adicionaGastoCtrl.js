app.controller('adicionaGastoCtrl', function($scope, $rootScope, $state, $timeout) {

    var listaGastos;
    //$scope.temGastos = false;

    $scope.getInit = function() {
        //var dt = $scope.gasto.date;
        //$scope.gasto.date = new Date(dt);
        db.transaction(function(tx)
        {
            tx.executeSql("SELECT * from gastos;", [], function(tx, res)
            {
                len = res.rows.length;
                console.log("tam: " + res.rows.length);
                if (len > 0)
                {
                    for (i = 0; i < len; i++)
                    {
                        listaGastos = JSON.parse(res.rows.item(i).data);
                        console.log("res.rows.item(0).data_num: " + res.rows.item(i).data);
                    }
                    $scope.listaGastos = listaGastos;
                    console.log("listaGastos: " + listaGastos.list);
                    console.log("$scope.listaGastos.list 1: " + JSON.stringify($scope.listaGastos.list));
                }
            });
        });
    }
    $scope.getInit();

    $scope.getGastos = function() {
        if (typeof $scope.listaGastos !== "undefined")
        {
            $scope.todosGastos = $scope.listaGastos.list;
            $scope.temGastos = true;
            $("#btnListar").hide();
            //$("#panel-gastos").show();
        }else{
            //$scope.temGastos = false;
            $("#btnListar").hide();
            $("#well-gastos").show();
        }
    }

    $scope.addItem = function(item) {
        
        if (typeof $scope.listaGastos === 'undefined')
        {
            item.id = 1;
            $scope.listaGastos = {
                list: [item]
            }
        }
        else
        {
            item.id = $scope.listaGastos.list.length + 1;
            $scope.listaGastos.list.push(item);
        }
        console.log("$scope.listaGastos addItem");
        console.log(JSON.stringify($scope.listaGastos));

        salvaGastos($scope.listaGastos);
    }

    $scope.deleteItem = function(item){
        var i;
        for (i = 0; i < $scope.listaGastos.list.length; i++) {
            if($scope.listaGastos.list[i].id === item.id){
                $scope.listaGastos.list.splice(i, 1);
            }
        }
        console.log("deleteItem");
        console.log(JSON.stringify($scope.listaGastos));

        salvaGastos($scope.listaGastos);
    }

    $scope.editar = function(item){
        $rootScope.gasto = item;
        $state.go('editaGasto');
    }

    $scope.updateItem = function(item){
        var i;

        for (i = 0; i < $scope.listaGastos.list.length; i++) {
            if($scope.listaGastos.list[i].id === item.id){
                $scope.listaGastos.list[i] = item;
            }
        }
        console.log("updateItem");
        console.log(JSON.stringify($scope.listaGastos));

        salvaGastos($scope.listaGastos);
    }

    function salvaGastos(gastos) {
        var gastoConvertido = JSON.stringify(gastos);
        if ($scope.listaGastos.list.length > 1)
        {
            db.transaction(function(tx) {
                tx.executeSql("UPDATE gastos SET data=? WHERE id=?", [gastoConvertido, 1], successCB, errorCB)
            });
        }
        else if($scope.listaGastos.list.length === 1)
        {
            db.transaction(function(tx) {
                tx.executeSql("INSERT INTO gastos (data) VALUES (?)", [gastoConvertido], successCB, errorCB)
            });
        }
        else{
            console.log("lista vazia");
            $scope.limparGastos();
        }
    }

    $scope.limparGastos = function() {
        db.transaction(function(tx) {

            tx.executeSql('DROP TABLE gastos');
            tx.executeSql('CREATE TABLE IF NOT EXISTS gastos (id integer primary key, data text)');
            console.log("teste");
        }, successCB, errorCB);
        $state.reload();
    }

    function errorCB(err) {
        console.log("Error processing SQL: " + err);
    }

    function successCB(tx, results) {
        console.log("success");
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
