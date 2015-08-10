'use strict';

function knyMiddleware(context){
  return kny.syllbreak( kny.fontConvert(context, "unicode5"), "unicode5");
}

angular.module('MyanmarFlood')
.controller('OrganizationCtrl', ['$scope', 'Organization', function ($scope, Organization) {

  // Initial scope data
  $scope.organizations = [];
  $scope.total = null;
  $scope.loading = false;
  $scope.currentPage = 1;

  $scope.init =  function () {
    fetchOrganizationData();
  }

  $scope.init();

  $scope.nextPage = function() {
    fetchOrganizationData();
  }

  // Fetch organization data from api server.
  function fetchOrganizationData() {
    $scope.loading = true;

    Organization.paginate($scope.currentPage).then(function (response) {
        responseSuccess(response);
    });
  }

  // Callback function after http request is success.
  function responseSuccess(response) {
    var data = response.data.data;
    $scope.total = response.data.meta.total_count;
    $scope.currentPage = $scope.currentPage + 1;

    data = data.map(function(info){

      info.title = knyMiddleware(info.title);
      info.description = knyMiddleware(info.description);
      info.donation_location = knyMiddleware(info.donation_location);
      info.phone_numbers = knyMiddleware(info.phone_numbers);

      //info.title = info.title.replace(HTMLTAGS, "");
      //info.description = info.description.replace(HTMLTAGS, "");
      //info.phone_numbers = info.phone_numbers.replace(HTMLTAGS, "");
      //info.donation_location = info.donation_location.replace(HTMLTAGS, "");

      info.description = info.description.replace(/\n/g, "</br>");
      return info;
    });

    $scope.loading = false;
    $scope.organizations = $scope.organizations.concat(data);
  }
}]);