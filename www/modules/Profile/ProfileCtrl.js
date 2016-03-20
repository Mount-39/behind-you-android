'use strict';

angular.module('Profile', [])

    .controller('ProfileCtrl', function ($scope, $stateParams, $timeout, $ionicPopup,
                                         ionicMaterialMotion, ionicMaterialInk, $rootScope, ProfileService
    ) {
        //Animations and veiw =======================
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

        //Logic ====================================
        $scope.userId = $rootScope.currentUser.userId;
        $scope.userInfo = {};
      //  $scope.status = $rootScope.currentUser.status;
       // $scope.statusPopup = statusPopup();

        getUserInfo();


        function getUserInfo(){
            ProfileService.getUserInfo($scope.userId)
                .then(function(data){
                    delete data.__metadata;
                    $scope.userInfo = data;
                    console.log($scope.userInfo);
                });
        }

        function setStatus(newStatus){
            if(newStatus !== $scope.userInfo.status){

                console.log('OLD',$scope.userInfo.status);

                $scope.userInfo.status = newStatus;

                ProfileService.setStatus($scope.userId, $scope.userInfo)
                    .then(function(data){
                        $scope.userInfo = data;
                        console.log('New',$scope.userInfo.status);
                    });
            }
        }

        $scope.statusPopup = function ()
        {
            $scope.status = {};

            var Popup = $ionicPopup.show({
                template: '<input type="text" ng-model="status.set">',
                title: 'Enter status',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                                return $scope.status.set;
                        }
                    }
                ]
            });

            Popup.then(function(res) {
                console.log(res);
                if(res){
                    setStatus($scope.status.set);
                }
            });
        }

    });