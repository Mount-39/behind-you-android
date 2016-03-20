'use strict';

angular.module('UserPage', [])

    .controller('UserPageCtrl', function ($scope, $stateParams, $timeout,
                                          ionicMaterialMotion, ionicMaterialInk,
                                          $rootScope, $state, UserPageService
    ) {

        var self = this;

        $scope.userInfo = $stateParams.userInfo;
        $scope.userPage = false;

        self.error = $state.params.error;
        self.update = update;

// Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

// Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function () {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 4000
            });
        }, 1000);

// Set Ink
        ionicMaterialInk.displayEffect();

        if($scope.userInfo.id == $rootScope.currentUser.userId){
            $scope.userPage = true;
        }

        function update(user){
                UserPageService.update($scope.userInfo.id, $scope.userInfo)
                    .then(function(data){
                        $scope.userInfo = data;
                    }, showError);
        }

        function showError(error) {
            console.log(error);
            self.error = error && error.data || error.error_description || 'Unknown error from server';
        }

    });

