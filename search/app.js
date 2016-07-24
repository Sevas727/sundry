var myApp = angular.module('myApp', ['ngResource', 'ngAnimate']);

myApp.controller('mainController', ['$scope', '$resource', function($scope,$resource){


    //данные из JSON
var players = $resource("./players.json",{},{

  query: {
          method: 'GET',
          isArray: true
        }},
        {});

    $scope.players = players.query();

    $scope.handle = "";

     $scope.filterFunction = function(element) {

        var isMatch = false;

        //разделили строку на подстроки
        var arr =  $scope.handle.split(' ');

        // отфильтровали от пустых значений
        var arr = arr.filter(function(number) {
            return number != '';
        });

        var Matches = 0

        //по каждому значению свойства в объекте
        for (key in element) {

        //по каждой строке в массиве
        for (var i = 0; i <= arr.length; i++ ) {

        //проверка на первый символ если "-" то убираем его и делаем развилку


         if (arr[i] != undefined && arr[i][0] == "-" && arr[i].length > 1) {

            var request = arr[i].substr(1,arr[i].length);

            if ( String(element[key]).indexOf(request) != -1){ //если подстрока есть в свойстве

                Matches--;
                isMatch = false;
                break;

            } else {//если нет ищем дальше

                continue;

            }

         } else {

            if ( String(element[key]).indexOf(arr[i]) != -1){ //если подстрока есть в свойстве

            element.strLength = arr[i].length;// релевантность по количеству совпадаемых символов
            Matches++; // количество совпадений
            continue;

            } else {//если нет ищем дальше

                continue;

            }
         }
       }
     }

        if ($scope.handle == "" || $scope.handle == " ") isMatch = true;//если строка поиска пуста либо нажат пробел

         //если массив не пустой создаем массив позитивных подстрок чью длинну будем проверять с совпадениями

        if (arr.length > 0) {

            var positiveArr = [];

            for(var j = 0; j < arr.length; j++){
                if (arr[j][0] != "-") positiveArr[positiveArr.length] = arr[j];
            }

            /*****************/

            if (Matches >= positiveArr.length ) isMatch = true;//если точное совпадение
        }
            return isMatch;
    };

}]);