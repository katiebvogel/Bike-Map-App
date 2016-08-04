var app = angular.module('bikeApp');
app.controller('RegisterController', function($http, $location, Upload){

console.log('RegisterController loaded');

 var vm = this;

vm.formData = {};

vm.uploadFile = function(file){
    Upload.upload({
      url: './views/images',
      data: {file: file, 'username': vm.username}
    })
    .then(function(response){
      console.log(response, 'uploaded', response.config.data.file.name, response.data);
    }, function(response){
      console.log('Error uploading ', response.status);
});
};  //end uploadFile



//vm.registerUser() is the function that is triggered on the click even in register.html
//we want to make sure that the uploadFile() function gets run on the submit registration


  vm.registerUser = function() {

    vm.uploadFile(vm.vile);


    var userData = {
    username: vm.formData.username,
    password: vm.formData.password,
    about: vm.formData.about,
    profilePic: vm.file

  };  //end userData object


//Save the user to the DB

$http.post('/register', userData).success(function(data){
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
