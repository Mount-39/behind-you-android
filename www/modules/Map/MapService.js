// QUERY to server with current location of user (coords + some scale) to get all
// chats that available at those territory



(function () {

  "use strict";

  angular.module('Map')

    .factory('MapService', mapService);

  mapService.$inject = ['$http', 'Backand'];

  function mapService($http, Backand) {

    return {
    setMarker: setMarker,
      getMarkers: getMarkers
    };

    function setMarker(id, data, coords){
      return $http ({
        method: 'POST',
        url: Backand.getApiUrl() + '/1/objects/MapChats',
        data: {
          user: id,
          chatName: data.chatName,
          description: data.description,
          position: coords
        }
      }).then(function(responce){
        return responce;
      })
    }

    function getMarkers(){
      return $http ({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/MapChats',
        params: {
          pageSize: 20,
          pageNumber: 1,
          filter: null,
          sort: ''
        }
      }).then(function(responce){
        return responce.data;
      })
    }

  }
}());



/*
return $http ({
    method: 'PUT',
    url: Backand.getApiUrl() + '/1/objects/MapChats/1?returnObject=true',
    data: {
        user: '5',
        chatName: 'Chat 1',
        description: 'Here you can post anything',
        position: [
            '50.00976852453445',
            '36.32133033068851'
        ]
    }
});*/
