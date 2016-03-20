(function () {

    "use strict";

    angular.module('UserPage')

        .service('UserPageService', userPageService);

    userPageService.$inject = ['$http','Backand'];

    function userPageService($http, Backand) {

        return {
           update: udate
        };

        function udate(id, data){
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