'use strict';

angular.module('Friends', [])

    .controller('FriendsCtrl', function ($scope, $stateParams, $timeout, $state,
                                         ionicMaterialMotion, ionicMaterialInk,
                                         FriendsService, $rootScope) {

        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.$parent.setHeaderFab('left');

        // Delay expansion
        $timeout(function () {
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
        }, 300);


        // Set Ink
        ionicMaterialInk.displayEffect();


        $scope.friendsId = [];
        $scope.friendsInfo = [];
        $scope.search = {text: ''};
        $scope.userInfo = userInfo;
        $scope.searchFriend = searchFriend;


        uploadFriends();


        function uploadFriends() {
            return FriendsService.getFriendsId($rootScope.currentUser.userId)
                .then(function (data) {
                    $scope.friendsId = data;
                    // return $scope.friendsId;
                })
                .then($scope.friendsInfo.length = 0)
                .then(getFriendsInfo)
        }

        function getFriendsInfo() {
            angular.forEach($scope.friendsId, function (id) {
                FriendsService.getFriendInfo(id).then(function (result, error) {
                    $scope.friendsInfo.push(result);
                })
            });
        }

        function userInfo(index){
            console.log($scope.friendsInfo[index]);
            $state.go('app.userPage', {userInfo: $scope.friendsInfo[index]})
        }

        function searchFriend(){

            if(!$scope.search.text) {
                uploadFriends();
                return;
            }

            FriendsService.searchFriends($scope.search.text)
                .then(function(result, error){
                    console.log(result);
                    $scope.friendsInfo = result;
                })
        }

    });