'use strict';

function knyMiddleware(context){
  return kny.syllbreak( kny.fontConvert(context, "unicode5"), "unicode5");
}

angular.module('MyanmarFlood')
.controller('CampaignsCtrl', ['$scope', 'Campaigns', function ($scope, Campaigns) {

  // Initial scope data
  $scope.campaigns = [];

  $scope.init =  function () {
    $scope.campaigns = Campaigns.data();
  }

  $scope.init();
}]);
