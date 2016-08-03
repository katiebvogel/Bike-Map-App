var app = angular.module('bikeApp');
app.controller('LoginController', function($http, $location){

  var vm = this;

  vm.username = '';
  vm.password = '';

vm.login= function(){
  console.log('Username: ', vm.username);
  console.log('Password: ', vm.password);

  var sendData = {};

  sendData.username = vm.username;
  sendData.password = vm.password;

  $http.post('/login', sendData).then(handleSuccess, handleFailure);
};

function handleSuccess(response) {
  console.log('Success', response);
  $location.path('/login');
};

function handleFailure(response){
  console.log('Failure', response);
  $location.path('/main');
};


});  // end controller
