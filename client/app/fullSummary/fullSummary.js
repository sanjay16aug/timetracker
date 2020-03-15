'use strict';

angular.module('naoWorkTrackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('fullsummary', {
        url: '/fullsummary',
        templateUrl: 'app/fullSummary/fullSummary.html',
        controller: 'FullsummaryCtrl'
      });
  });