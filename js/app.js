var donationGroupURL = 'http://floodinfo-myanmar.herokuapp.com/api/donation_groups';
var newsURL = 'http://floodinfo-myanmar.herokuapp.com/api/newsfeeds';

var donationGroup = new Vue({

  el: '#donation-groups',

  data: {
    groups: null,
    loading: true,
  },

  ready: function() {
  	// Request donation group from api server
  	this.$http.get(donationGroupURL, function (data, status, request) {
  		// Set groups data from api response data.
  		this.$set('groups', data);
      // Set loading is false
      this.$set('loading', false);
  	}).error(function (data, status, request) {

  	});
  }
});

var newsfeeds = new Vue({

  el: '#new-feed',

  data: {
    news: null,
    loading: true,
  },

  ready: function() {
    // Request donation group from api server
    this.$http.get(newsURL, function (data, status, request) {
      // Set news data from api response data.
      this.$set('news', data);
      // Set loading is false
      this.$set('loading', false);
    }).error(function (data, status, request) {

    });
  }
});