'use strict';

angular.module('naoWorkTrackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('summary', {
        url: '/summary',
        templateUrl: 'app/summary/summary.html',
        controller: 'SummaryCtrl'
      });
  });