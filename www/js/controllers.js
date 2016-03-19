angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope, $location, $http) {
  $scope.user = {};
  $scope.login = function() {
    // send this user name over to my server
    console.log($scope.user.name);
    console.log($scope.user);
    $http.post('http://mehrik-mbpro.local:5000/user', $scope.user).success(function (output) {
      console.log(output);
    })

    // $location.path('/map');
  }
})

.controller('MapCtrl', function($scope, $location, $http) {
  $scope.parks = [];
  console.log("inside the map controller");
  // Initialize map
  $scope.$on('mapInitialized', function (event, map) {
    $scope.map = map;
    $scope.getAllParks();
    console.log("Map initialized")
    console.log(map);
  });

  // Show detail of specific item
  $scope.showDetail = function (event, park_id) {
    console.log("It worked");
    console.log(park_id);
    $http.get("https://data.seattle.gov/resource/ajyh-m2d3?$$app_token=mrNMSCsthoLkP5pilmE0zWv0K").success(function (result) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].locid == park_id) {
          // save current park information
          window.localStorage["park"] = JSON.stringify(result[i]);
          $location.path('/park_info');
        }
      }
    })
    // $http.get("http://mehrik-mbpro.local:5000/test")
  }

  // Get park information
  $scope.getAllParks = function () {
    $http.get("https://data.seattle.gov/resource/ajyh-m2d3?$$app_token=mrNMSCsthoLkP5pilmE0zWv0K").success(function (parks) {
      console.log(parks);
      for (index in parks) {
        $scope.parks[index] = parks[index];
      }
    })
  }
})

.controller('ParkCtrl', function($scope, $location) {
  // Allow park_info.html to have access to current park selected
  $scope.info = JSON.parse(window.localStorage["park"]);
  console.log($scope.info);
})

.controller('ReviewCtrl', function($scope, $location) {
  $scope.exit = function() {
    console.log("Successfully exited from the Review Page")
    $location.path('/park_info');
  }

  $scope.save = function() {
    console.log("You should have saved something here");
    $location.path('/park_info');
  }
})