'use strict';

angular.module('MyanmarFlood', ['ngSanitize', 'angular-scrolledHandler'])
.constant('API_URL', 'https://floodinfo-myanmar.herokuapp.com/api/v2/')
.factory('Organization', ['$http', 'API_URL', function ($http, API_URL) {
	return {
		paginate: function(page) {
			return $http.get(API_URL + 'donation_groups?page=' + page);
		}
	}
}])
.factory('Modalbox', function () {
  return {}
});

