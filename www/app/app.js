// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in AppCtrl.app
angular.module('app', [
    'ionic', 'backand',
    'ionic-material', 'ionMdInput',
    'restangular', 'ngCookies',
    'sideMenu', 'Profile', 'Login',
    'Friends', 'UserPage'
])

    .run(function ($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.currentUser = {};

        //DELETE BEFORE DEPLOY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        $rootScope.currentUser.userId = 5;
    })


    .config(function (BackandProvider, $httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        BackandProvider.setAppName('behindyou');
        BackandProvider.setSignUpToken('680c44f3-6cd5-4a32-a7cb-0130a6aa17f7');
        BackandProvider.setAnonymousToken('45667209-9bb4-4e8d-be81-0c5aa368e55e');

        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'modules/Authentication/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'login'
                    },
                    'fabContent': {
                        template: '<button class="button button-fab button-fab-top-left button-royal" ui-sref="app.register"><i class="icon ion-ios-personadd"></i></button>'
                    }
                },
                onEnter: function ($ionicSideMenuDelegate) {
                    $ionicSideMenuDelegate.canDragContent(false)
                },
                onExit: function ($ionicSideMenuDelegate) {
                    $ionicSideMenuDelegate.canDragContent(true)
                }
            })

            .state('app.register', {
                url: '/register',
                views: {
                    'menuContent': {
                        templateUrl: 'modules/Authentication/register.html',
                        controller: 'RegisterCtrl',
                        controllerAs: 'reg'
                    },
                    'fabContent': {
                        template: ''
                    }
                },
                onEnter: function ($ionicSideMenuDelegate) {
                    $ionicSideMenuDelegate.canDragContent(false)
                },
                onExit: function ($ionicSideMenuDelegate) {
                    $ionicSideMenuDelegate.canDragContent(true)
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })

            .state('app.friends', {
                url: '/friends',
                params: {
                    user: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'modules/Friends/friends.html',
                        controller: 'FriendsCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-friends').classList.toggle('on');
                            }, 900);
                        }
                    }
                }
            })

            .state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'modules/Profile/profile.html',
                        controller: 'ProfileCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-edit"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-profile').classList.toggle('on');
                            }, 800);
                        }
                    }
                }
            })

            .state('app.userPage', {
                url: '/userPage',
                params: {
                    userInfo: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'modules/UserPage/userPage.html',
                        controller: 'UserPageCtrl',
                        controllerAs: 'self'
                    },
                    'fabContent': {
                        template: '<button ng-show="showBnt" id="fab-userPage" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-chatbubble"></i></button>',
                        controller: function ($scope,$timeout, $stateParams, $rootScope) {
                            $scope.showBnt = true;

                            $timeout(function () {
                                document.getElementById('fab-userPage').classList.toggle('on');
                            }, 800);

                            if($stateParams.userInfo.id == $rootScope.currentUser.userId){
                                $scope.showBnt = false;
                            }
                        }
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
    });
