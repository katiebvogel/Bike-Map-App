angular.module('bikeApp').config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider){
  $routeProvider
  .when('/success', {
    templateUrl: '/views/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })
  .when('/failure', {
    templateUrl: '/views/main.html'
  })
  .when('/register', {
    templateUrl: '/views/register.html',
    controller: 'RegisterController',
    controllerAs: 'register'
  })

  $locationProvider.html5Mode(true);
}]);
