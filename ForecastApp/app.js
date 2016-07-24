//MODULE

var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

//CUSTOM SERVICE

myApp.service('cityService', function(){

    this.city = 'Kiev';



});


//ROUTS

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
        //    controller: 'homeController',
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            //    controller: 'homeController',
        })
      /*  .when('/#/home', {
            templateUrl: 'views/home.html',
            //    controller: 'homeController',
        })*/
        .when('/second-page/', {
            templateUrl: 'views/second-page.html',
       //     controller: 'secondPageController'
        })
    });

//CONTROLLERS

myApp.controller('homeController',['$scope', "$location",'cityService',function($scope, $location, cityService){

$scope.city = cityService.city;

    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    })

}]);


myApp.controller('secondPageController',['$scope','cityService','$resource',function($scope,cityService, $resource){

    $scope.city = cityService.city;

    $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?units=metric", {
        callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}
    });

    $scope.weatherResult = $scope.weatherApi.get({ q: $scope.city, cnt: 16, APPID: '37be33735eef9cf2d43e1dc0c455ebe4' });

    console.log($scope.weatherResult);



}]);




















