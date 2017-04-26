var app = angular.module('angularTable', ['angularUtils.directives.dirPagination']);
app.filter('maxhundred', function() {
    return function(value) {
        //console.log(parseFloat(value));
        return (value > 100) ? 100 : value;
    }
});

app.controller('listdata',function($scope, $http){
    $scope.loaded = true;
	$scope.products = [];
	$http.get("https://test-prod-api.herokuapp.com/products").success(function(response){
        //console.log('response');
		$scope.products = response.products;
        $scope.loaded = false;
	});
	$scope.sort = function(keyname){
		$scope.sortKey = keyname;
		$scope.reverse = !$scope.reverse;
	}
});
