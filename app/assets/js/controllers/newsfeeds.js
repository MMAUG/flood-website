'use strict';

function knyMiddleware(context){
  return kny.syllbreak( kny.fontConvert(context, "unicode5"), "unicode5");
}

angular.module('MyanmarFlood')
.filter('moment', function() {
  return function(input) {
    return moment(input).fromNow();
  };
})
.controller('NewsFeedsCtrl', ['$scope', 'NewsFeeds', function ($scope, NewsFeeds) {

  // Initial scope data
  $scope.newsfeeds = [];
  $scope.total = null;
  $scope.loading = false;
  $scope.currentPage = 1;

  $scope.init =  function () {
    fetchNewsFeedsData();
  }

  $scope.init();

  $scope.nextPage = function() {
    fetchNewsFeedsData();
  };

  // Fetch organization data from api server.
  function fetchNewsFeedsData() {
    $scope.loading = true;

    NewsFeeds.paginate($scope.currentPage).then(function (response) {
      responseSuccess(response);
    });
  }

  $scope.moment = function(time){
    return moment(time).fromNow();
  };

  // Callback function after http request is success.
  function responseSuccess(response) {
    var data = response.data.data;
    $scope.total = response.data.meta.total_count;
    $scope.currentPage = $scope.currentPage + 1;

    data = data.map(function(info){
      info.title = knyMiddleware(info.title);
      info.description = knyMiddleware(info.description);

      info.description = info.description.replace(/\n/g, "</br>");
      return info;
    });

    $scope.loading = false;
    $scope.newsfeeds = $scope.newsfeeds.concat(data);
  }
}]);
