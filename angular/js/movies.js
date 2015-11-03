
angular.module('MoviesApp', ['ui.router'])
    .factory('moviesJSON', function($http) {
        $http.get('data/movies-2014.min.json')

    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/movies',
                templateUrl: 'views/movies-list.html',
                controller: 'MoviesController'
            })
            .state('detail', {
                url: '/movies/:index',
                templateUrl: 'views/movies-detail.html',
                controller: 'MovieDetailController'

            });
        $urlRouterProvider.otherwise('/movies')
    })
    .controller('MovieDetailController', function($scope, $stateParams, moviesJSON) {
        moviesJSON.then(function(results) {
            $scope.movie =results.data[$stateParams.index];
        });
    })
    .controller('MoviesController', function($scope,moviesJSON) {
        var ratingsMap = {
            'Not Rated': 0,
            'G': 1,
            'PG': 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X': 6
        };

        //get movies JSON file
        //$http.get('data/movies-2014.min.json')
            moviesJSON.then(function(results) {
                //results is anobject with info about the entire HTTP response
                // the data itself can be accessed via its 'data' property
               $scope.movies = results.data.map(function(movie) {
                   //look up ratingsmap, and return the number coresponding with rating.
                   movie.ratingOrdinal =ratingsMap[movie.rating];
                   return movie;
               });

                //pluck the distributor property from each object into an array

                $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));

            });

        $scope.setSort = function(propertyName) {
            if ($scope.sort === propertyName) {
                $scope.sortReverse = !$scope.sortReverse;

            }
            else {
                $scope.sortCol = propertyName;
                $scope.sortReverse = false;
            }

        }
    });