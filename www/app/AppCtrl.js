"use strict";


angular.module('sideMenu', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPopup, $state) {
        // Form data for the login modal
        $scope.loginData = {};

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);
        };


        ////////////////////////////////////////
        // Layout Methods
        ////////////////////////////////////////


        $scope.hideNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        };

        $scope.showNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        };

        $scope.noHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };

        $scope.setExpanded = function (bool) {
            $scope.isExpanded = bool;
        };

        $scope.setHeaderFab = function (location) {
            var hasHeaderFabLeft = false;
            var hasHeaderFabRight = false;

            switch (location) {
                case 'left':
                    hasHeaderFabLeft = true;
                    break;
                case 'right':
                    hasHeaderFabRight = true;
                    break;
            }

            $scope.hasHeaderFabLeft = hasHeaderFabLeft;
            $scope.hasHeaderFabRight = hasHeaderFabRight;
        };

        $scope.hasHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }

        };

        $scope.hideHeader = function () {
            $scope.hideNavBar();
            $scope.noHeader();
        };

        $scope.showHeader = function () {
            $scope.showNavBar();
            $scope.hasHeader();
        };

        $scope.clearFabs = function () {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };

        // A confirm dialog
        $scope.showConfirm = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout',
                template: 'Are you sure you want to logout?',
                cancelText: 'No',
                cancelType: 'button-positive',
                okText: 'Yes',
                okType: 'button-default'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    $state.go('app.login')
                }
                //else {
                //    console.log('No');
                //}
            });
        };
    });


