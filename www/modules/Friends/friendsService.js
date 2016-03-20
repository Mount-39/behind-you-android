"use strict";
(function () {

    angular.module('Friends')

        .factory('FriendsService', friendsService);

    friendsService.$inject = ['Restangular', '$http', 'Backand'];

    function friendsService(Restangular, $http, Backand) {

        var collection = [], friendsId = [];

        return {
            getFriendsId: getFriendsId,
            getFriendInfo: getFriendInfo
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
                //
                //angular.forEach(friendsId, function(id){
                //    getFriendInfo(id).then(function(result, error){
                //        collection.push(result);
                //    });
                //});

                return friendsId;
            });

          /*  userId.toString();
            Restangular.all("friends").getList(
                {
                    pageSize: 100, pageNumber: 1,
                    filter: JSON.stringify([
                        {
                            "fieldName": "user",
                            "operator": "in",
                            "value": "5"
                        }
                    ])
                }).then(function (friends) {
                    console.log(friends);
                    //...
                    // Iterate through the array
                });*/
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

    }


}());
