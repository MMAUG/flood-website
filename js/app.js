var apiURL = 'http://floodinfo-myanmar.herokuapp.com/api/donation_groups';

var contact = new Vue({

  el: '#donation-groups',

  data: {
    groups: null,
    loading: true,
  },

  ready: function() {
  	// Request donation group from api server
  	this.$http.get(apiURL, function (data, status, request) {
  		// Set groups data from api response data.
  		this.$set('groups', data);
      // Set loading is false
      this.$set('loading', false);
  	}).error(function (data, status, request) {

  	});
  }
});