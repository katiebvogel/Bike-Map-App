// angular.module('bikeApp').factory('userService', function($http){
//
// var data = {};
//
// data.GetCurrent = GetCurrent;
// data.GetAll = GetAll;
// data.GetById = GetById;
// data.GetByUsername = GetByUsername;
//
// function handleSuccess (response) {
//   return response.data;
// }
//
// function handleFailure(response){
//   console.log('Error in userService call function ', response.data);
// }
//
// function GetCurrent(){
//   return $http.get('/users/current').then(handleSuccess, handleFailure);
// }
//
// return {
//   data: data,
//   GetCurrent: GetCurrent
// };
//
// }); //end module.factory function
