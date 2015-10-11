'use strict';

$(function() {

  $("button").click(function() {
    $.get('adjective', function(response) {
      //get request from adjective route, sends response (json) into function
      var adjective = response.word;
      //assigns variable to value of word in the response json object
      $("#adjective").text(adjective);
    });

    $.get('verb', function(response) {
      var verb = response.word;
      $("#verb").text(verb);
    });

    $.get('noun', function(response) {
      var noun = response.word;
      $("#noun").text(noun);
    });

  });

  $("#submitWords").on("submit", function(e) {
    //avoids page reload
    e.preventDefault();

    //clear response text
    $("#adjectiveRes").empty();
    $("#verbRes").empty();
    $("#nounRes").empty();

    var adjective = $("input[name=adjective]").val();
    //take adjective from form
    var adjPost;

    var verb = $("input[name=verb]").val();
    //take verb from form
    var verbPost;

    var noun = $("input[name=noun]").val();
    //take noun from form
    var nounPost;

    if (adjective) {
      console.log('adjective = ' + adjective);
      adjPost = {word: adjective};
      $.post("adjective", adjPost, function(response) {
        //post adjective to
        var adjectiveRes = response.msg;
        $("#adjectiveRes").text(adjectiveRes);
        //insert into adjective response tag
      });
    }

    if (verb) {
      console.log('verb = ' + verb);
      verbPost = {word: verb};
      $.post("verb", verbPost, function(response) {
        //post verb to
        var verbRes = response.msg;
        $("#verbRes").text(verbRes);
        //insert into verb response tag
      });
    }

    if (noun) {
      console.log('noun = ' + noun);
      nounPost = {word: noun};
      $.post("noun", nounPost, function(response) {
        //post noun to
        var nounRes = response.msg;
        $("#nounRes").text(nounRes);
        //insert into noun response tag
      });
    }

    $("#submitWords")[0].reset();
  });

});
