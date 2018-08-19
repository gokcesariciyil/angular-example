var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
  $routeProvider.
	when('/', {
		templateUrl: 'view/main.html',
		controller: 'main_controller'
	}).
	when('/page/:id', {
		templateUrl: 'view/page.html',
		controller: 'page_controller'
	}).
	otherwise({
      redirectTo: '/'
  });

	$locationProvider.hashPrefix('');
});

app.service('newsService', function ($http) {
  this.getPosts = function () {
      return $http.get('http://arabam.getsandbox.com/news');
  };

  this.getPost = function(id){
    return $http.get('http://arabam.getsandbox.com/news/' + id);
  }
});

app.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);

app.controller('main_controller',function($scope, newsService){
  $scope.posts = [];

  var getPostsData = newsService.getPosts();

  getPostsData.then(function (post) {
      angular.forEach(post.data, function(value, key) {
        if(value.isFeatured === true){
            $scope.featured = value;
        } else {
            $scope.posts.push(value);
        }
      });
  }, function () {
     alert('Error in getting post records');
  });
});

app.controller('page_controller', function($scope, $routeParams, newsService){
  var getPostsData = newsService.getPost($routeParams.id);

    getPostsData.then(function (post) {
        $scope.post = post.data;
    }, function () {
       alert('Error in getting post record');
    });
});
