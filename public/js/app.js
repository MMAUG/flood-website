var baseURL = 'https://floodinfo-myanmar.herokuapp.com/api/';
var donationGroupURL = baseURL + 'donation_groups';
var newsURL = baseURL + 'newsfeeds';

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

  if(value.length < length)
    return value;

  length = length - 3;
  return value.substring(0, length) + '...';
});

// Donation group lists
var donationGroup = new Vue({

  el: '#donation-groups',

  data: {
    groups: [],
    total: null,
    loading: false,
    nextPage: 1,
  },

  ready: function() {
  	// Request donation group from api server
  	this.update();
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
    },
    update: function(){
      var nextPage = this.$get("nextPage");
      if( this.$get("loading") || nextPage === "end" ) {
        return true;
      }

      this.$set("loading", true);
      this.$http.get(donationGroupURL + "?page=" + nextPage, function (data, status, request) {
        // Set groups data from api response data.

        if( data === "" || !data.length || data.length === 0){
          this.$set("nextPage", "end");
          this.$set('loading', false);
          return true;
        }

        this.$set("nextPage", nextPage + 1);

        data = data.map(function(info){
          info.title = kny.fontConvert(info.title, "unicode5");
          info.description = kny.fontConvert(info.description, "unicode5");
          info.donation_location = kny.fontConvert(info.donation_location, "unicode5");
          return info;
        });

        data = this.$get("groups").concat(data);

        this.$set('groups', data);
        // Set total groups
        this.$set('total', data.length);
        // Set loading is false
        this.$set('loading', false);
      }).error(function (data, status, request) {

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

        this.description = "";
        this.phone_numbers = "";
        this.donation_location = "";
        this.facebook_url = "";

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
    news: [],
    loading: false,
    invalidTitle: false,
    invalidDescription: false,
    newIsPosting: false,
    nextPage: 1
  },

  ready: function() {
    // Request donation group from api server
    this.update();
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

        this.title = "";
        this.description = "";

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
    },
    update : function(e){
      var nextPage = this.$get("nextPage");
      if( this.$get("loading") || nextPage === "end" ) {
        return true;
      }

      this.$set("loading", true);
      this.$http.get(newsURL + "?page=" + this.nextPage, function (data, status, request) {

        if( data === "" || !data.length || data.length === 0){
          this.$set("nextPage", "end");
          this.$set('loading', false);
          return true;
        }

        this.$set("nextPage", nextPage + 1);

        data = data.map(function(info){
          info.title = kny.fontConvert(info.title, "unicode5");
          info.description = kny.fontConvert(info.description, "unicode5");
          return info;
        });

        data = this.$get("news").concat(data);
        // Set news data from api response data.
        this.$set('news', data);
        // Set loading is false
        this.$set('loading', false);
      }).error(function (data, status, request) {

      });
    }
  }
});


/**
 * Scorll down to the end will query next page
 */
var pageinfo = document.body.getAttribute("data-page");
var mainContainer = $("#main-container");
var mainContent = $("#main-content");

mainContainer.scroll(function() {
  var sheight = mainContainer.scrollTop() + mainContainer.height();
  var height = mainContent.height() - 50;

  if( sheight > height) {
    switch(pageinfo){
      case "donate":
        donationGroup.update();
        break;
      case "news":
        newsfeeds.update();
        break;
    }
  }
});