"use strict";
(function () {

    angular.module('Friends')

        .factory('FriendsService', friendsService);

    friendsService.$inject = ['$http', 'Backand'];

    function friendsService($http, Backand) {

        var friendsId = [];

        return {
            getFriendsId: getFriendsId,
            getFriendInfo: getFriendInfo,
            searchFriends: searchFriends
        };

        function getFriendsId(userId) {

            return $http ({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/objects/friends',
                params: {
                    pageSize: 100,
                    pageNumber: 1,
                    filter: JSON.stringify([
                        {
                            "fieldName": "user",
                            "operator": "in",
                            "value": userId
                        }
                    ]),
                    sort: ''
                }
            }).then(function (friends) {
               friendsId = _.map(friends.data.data, "friendId");

                return friendsId;
            });

        }

        function getFriendInfo(id){
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

        function searchFriends(searchText){
            return $http ({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/objects/users/',
                params: {
                    pageSize: 20,
                    pageNumber: 1,
                    filter: null,
                    sort: '',
                    search: searchText
                }
            }).then(function(response){
                return response.data.data;
            })
        }

    }


}());
