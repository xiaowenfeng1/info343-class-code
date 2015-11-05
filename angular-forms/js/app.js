/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(uuid, localStorageService, storageKey) {
        return [{
            id: 'default-delete-me',
            fname: 'Fred',
            lname: 'Flintstone',
            phone: '205-223-2121',
            dob: '1/1/1900'
        }];
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/contacts',
                templateUrl: 'views/contacts-list.html',
                controller: 'ContactsController'
            })
            .state('detail', {
                url: '/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'

            })
            .state('edit', {
                url:'/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'

            });

        $urlRouterProvider.otherwise('/contacts');
    })
    .controller('ContactsController', function($scope, contacts) { // whatever the factory return
        $scope.contacts = contacts;

    })
    .controller('ContactDetailController', function($scope, $stateParams,
                                                    $state, contacts) {
        $scope.contact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;

        });

    })

    .controller('EditContactController', function($scope, $stateParams,
                                                  $state, contacts) {
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        //work on the copy of contact
        $scope.contact = angular.copy(existingContact);
        $scope.save = function() {
            angular.copy($scope.contact, existingContact);
            $state.go('list');
        }

    });
