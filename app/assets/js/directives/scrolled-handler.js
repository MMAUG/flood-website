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
});

angular.module('MyanmarFlood', ['ngSanitize', 'angular-scrolledHandler'])
  .constant('API_URL', 'https://floodinfo-myanmar.herokuapp.com/api/v2/');