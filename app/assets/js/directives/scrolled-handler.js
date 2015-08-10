'use strict';

angular.module('angular-scrolledHandler', [])
.directive("scrolledHandler", function(){
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {

      container = $(attrs.scrolledContainer);
      content = $(attrs.scrolledContent);
        
      var handler = function (evt) {

        var scrolledHeight = container.scrollTop() + container.height();
        var contentHeight = content.height() - 50;

        if( scrolledHeight > contentHeight ) {
          ga('send', 'event', 'page', 'scroll', 'scroll-down');
          scope.loading = true;
          scope.$apply(attrs.scrolledHandler);
        }
      };

      container.bind('scroll', handler);
    }
  };
})
.directive("showDetailBox", function(){
  ga('send', 'event', 'button', 'click', 'open-detail-box');
  var b = $('body');
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
  
  b.append(template);
  b.append('<div id="overlay"></div>');

  $('#close-modal').on('click', function() {
    ga('send', 'event', 'button', 'click', 'close-detail-box');
    closeModel();
  });
});