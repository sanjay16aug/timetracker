'use strict';

angular.module('naoWorkTrackerApp')
  .factory('Workentry', function ($resource) {
    return $resource('/api/workentries/:id/:controller', {
        id: '@_id'
      },
      {
        allWorkEntry: {
          method: 'GET',
          isArray: true,
          params: {
            id:'allWorkEntry'
          }
        },
      });
  });
