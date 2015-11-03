/*
    script for the index.html file
*/

// a key for the application you created
Parse.initialize("7HjvE4cuO1MuHorCQHQV0dc9GKWww44tapFMZhZB", "eoiV62GiOCGHGSln5rH5rgLK6bAMDeYc3ksDZMqr");

$(function() {
    'use strict';

    // new Task class for parse
    var Task = Parse.Object.extend('Task');

    // new query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createAt');
    // delete and update the list
    tasksQuery.notEqualTo('done', true);

    // reference to the task list element
    var tasksList = $('#tasks-list');

    //rating element
    var ratingElem = $('#rating');

    //reference to the error message alert
    var errorMessage = $('#error-message');

    //current set of tasks
    var tasks = [];

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError(){
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinner();
        // fetch data from Parse
        //call displayError if there's an error
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
           var li = $(document.createElement('li'))
                .text(task.get('title'))
                //add the class if the task is done, if not, don't add it
                .addClass(task.get('done') ? 'completed-task': '')
                .appendTo(tasksList)
                .click(function () {
                    task.set('done', !task.get('done'));
                    task.save().then(renderTasks, displayError);
            });

            $(document.createElement('span'))
                .raty({readOnly: true,
                    score: (task.get('rating') || 0),
                    hints: ['crap', 'awful', 'ok', 'nice', 'awesome']})
                .appendTo(li);
        });
    }

    function showMessage (message) {
        message = message || 'Hello';
        alert(message);
    }

    //when the user submits the new task form..
    $('#new-task-form').submit(function(evt){
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        // set the rating attribute to the score from rating raty
        task.set('rating', $('#rating').raty('score'));
        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
            ratingElem.raty('set', {});
        });

        // to prevent browser default
        return false;


    });
    // go and fetch tasks from the server
    fetchTasks();

    //call and invoke the rating user interface element
    ratingElem.raty();

    //window.setInterval(fetchTasks, 3000);
});

