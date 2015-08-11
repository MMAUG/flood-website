'use strict';

angular.module('MyanmarFlood')
.run(function($rootScope){
  $rootScope.box = {
    show: null,
    description: null,
    phone_numbers: null,
    donation_location: null
  }
})
.controller('OrganizationCtrl', ['$scope', '$rootScope', 'Organization', function ($scope, $rootScope, Organization) {

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
    if(!$scope.loading)
      fetchOrganizationData();
  }

  // Fetch organization data from api server.
  function fetchOrganizationData() {
    $scope.loading = true;

    Organization.paginate($scope.currentPage).then(function (response) {
      responseSuccess(response);
    });
  }

  $scope.showDetailBox = function (index){
    $rootScope.box.show = true;
    $rootScope.box.description = $scope.organizations[index].description;
    $rootScope.box.phone_numbers = $scope.organizations[index].phone_numbers;
    $rootScope.box.donation_location = $scope.organizations[index].donation_location;
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

      info.description = info.description.replace(/\n/g, "</br>");
      return info;
    });

    $scope.loading = false;
    $scope.organizations = $scope.organizations.concat(data);
  }
}])
.controller('ModalboxCtrl', ['$scope', '$rootScope', 'Modalbox', function ($scope, $rootScope, Modalbox) {

  $scope.closeBox = function(){
    $rootScope.box.show = null;
  }

}]);
