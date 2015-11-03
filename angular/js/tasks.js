/* 
    script for the tasks.html file 
*/

angular.module('Tasks',[])
    .constant('tasksKey', 'tasks')
    .controller('TaskController', function($scope, tasksKey) {
        'use strict';

        //initialize tasks property on the scope to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];

        //initialize newTask to an empty object
        $scope.newTask = {};

        function saveTasks() {
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }

        //add a function to add newTask to the array
        $scope.addTask = function() {

            //push the current value of new task into the tasks array
            $scope.tasks.push($scope.newTask);
            //reset new tasks to an empty object

            saveTasks();
            $scope.newTask = {};
        };

        $scope.toggleDone = function(task) {
            task.done = !task.done;

            saveTasks()
        };
    });

