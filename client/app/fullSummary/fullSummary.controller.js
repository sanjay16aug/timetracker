'use strict';

angular.module('naoWorkTrackerApp')
  .controller('FullsummaryCtrl', function ($scope, Auth, Workentry) {
    $scope.workEntries = [];
    $scope.newEntry = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.datePickerOpened = false;
    $scope.filteredEntries = [];
    $scope.groupedEntries = [];
    $scope.allUser = [];
    $scope.selectResource = {
      id: "",
      name: ""
    };
    $scope.filter = {
      dateFrom: {},
      dateTo: {}
    };

    function GroupedEntry(dateStr, date, totalHours, entries) {
      this.dateStr = dateStr;
      this.date = date;
      this.totalHours = totalHours;
      this.entries = entries;
      this.user = entries[0].user.name;
      this.userId = entries[0].user._id;
      var check = _.find($scope.allUser, { id: entries[0].user._id });
      if (_.isEmpty(check)) {
        $scope.allUser.push({
          id: entries[0].user._id,
          name: entries[0].user.name
        })
      }
    }

    function dateToStr(date, id) {
      if (!date) {
        return;
      } else {
        return '' + date.getYear() + date.getMonth() + date.getDate() + id;
      }

    }

    function refreshDateHourMap() {
      var dateHourMap = {};
      $scope.workEntries.forEach(function (e) {
        if (typeof e.date === 'string') { e.date = new Date(e.date); }
        if (e && e['user']) {
          var dateStr = dateToStr(e.date, e['user']['_id']);
        }


        if (dateHourMap[dateStr]) {
          dateHourMap[dateStr].totalHours += e.hours;
          dateHourMap[dateStr].entries.push(e);
        } else {
          if (e && e['user']) {
            var groupedEntry = new GroupedEntry(dateStr, e.date, e.hours, [e]);
            dateHourMap[dateStr] = groupedEntry;
            $scope.groupedEntries.push(groupedEntry);
          }
        }
      });
      $scope.filterEntries();
      $scope.prefHours = Auth.getCurrentUser().settings.preferredWorkingHoursPerDay;
    }

    $scope.reloadEntries = function () {
      function cb(loggedIn) {
        if (loggedIn) {
          Workentry.allWorkEntry(function (workEntries) {


            $scope.workEntries = workEntries;
            refreshDateHourMap();
          });
        }
      }
      Auth.isLoggedInAsync(cb);
    };
    $scope.reloadEntries();

    $scope.openDatePicker = function ($event, entry) {
      $event.preventDefault();
      $event.stopPropagation();
      if (entry) entry.datePickerOpened = true;
    };

    $scope.filterEntries = function () {
      $scope.filteredEntries = $scope.groupedEntries.filter(function (entry) {
        if ($scope.filter.dateFrom.date && $scope.filter.dateTo.date && !_.isEmpty($scope.selectResource) && !_.isEmpty($scope.selectResource['id'])) {
          return $scope.filter.dateFrom.date <= entry.date && $scope.filter.dateTo.date >= entry.date && $scope.selectResource.id == entry.userId;
        } else if ($scope.filter.dateFrom.date && $scope.filter.dateTo.date) {
          return $scope.filter.dateFrom.date <= entry.date && $scope.filter.dateTo.date >= entry.date;
        } else if ($scope.filter.dateFrom.date) {
          if (!_.isEmpty($scope.selectResource) && !_.isEmpty($scope.selectResource['id'])) {
            return $scope.filter.dateFrom.date <= entry.date && $scope.selectResource.id == entry.userId;
          } else {
            return $scope.filter.dateFrom.date <= entry.date;
          }
        } else if ($scope.filter.dateTo.date) {
          if (!_.isEmpty($scope.selectResource) && !_.isEmpty($scope.selectResource['id'])) {
            return $scope.filter.dateTo.date >= entry.date && $scope.selectResource.id == entry.userId;
          } else {
            return $scope.filter.dateTo.date >= entry.date;
          }
        } else if (!_.isEmpty($scope.selectResource) && !_.isEmpty($scope.selectResource['id'])) {
          return $scope.selectResource.id == entry.userId;
        } else {
          return true;
        }
      });
    }


  });
