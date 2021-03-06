// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Items', ['$firebaseArray', function($firebaseArray){
  var itemsRef = new Firebase('https://xxxxxxxxxx.firebaseio.com/items');
  return $firebaseArray(itemsRef);
}])

.controller('ListCtrl', function($scope, $ionicListDelegate, Items){ 

  $scope.items = Items;

  $scope.addItem = function (){
    var name = prompt('What do you need to buy?');
    if(name){
      $scope.items.$add({'name':name});
    }
  };

  $scope.purchaseItem = function(item){
    var itemRef = new Firebase('https://xxxxxxxxxx.firebaseio.com/items/'+item.$id);
    itemRef.child('status').set('purchased'); 
    $ionicListDelegate.closeOptionButtons();
  }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


 
