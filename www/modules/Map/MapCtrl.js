'use strict';

angular.module('Map', [])

    .controller('MapCtrl', function ($scope, $stateParams, $timeout, $ionicPopup,
                                         ionicMaterialMotion, ionicMaterialInk, uiGmapGoogleMapApi,
                                     $ionicLoading
    ) {

        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        $scope.positions = [];
        $scope.map = { center: {
            latitude: null,
            longitude: null
        }, zoom: 17 };


        uiGmapGoogleMapApi.then(function(maps) {

            $ionicLoading.show({
                template: 'Loading...'
            });


            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
                $scope.map.latitude = position.coords.latitude;
                $scope.map.longitude = position.coords.longitude;
                //var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //console.log(pos);
                //$scope.positions.push({lat: pos.k,lng: pos.B});
               // $scope.map.setCenter(pos);
                $ionicLoading.hide();
            });

            $scope.map = { center: { latitude: 51.219053, longitude: 4.404418 }, zoom: 17 };
        });


    });