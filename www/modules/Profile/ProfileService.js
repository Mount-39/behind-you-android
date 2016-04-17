"use strict";
(function () {

    angular.module('Profile')

        .factory('ProfileService', profileService);

    profileService.$inject = ['$http', 'Backand'];

    function profileService($http, Backand) {

        return {
            getUserInfo: getUserInfo,
            setStatus: setStatus,
            getNews: getNews
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

        function getNews(){
            return $http ({
                method: 'GET',
                url: 'http://api.nytimes.com/svc/movies/v2/reviews/all.json?order=by-publication-date&',
                params:{
                    'api-key': 'af40a746c0d21cbbfa400595a78f03ab:10:74820590'
                }
            }).then(function(response){
                return response.data;
            })
        }
    }
}());
