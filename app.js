var myApp = angular.module('Katz',[]);

myApp.service('dataService', function($http) {
delete $http.defaults.headers.common['X-Requested-With'];
this.getData = function(callbackFunc) {
    $http({
        method: 'GET',
        url: 'http://data.winnipeg.ca/resource/3kmj-eezt.json'
     }).success(function(data){
        callbackFunc(data);
    }).error(function(){
        alert("error");
    });
 }
});

myApp.controller('MainController', function($scope, dataService) {
    $scope.data = null;
    dataService.getData(function(dataResponse) {
        $scope.data = dataResponse;
    });
});
