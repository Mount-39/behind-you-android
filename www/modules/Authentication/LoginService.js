(function () {

    "use strict";

    angular.module('Login')

        .service('LoginService', loginService);

    loginService.$inject = ['Backand', '$cookies'];

    function loginService(Backand, $cookies) {

        return {
            signin: signin,
            signup: signup
        };

        function signin(email, password) {

           return Backand.signin(email, password)
                .then(function (response) {
                    $cookies.put('access_token', response.access_token);
                    return response;
                });
        }

        function signup (firstName, lastName, email, password, parameters) {
            return Backand.signup(firstName, lastName, email, password, password, parameters)
                .then(function (signUpResponse) {
                    console.log(signUpResponse);
                    if (signUpResponse.access_token) {
                        return signin(email, password)
                            .then(function () {
                                return signUpResponse;
                            });

                    } else {
                        return signUpResponse;
                    }
                });
        }


    }

}());