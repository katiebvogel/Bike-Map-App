angular.module('bikeApp').controller('MainController', ['$http', '$location', function($http, $location){

    var vm = this;
    // vm.showError = false;
    vm.username = '';
    vm.password = '';

    // vm.myInterval = 5000;
    //  vm.noWrapSlides = false;
    //  vm.active = 0;
    //
    //
    //  var slides = vm.slides = [
    //    {
    //      image: 'http://lorempixel.com/400/200/'
    //    },
    //    {
    //      image: 'http://lorempixel.com/400/200/food'
    //    },
    //    {
    //      image: 'http://lorempixel.com/400/200/sports'
    //    },
    //    {
    //      image: 'http://lorempixel.com/400/200/people'
    //    }
    //  ];
    //  var currIndex = 0;

    //  vm.addSlide = function() {
    //    var newWidth = 600 + slides.length + 1;
    //    slides.push({
    //      image: 'http://lorempixel.com/' + newWidth + '/300',
    //      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
    //      id: currIndex++
    //    });
    //  };
     //
    //  vm.change = function() {
    //    var indexes = generateIndexesArray();
    //    assignNewIndexesToSlides(indexes);
    //  };
     //
    //  for (var i = 0; i < 4; i++) {
    //    vm.addSlide();
    //  }
     //
    //  // Randomize logic below
     //
    //  function assignNewIndexesToSlides(indexes) {
    //    for (var i = 0, l = slides.length; i < l; i++) {
    //      slides[i].id = indexes.pop();
    //    }
    //  }
     //
    //  function generateIndexesArray() {
    //    var indexes = [];
    //    for (var i = 0; i < currIndex; ++i) {
    //      indexes[i] = i;
    //    }
    //    return shuffle(indexes);
    //  }
     //
    //  function shuffle(array) {
    //    var tmp, current, top = array.length;
     //
    //    if (top) {
    //      while (--top) {
    //        current = Math.floor(Math.random() * (top + 1));
    //        tmp = array[current];
    //        array[current] = array[top];
    //        array[top] = tmp;
    //      }
    //    }
     //
    //    return array;
    //  };



    vm.loginUser = function(){
      // console.log('Username: ', vm.username);
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
