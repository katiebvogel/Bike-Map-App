var app = angular.module('bikeApp');
app.controller('RegisterController', function($http, $upload){

console.log('RegisterController loaded');
vm = this;

vm.formData = {};

vm.uploadFile = function(){
  vm.fileSelected = function(files){
    if(files && files.length){
      vm.file = files[0];
    }

    $upload.upload({
      url: '/api/upload',
      file: vm.file
    })
    .success(function(data){
      console.log(data, 'uploaded');
    });
  };
}; //end uploadFile




  vm.registerUser = function() {
    var userData = {
    username: vm.formData.username,
    password: vm.formData.password,
    about: vm.formData.about
    // profilePic: vm.file

  };  //end userData object


//Save the user to the DB

$http.post('/users', userData).success(function(data){
  console.log(userData);

    vm.formData.username = "";
    vm.formData.password = "";
    vm.formData.about = "";
    vm.formData.profilePic = "";
})
.error(function(data){
  console.log('error posting new user', data);
});

};



}); //end controller
