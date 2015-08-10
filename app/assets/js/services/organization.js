'use strict';

angular.module('MyanmarFlood')
.factory('Organization', ['$http', 'API_URL', function ($http, API_URL) {
	return {
		paginate: function(page) {
			return $http.get(API_URL + 'donation_groups?page=' + page);
		}
	}
}]);
