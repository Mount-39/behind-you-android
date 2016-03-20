'use strict';

angular.module('Login', [])

    .controller('LoginCtrl', function (
        $scope, $timeout, $state, $stateParams,
        ionicMaterialInk, $ionicSideMenuDelegate,
        Backand, $cookies, ionicMaterialMotion, LoginService, $rootScope
    ) {
        var login = this;

        login.step = 1;
        login.stepBefore = 1;

       // $scope.$parent.clearFabs();
        login.signin = signin;
        login.error = $state.params.error;

        $scope.pictureNumber = picture();
        $scope.whichBg = whichBg();

        $scope.nextStep = function (){
            $timeout(function () {
                login.stepBefore = login.step;
                login.step++;
            }, 500);
        };

        $scope.backStep = function (){
            login.stepBefore = login.step;
            login.step--;
        };

        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 500);



        $ionicSideMenuDelegate.canDragContent(false);

        $timeout(function () {
            $scope.$parent.hideHeader();
        }, 0);

        ionicMaterialInk.displayEffect();

        function signin(user) {
            LoginService.signin(login.email, login.password)
                .then(function(data){
                    $rootScope.currentUser = data;
                    console.log($rootScope.currentUser);
                    $state.go('app.profile');
                }, showError
            )

        }

        function showError(error) {
            console.log(error);
            login.error = error && error.data || error.error_description || 'Unknown error from server';
        }

        function picture(){
            return Math.round(Math.random()*6)+1;
        }

        function whichBg(){
            var bg = {
                1 : "rgb(52, 46, 61)",
                2 : "rgb(52, 73, 92)",
                3 : "rgb(92, 102, 120)",
                4 : "rgb(249, 227, 210)",
                5 : "rgb(61, 61, 61)",
                6 : "rgb(234, 126, 108)",
                7 : "rgb(51, 41, 86)"
            };

            return bg[$scope.pictureNumber];
        }

    });