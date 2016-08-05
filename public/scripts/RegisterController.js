var app = angular.module('bikeApp');
app.controller('RegisterController', function($http, $location, Upload){

 var vm = this;

 vm.formData = {};

vm.uploadFile = function(file){
  console.log('file:',  file);
  console.log(vm.formData.profilePic);
    Upload.upload({
      url: '/register',
      data: {file: file, 'username': vm.formData.username, password: vm.formData.password, about: vm.formData.about}
    })
    .then(function(response){
      console.log( 'uploaded', response.config.data.file.name, response.data);
    }, function(response){
      console.log('Error uploading ', response.status);
});
};  //end uploadFile


//vm.registerUser() is the function that is triggered on the click even in register.html
//we want to make sure that the uploadFile() function gets run on the submit registration

  vm.registerUser = function() {
    vm.uploadFile(vm.formData.profilePic);
};


}); //end controller
