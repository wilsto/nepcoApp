'use strict';
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.imgTitle = 'title_intro';

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, $state) {
            console.log(toState);
            $scope.imgTitle = 'title_' + toState.name.substr(4);
            console.log($scope.imgTitle);
            console.log("$state", $state);

        });

})

.controller('IntroCtrl', function($scope, $rootScope) {})


.controller('AboutCtrl', function($scope, $rootScope) {

})



.controller('MoncompteCtrl', function($scope, $rootScope) {

})


.controller('SuggestCtrl', function($scope, $rootScope) {

})

.controller('ConceptCtrl', function($scope, $location, $rootScope) {
    $scope.pagenb = 1;

    $scope.pageNext = function() {
        $scope.pagenb += 1;
        if ($scope.pagenb === 11) {
            $scope.pagenb = 1;
            $location.path('app/about');
        }
    }

    $scope.pagePrevious = function() {
        $scope.pagenb -= 1;
        if ($scope.pagenb === 0) {
            $scope.pagenb = 1;
            $location.path('app/about');
        }
    }

})


.controller('TestsCtrl', function($scope, $location, $stateParams) {
    $scope.pagedetails = (typeof $stateParams.pagedetails === 'undefined') ? '' : $stateParams.pagedetails;

    $scope.showDetails = function(details) {
        $scope.pagedetails = details;
    }
    $scope.retour = function() {
        if ($scope.pagedetails === '') {
            $location.path('app/about');
        } else {
            $scope.pagedetails = '';
        }
    }

})

.controller('PlaylistsCtrl', function($scope, $rootScope, $http, ENV, $cordovaBarcodeScanner, $location) {
    $scope.doRefresh = function() {
        $http.get(ENV.apiEndpoint + 'api/articles')
            .success(function(articles) {
                $scope.articles = articles;
                console.log('articles', articles);
            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };
    $scope.doRefresh();

    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            $location.path('app/playlists/' + imageData.text);
        }, function(error) {
            console.log('An error happened -> ' + error);
        });
    };

})

.controller('BrowseCtrl', function($scope, $cordovaBarcodeScanner, $location, $timeout) {
    $scope.scanInProgress = false;
    $scope.scanBarcode = function() {
        $scope.scanInProgress = true;
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            console.log(imageData.text);
            console.log('Barcode Format -> ' + imageData.format);
            console.log('Cancelled -> ' + imageData.cancelled);
            $location.path('app/playlists/' + imageData.text);
        }, function(error) {
            console.log('An error happened -> ' + error);
        });
    };

    $timeout(function() {
        $scope.scanBarcode();
    }, 2000);
})

.controller('PlaylistCtrl', function($scope, $http, ENV, $stateParams) {
    console.log(' $stateParams.playlistId', $stateParams);
    if ($stateParams.playlistId) {
        $http.get(ENV.apiEndpoint + 'api/articles/' + $stateParams.playlistId).success(function(article) {
            $scope.article = article[0];
            $('#myCarousel').carousel({
                interval: 4000
            });

            // handles the carousel thumbnails
            $('[id^=carousel-selector-]').click(function() {
                var id_selector = $(this).attr("id");
                var id = id_selector.substr(id_selector.length - 1);
                id = parseInt(id);
                $('#myCarousel').carousel(id);
                $('[id^=carousel-selector-]').removeClass('selected');
                $(this).addClass('selected');
            });

            // when the carousel slides, auto update
            $('#myCarousel').on('slid', function(e) {
                var id = $('.item.active').data('slide-number');
                id = parseInt(id);
                $('[id^=carousel-selector-]').removeClass('selected');
                $('[id=carousel-selector-' + id + ']').addClass('selected');
            });

            $scope.article.test1 = $scope.article.test1 || 'Vrillage';
            $scope.article.test2 = $scope.article.test2 || 'Solidité des teintures au lavage';
            $scope.article.test3 = $scope.article.test3 || 'Solidité des teintures à la sueur';
            $scope.article.test4 = $scope.article.test4 || 'Solidité des teintures au jaunissement phénolique';
            $scope.article.test5 = $scope.article.test5 || 'Facilité de repassage';


            $scope.chartPolar = {
                options: {
                    chart: {
                        polar: true,
                        type: 'area'
                    },

                    colors: ['#ff6700'],
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    }
                },
                size: {
                    height: 340
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: [$scope.article.test1, $scope.article.test2, $scope.article.test3, $scope.article.test4, $scope.article.test5],
                    tickmarkPlacement: 'on',
                    lineWidth: 1
                },

                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 1,
                    tickInterval: 1,
                    min: 0,
                    max: 5
                },

                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
                },

                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'vertical'
                },

                credits: {
                    enabled: false
                },
                series: [{
                    name: 'NepCode Rank',
                    data: [parseInt($scope.article.test1Rank), parseInt($scope.article.test2Rank), parseInt($scope.article.test3Rank), parseInt($scope.article.test4Rank), parseInt($scope.article.test5Rank)],
                    pointPlacement: 'on'
                }]

            };


            $scope.chartBar = {

                options: {
                    //This is the Main Highcharts chart config. Any Highchart options are valid here.
                    //will be overriden by values specified below.
                    chart: {
                        type: 'bar',

                    },
                    colors: ['#ff6700'],
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    },
                    //Title configuration (optional)
                    title: {
                        text: ''
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    subtitle: {
                        text: 'Les Kippmeyers ayant cet article trouvent qu’il taille :',
                        align: 'left'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 100,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },

                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                //The below properties are watched separately for changes.

                //Series object (optional) - a list of series using normal highcharts series options.
                series: [{
                    data: [0, 0, 5, 25, 10]
                }],
                //Boolean to control showng loading status on chart (optional)
                //Could be a string if you want to show specific loading text.
                loading: false,
                //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
                //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
                xAxis: {
                    categories: ['Très petit', 'Petit', 'Normalement', 'Grand', 'Très grand']
                }
            };


            $('.social-likes').socialLikes();
            $scope.loadPhotos();
        });
    }


    $scope.loadPhotos = function() {
        if ($scope.article.EAN13 && $scope.article.EAN13.length > 0) {
            var url = $.cloudinary.url($scope.article.EAN13, {
                format: 'json',
                type: 'list'
            });
            console.log('url', url);
            $scope.photos = [];
            $http.get(url.replace('file', 'http') + "?" + Math.ceil(new Date().getTime() / 1000)).success(function(photos) {
                $scope.photos = photos.resources;
            });
        } else {
            $scope.photos = [];
        }
    }



});