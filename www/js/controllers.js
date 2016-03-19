angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope, $location) {
  $scope.login = function() {
    console.log("this is working");
    $location.path('/map');
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
    $location.path('/park_info');
    $http.get("http://mehrik-mbpro.local:5000/test")
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

// .controller('DashCtrl', function($scope, NgMap, $cordovaGeolocation) {

// })

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
