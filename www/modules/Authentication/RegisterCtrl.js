'use strict';

angular.module('Login')

    .controller('RegisterCtrl', function (
        $scope, $timeout, $state, $stateParams,
        ionicMaterialInk, $ionicSideMenuDelegate,
        Backand, $cookies, ionicMaterialMotion, LoginService, $rootScope
    ) {

        var reg = this;

        $ionicSideMenuDelegate.canDragContent(false);

        $timeout(function () {
            $scope.$parent.hideHeader();
        }, 0);

        //Set animation
        $timeout(function () {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 4000
            });
        }, 200);

        // Set Ink
        ionicMaterialInk.displayEffect();


        reg.error = $state.params.error;
        $scope.showingPassword = showingPassword;
        reg.signup = signup;
        $scope.passwordIs = false;
        $scope.passType = 'password';

        function showingPassword (){
            $scope.passwordIs = !$scope.passwordIs;
            if($scope.passwordIs == true){
                $scope.passType = 'text';
            }
            else $scope.passType = 'password';
        }

        function signup(user){
            console.log(reg.firstName, reg.lastName, reg.email, reg.password);

            LoginService.signup(reg.firstName, reg.lastName, reg.email, reg.password, {})
                .then(function (response) {
                    if(response.access_token){
                        $rootScope.currentUser = response;
                        console.log(response);
                        $state.go('app.profile');
                    }
                }, showError)
        }

        function showError(error) {
            console.log(error);
            reg.error = error.data.error_description || 'Unknown error from server';
            console.log(reg.error);
        }

    });