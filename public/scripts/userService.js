// angular.module('bikeApp').factory('userService', function($http){
//
// var data = {};
//
// data.GetCurrent = GetCurrent;
// // data.GetAll = GetAll;
// // data.GetById = GetById;
// // data.GetByUsername = GetByUsername;
//
// function handleSuccessGetCurrent(response) {
//   console.log(response);
//   data.user = response.data;
// }
//
// function handleFailure(response){
//   console.log('Error in userService call function ');
// }
//
// function GetCurrent(){
//   return $http.get('/users').then(handleSuccessGetCurrent, handleFailure);
// }
//
//
// GetCurrent();
//
// return {
//   data: data,
//   GetCurrent: GetCurrent
// };
//
// }); //end module.factory function
