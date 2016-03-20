"use strict";
(function () {

    angular.module('Profile')

        .factory('ProfileService', profileService);

    profileService.$inject = ['$http', 'Backand'];

    function profileService($http, Backand) {

        return {
            getUserInfo: getUserInfo,
            setStatus: setStatus
        };

        function getUserInfo(id){
            return $http ({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/objects/users/' + id,
                params: {
                    pageSize: 20,
                    pageNumber: 1,
                    filter: null,
                    sort: ''
                }
            }).then(function(response){
                return response.data;
            })
        }

        function setStatus(id, data){
            return $http({
                method: 'PUT',
                url : Backand.getApiUrl() + '/1/objects/users/' + id,
                data: data,
                params: {
                    returnObject: true
                }
            }).then(function(response) {
                return response.data;
            });
        }
    }
}());
