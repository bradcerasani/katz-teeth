var myApp = angular.module('Katz',[]);

myApp.service('dataService', function($http) {
  delete $http.defaults.headers.common['X-Requested-With'];
  this.getData = function(callbackFunc) {
    $http({
        method: 'GET',
        url: 'http://data.winnipeg.ca/resource/3kmj-eezt.json'
     }).success(function(data){
        var total = 0;
        for (var i = data.length - 1; i >= 0; i--) {
          var entry = data[i];
          if (entry.account === 'Dental Plan') {
            total += parseFloat(entry.amount);
          }
        };
        callbackFunc(total);
    }).error(function(){
        console.log('error');
    });
  }
});

myApp.controller('MainController', function($scope, dataService) {
  $scope.data = null;
  dataService.getData(function(dataResponse) {
    $scope.data = dataResponse;
  });
});
