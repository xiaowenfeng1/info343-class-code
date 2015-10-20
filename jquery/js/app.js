/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/

// when the DOM content has been loaded..
$(function() {
    'use strict';
    // select all the <a> add target attribute, set the value as _blank
    $('a').attr('target', '_blank');
    $('article').hide().fadeIn().fadeOut();
    $('#toggle-article').click(function (){
       //$('article').toggle(); // if it's hidden, show, if it's shown, hide it. fadeToggle

    });

    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';
    //a function get json results, return an object
    $.getJSON(url).then(function(data) {  //data
         var temperature = data.main.temp;
        console.log(data);
        $('#temp').text(Math.round(temperature)); // add text content into the #temp tag


    });

    console.log('test');
});