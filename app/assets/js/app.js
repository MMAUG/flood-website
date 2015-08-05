(function(global){

  var baseURL = 'https://floodinfo-myanmar.herokuapp.com/api/v2/';
  var donationGroupURL = baseURL + 'donation_groups';
  var newsURL = baseURL + 'newsfeeds';
  var HTMLTAGS = /\<[^\\>]*\>.*\<[^\\>]*\>/g;

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

  Vue.filter('moment', function(value){
    return moment(value).fromNow();
  });

  // Donation group lists
  var donationGroup = global.donationGroup = new Vue({

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
        this.$http.get(donationGroupURL + "?page=" + nextPage, function (response, status, request) {
          
          if( !response || !response.data || response.data === "" || !response.data.length || response.data.length === 0){
            this.$set("nextPage", "end");
            this.$set('loading', false);
            return true;
          }
          var data = response.data;

          this.$set("total", response.meta.total_count);
          this.$set("nextPage", nextPage + 1);

          data = data.map(function(info){
            info.title = kny.syllbreak( kny.fontConvert(info.title, "unicode5"), "unicode5");
            info.description = kny.syllbreak( kny.fontConvert(info.description, "unicode5"), "unicode5");
            info.donation_location = kny.syllbreak( kny.fontConvert(info.donation_location, "unicode5"), "unicode5");
            info.phone_numbers = kny.syllbreak( kny.fontConvert(info.phone_numbers, "unicode5"), "unicode5");

            info.title = info.title.replace(HTMLTAGS, "");
            info.description = info.description.replace(HTMLTAGS, "");
            info.phone_numbers = info.phone_numbers.replace(HTMLTAGS, "");
            info.donation_location = info.donation_location.replace(HTMLTAGS, "");

            info.description = info.description.replace(/\n/g, "</br>");
            return info;
          }).reverse();

          data = this.$get("groups").concat(data);

          this.$set('groups', data);
          // Set loading is false
          this.$set('loading', false);
        }).error(function (data, status, request) {});
      }
    }
  });

  // Add new donation group
  var newDonationGroup = global.newDonationGroup = new Vue({

    el: '#new-donation-groups',

    data: {
      invalidTitle: false,
      invalidDescription: false,
      newIsPosting: false
    },

    methods: {
      postGroup: function (e) {
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
        if ( this.invalidTitle) {
          return true;
        }

        // Prepare post data
        var postData = {
          title: title,
          description: description,
          phone_numbers: this.phone_numbers,
          donation_location: this.donation_location,
          facebook_url: this.facebook_url
        };

        // Reset validation triggers
        this.invalidTitle = false;
        this.invalidDescription = false;

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
  var newsfeeds = global.newsfeeds  = new Vue({

    el: '#new-feed',

    data: {
      news: [],
      loading: false,
      nextPage: 1
    },

    ready: function() {
      // Request donation group from api server
      this.update();
    },

    methods: {
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
        this.$http.get(newsURL + "?page=" + this.nextPage, function (response, status, request) {

          if( !response || !response.data || response.data === "" || !response.data.length || response.data.length === 0){
            this.$set("nextPage", "end");
            this.$set('loading', false);
            return true;
          }
          var data = response.data;

          this.$set("total", response.meta.total_count);
          this.$set("nextPage", nextPage + 1);

          data = data.map(function(info){
            info.title = kny.syllbreak( kny.fontConvert(info.title, "unicode5"), "unicode5");
            info.description = kny.syllbreak( kny.fontConvert(info.description, "unicode5"), "unicode5");

            info.title = info.title.replace(HTMLTAGS, "");
            info.description = info.description.replace(HTMLTAGS, "");

            info.description = info.description.replace(/\n/g, "</br>");
            return info;
          });

          data = this.$get("news").concat(data);
          // Set news data from api response data.
          this.$set('news', data);
          // Set loading is false
          this.$set('loading', false);
        }).error(function (data, status, request) {});
      }
    }
  });

  // News Post Form
  var newsForm = global.newsForm  = new Vue({

    el: '#new-form',

    data: {
      invalidTitle: false,
      invalidDescription: false,
      newIsPosting: false
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

          this.title = "";
          this.description = "";

          $('#message-text').html('Thanks for your news post.');

        }, {emulateJSON: true}).error(function (data, status, request) {
          alert('Error: Please try again to post your new...');
        });
      }
    }
  });

  // /* Online Donations */
  var online = global.online = new Vue({
      el: '#online-donations',
      data: {
        list: campaigns
      }
  });


  /**
   * Scorll down to the end will query next page
   */
  var mainContainer = $("#main-container");
  var mainContent = $("#main-content");

  function scrolledCheck(){
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
  }

  global.scrolledCheck = scrolledCheck;

  mainContainer.scroll(scrolledCheck);

}(this));
