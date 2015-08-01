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
    invalidTitle: false,
    invalidDescription: false,
    newIsPosting: false
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
  },

  methods: {
    postNew: function (e) {
      e.preventDefault();

      var title = this.title;
      var description = this.description;

      if ( title == '' || typeof title == 'undefined') {
        this.invalidTitle = true;
      }

      if ( description == '' || typeof description == 'undefined') {
       this.invalidDescription = true; 
      }

      // If validation fail, don't post to server
      if ( this.invalidTitle || this.invalidDescription) {
        return true;
      }

      // Reset validation triggers
      this.invalidTitle = false;
      this.invalidDescription = false;

      // Show posting loading...
      this.newIsPosting = true;
      
      this.$http.post(newsURL, {title: title, description: description}, function(data, status, request) {
        // Hide posting label...
        this.newIsPosting = false;

        // Add server response data to current news data.
        this.news.unshift(data);

      }, {emulateJSON: true}).error(function (data, status, request) {
        alert('Error: Please try again to post your new...');
      });
    }
  }
});