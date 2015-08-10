'use strict';

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

    	console.log($scope.organizations.length);

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
        info.title = kny.syllbreak( kny.fontConvert(info.title, "unicode5"), "unicode5");
        info.description = kny.syllbreak( kny.fontConvert(info.description, "unicode5"), "unicode5");
        info.donation_location = kny.syllbreak( kny.fontConvert(info.donation_location, "unicode5"), "unicode5");
        info.phone_numbers = kny.syllbreak( kny.fontConvert(info.phone_numbers, "unicode5"), "unicode5");

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