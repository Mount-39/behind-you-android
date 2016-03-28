'use strict';

angular.module('Map', [])

    .controller('MapCtrl', function ($scope, $stateParams, $timeout, $ionicPopup,
                                     ionicMaterialMotion, ionicMaterialInk, uiGmapGoogleMapApi,
                                     $ionicLoading, $ionicModal, MapService, $rootScope) {

        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        $scope.chat = {};
        $scope.positions = [];
        $scope.allChatMarkers = [];
        $scope.addMarker = false;
        $scope.setMarker = setMarker;
        $scope.cutMarker = cutMarker;
        $scope.setHere = setHere;
        $scope.startChat = startChat;
        var allowedBounds = null;
        var coords = [];
        var infoChat;

        $scope.map = {
            center: {latitude: 0, longitude: 0},
            zoom: 17,
            bounds: {}
        };

        //$scope.events = {
        //    dragend: function (map, eventName, args) {
        //        //console.log(map.getCenter().lng());
        //
        //     //   if (allowedBounds.contains(map.getCenter())) return;
        //
        //        var maxX = allowedBounds.getNorthEast().lng();
        //        var maxY = allowedBounds.getNorthEast().lat();
        //        var minX = allowedBounds.getSouthWest().lng();
        //        var minY = allowedBounds.getSouthWest().lat();
        //        var x = map.getCenter().lng();
        //        var y = map.getCenter().lat();
        //        console.log(maxX, minX);
        //        console.log(maxY, minY);
        //        console.log("CURRENT COORDS",y, x);
        //
        //        if (x < minX) x = minX;
        //        if (x > maxX) x = maxX;
        //        if (y < minY) y = minY;
        //        if (y > maxY) y = maxY;
        //
        //        console.log("RESULT",y, x);
        //        map.setCenter(new google.maps.LatLng(y, x));
        //    }
        //};

        $scope.options = {
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            styles: [
                {
                    stylers: [
                        {hue: '#890000'},
                        {gamma: 0.5},
                        {weight: 0.5}
                    ]
                },
                {
                    elementType: 'labels'
                },
                {
                    featureType: 'water',
                    stylers: [{color: '#890000'}]
                }
            ]
        };

        $scope.marker = {
            id: 0,
            coords: {
                latitude: 40.1451,
                longitude: -99.6680
            },
            options: {draggable: true},
            events: {
                dragend: function (marker, eventName, args) {
                    console.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    console.log(lat);
                    console.log(lon);

                    $scope.marker.options = {
                        draggable: true,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };


        $ionicModal.fromTemplateUrl('modules/Map/modal/setMarker.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });


        uiGmapGoogleMapApi.then(function (maps) {

            $ionicLoading.show({
                template: 'Loading...'
            });

            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.map.center.latitude = position.coords.latitude;
                $scope.map.center.longitude = position.coords.longitude;

                console.log(position);
                //allowedBounds = new google.maps.LatLngBounds(
                //    new google.maps.LatLng($scope.map.center.latitude - 0.005, $scope.map.center.longitude + 0.005),
                //    new google.maps.LatLng($scope.map.center.latitude + 0.005, $scope.map.center.longitude - 0.005)
                //);

                $ionicLoading.hide();
            }, function(error){
                console.log(error.message);
            }, {
                enableHighAccuracy: true
                ,timeout : 5000
            });

            $scope.options = {scrollwheel: false};
        });

        function setMarker() {
            $ionicLoading.show({
                template: 'Loading...'
            });
            $scope.marker.coords.latitude = $scope.map.center.latitude;
            $scope.marker.coords.longitude = $scope.map.center.longitude;

            $scope.addMarker = true;

            $ionicLoading.hide();
        }

        function cutMarker() {
            $scope.addMarker = false;
        }

        function setHere() {
            coords.push(($scope.marker.coords.latitude).toString(), ($scope.marker.coords.longitude).toString());
            $scope.openModal();
        }

        function startChat() {
            $ionicLoading.show({
                template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
            });
            MapService.setMarker($rootScope.currentUser.userId, $scope.chat, coords)
                .then(function (data) {
                    if (data.status == 200) {
                        MapService.getMarkers()
                            .then(getAllChatMarkers());

                        $ionicLoading.hide();
                        $scope.addMarker = false;
                        $scope.closeModal();
                    }
                })
        }

        function getAllChatMarkers() {
            MapService.getMarkers()
                .then(function (data) {
                    $scope.allChatMarkers.length = 0;
                    $scope.allChatMarkers = transformDataToMarkers(data.data);
                });
            //$scope.allChatMarkers
        }

        function transformDataToMarkers(data) {
            var result = [];

            angular.forEach(data, function (obj) {
                var marker = {
                    latitude: obj.position[0],
                    longitude: obj.position[1],
                    id: obj.id,
                    title:  obj.chatName,
                    name: obj.chatName,
                    description: obj.description,
                    markerClick: function(marker, ev, obj){

                        if (infoChat) {
                            infoChat.close();
                        }

                        var contentStr = '<div id="content">' +
                            '<h3 id="firstHeading" class="firstHeading">'+ obj.name +'</h3>' +
                            '<div id="bodyContent">' +
                            '<p>'+ obj.description +'</p>' +
                            '</div>' +
                            '</div>';

                        infoChat = new google.maps.InfoWindow({
                            content: contentStr,
                            maxWidth: 100
                        });

                        infoChat.open(marker.map, marker);
                    }
                };

                result.push(marker);
            });

            return result;
        }


        getAllChatMarkers();

    });