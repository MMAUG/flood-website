var baseURL = 'https://floodinfo-myanmar.herokuapp.com/api/';
var donationGroupURL = baseURL + 'donation_groups';
var newsURL = baseURL + 'newsfeeds';

if (typeof $ != 'undefined') {
  $("#search-at-header").on('keyup', function(event){
    var that = $(this);
    var type = that.val();

    // Make lower case
    type = type.toString().toLowerCase();

    $("#donation-groups .mdl-card").each(function(index, card){
      card = $(card);
      if( !card.attr("data-search").match(type, "g") ) {
        card.hide(400);
      } else {
        card.show(400);
      }
    });

    $("#new-feed .mdl-card").each(function(index, card){
      card = $(card);
      if( !card.attr("data-search").match(type, "g") ) {
        card.hide(400);
      } else {
        card.show(400);
      }
    });
  });
}

/**
 * JQuery Helper functions
 */
function closeModel() {
  $('#overlay').remove();
  $('#group-modal').remove();
}

/**
 * Vue filter to truncate a string to the specified length.
 * @param {String} value The value string.
 *
 * Original Source : https://gist.github.com/belsrc/672b75d1f89a9a5c192c
 */
Vue.filter('truncate', function(value, length) {

  if(value.length < length) {
    return value;
  }

  length = length - 3;

  return value.substring(0, length) + '...';
});

// Donation group lists
var donationGroup = new Vue({

  el: '#donation-groups',

  data: {
    groups: null,
    total: null,
    loading: true,
  },

  ready: function() {
  	// Request donation group from api server
  	this.$http.get(donationGroupURL, function (data, status, request) {
  		// Set groups data from api response data.
  		this.$set('groups', data);
      // Set total groups
      this.$set('total', data.length);
      // Set loading is false
      this.$set('loading', false);
  	}).error(function (data, status, request) {

  	});
  },

  methods: {
    showDetailBox: function(description, phone_numbers, donation_location) {
      var template = '<div class="modal mdl-shadow--2dp" id="group-modal">' +
                        '<div class="modal-content">' +
                          '<h4>Description</h4>' +
                          '<p>' + description + '</p>' +
                          '<h4>Phone Numbers</h4>' +
                          '<p>'+ phone_numbers + '</p>' +
                          '<h4>Location</h4>' +
                          '<p>'+ donation_location + '</p>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                          '<button class="mdl-button mdl-js-button" id="close-modal">' +
                            'Close' +
                          '</button>' +
                        '</div>' +
                      '</div>';
      var b = $('body');
      b.append(template);
      b.append('<div id="overlay"></div>');

      $('#close-modal').on('click', function() {
        closeModel();
      });
    }
  }
});

// Add new donation group
var newDonationGroup = new Vue({

  el: '#new-donation-groups',

  data: {
    invalidTitle: false,
    newIsPosting: false
  },

  methods: {
    postGroup: function (e) {
      e.preventDefault();

      var title = this.title;

      if ( title === '' || typeof title === 'undefined') {
        this.invalidTitle = true;
      }

      // If validation fail, don't post to server
      if ( this.invalidTitle) {
        return true;
      }

      // Prepare post data
      var postData = {
        title: title,
        description: this.description,
        phone_numbers: this.phone_numbers,
        donation_location: this.donation_location,
        facebook_url: this.facebook_url
      };

      // Reset validation triggers
      this.invalidTitle = false;

      // Show posting loading...
      this.newIsPosting = true;

      this.$http.post(donationGroupURL + '/', postData, function(data, status, request) {
        // Hide posting label...
        this.newIsPosting = false;

        // Redirect to home page.
        document.location.href="/";

      }, {emulateJSON: true}).error(function (data, status, request) {
        alert('Error: Please try again to post your donation group...');
      });
    }
  }

});

// News feed
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

      if ( title === '' || typeof title === 'undefined') {
        this.invalidTitle = true;
      }

      if ( description === '' || typeof description === 'undefined') {
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
    },

    reportNew: function (id) {

      var reportURL = newsURL + '/' + id + '/report_as_spam';

      this.$http.get(reportURL, function(data, status, request) {
        alert('Thanks for your report');
      }).error(function (data, status, request) {
        alert('Error: Please try again to report...');
      });
    }
  }
});
