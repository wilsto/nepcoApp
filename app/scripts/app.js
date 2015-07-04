'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'starter.controllers',
    'config',
    'ngCordova',
    'highcharts-ng',
    'cloudinary'
])

.run(function($ionicPlatform) {

    $.cloudinary.config().cloud_name = 'imguploadstorage';
    $.cloudinary.config().upload_preset = 'kippme';
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html',
                controller: 'BrowseCtrl'
            }
        }
    })

    .state('app.intro', {
        url: '/intro',
        views: {
            'menuContent': {
                templateUrl: 'templates/intro.html',
                controller: 'IntroCtrl'
            }
        }
    })

    .state('app.about', {
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'templates/about.html',
                controller: 'AboutCtrl'
            }
        }
    })

    .state('app.partners', {
        url: '/about/partners',
        views: {
            'menuContent': {
                templateUrl: 'templates/partners.html'
            }
        }
    })

    .state('app.concept', {
        url: '/about/concept',
        views: {
            'menuContent': {
                templateUrl: 'templates/concept.html',
                controller: 'ConceptCtrl'
            }
        }
    })

    .state('app.tests', {
        url: '/about/tests',
        views: {
            'menuContent': {
                templateUrl: 'templates/tests.html',
                controller: 'TestsCtrl'
            }
        }
    })

    .state('app.contact', {
        url: '/about/contact',
        views: {
            'menuContent': {
                templateUrl: 'templates/contact.html'
            }
        }
    })

    .state('app.follow', {
        url: '/about/follow',
        views: {
            'menuContent': {
                templateUrl: 'templates/follow.html'
            }
        }
    })

    .state('app.moncompte', {
        url: '/moncompte',
        views: {
            'menuContent': {
                templateUrl: 'templates/moncompte.html',
                controller: 'MoncompteCtrl'
            }
        }
    })


    .state('app.playlists', {
        url: '/playlists',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlists.html',
                controller: 'PlaylistsCtrl'
            }
        }
    })

    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/intro');
});