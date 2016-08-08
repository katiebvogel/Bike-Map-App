angular.module('bikeApp').controller('MainController', ['$http', '$location', function($http, $location){

    var vm = this;
    // vm.showError = false;
    vm.username = '';
    vm.password = '';
  

    vm.loginUser = function(){
      console.log('Username: ', vm.username);


      var sendData = {};

      sendData.username = vm.username;
      sendData.password = vm.password;

      $http.post('/login', sendData).then(handleSuccess, handleFailure);
    };

    function handleSuccess(response) {
      console.log('Success', response);
      $location.path('/profile');
      return vm.username;
    };

    function handleFailure(response){
      console.log('Failure', response);
      // vm.showError = true;
      alert('Not a match!  Try again or register.');
      $location.path('/main');
    };

}]);
