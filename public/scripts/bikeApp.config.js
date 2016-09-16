angular.module('bikeApp').config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/profile', {
                templateUrl: '/views/profile.html',
                controller: 'ProfileController',
                controllerAs: 'profile'
            })
            .when('/register', {
                templateUrl: '/views/register.html',
                controller: 'RegisterController',
                controllerAs: 'register'
            })

        $locationProvider.html5Mode(true);
    }
]);
