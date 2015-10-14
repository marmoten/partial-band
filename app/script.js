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

  $("#allAdjectives").hover(function() {
      $.get('allAdjectives', function(response) {
        $("#showWordList").empty();
        var adjectives = response;
        adjectives.sort();
        for (var i = 0 ; i < adjectives.length ; i++) {
          $("#showWordList").append(adjectives[i] + '<br>');
        }
      });

      $("#showWordList").css("color", "#7A306C");
      $("#allAdjectives").css("color", "#7A306C");
    },

    function() {
    $("#showWordList").empty();
    $("#allAdjectives").css("color", "#6F8AB7");
  });

  $("#allVerbs").hover(function() {
      $.get('allVerbs', function(response) {
        $("#showWordList").empty();
        var verbs = response;
        verbs.sort();
        for (var i = 0 ; i < verbs.length ; i++) {
          $("#showWordList").append(verbs[i] + '<br>');
        }
      });

      $("#showWordList").css("color", "#7A306C");
      $("#allVerbs").css("color", "#7A306C");
    },

    function() {
    $("#showWordList").empty();
    $("#allVerbs").css("color", "#6F8AB7");
  });

  $("#allNouns").hover(function() {
      $.get('allNouns', function(response) {
        $("#showWordList").empty();
        var nouns = response;
        nouns.sort();
        for (var i = 0 ; i < nouns.length ; i++) {
          $("#showWordList").append(nouns[i] + '<br>');
        }
      });

      $("#showWordList").css("color", "#7A306C");
      $("#allNouns").css("color", "#7A306C");
    },

    function() {
    $("#showWordList").empty();
    $("#allNouns").css("color", "#6F8AB7");
  });

  $("#submitWords").on("submit", function(e) {
    //avoids page reload
    e.preventDefault();

    //clear response text
    $("#adjectiveRes").empty();
    $("#verbRes").empty();
    $("#nounRes").empty();

    var adjective = $("input[name=adjective]").val();
    var adjPost;

    var verb = $("input[name=verb]").val();
    var verbPost;

    var noun = $("input[name=noun]").val();
    var nounPost;

    if (adjective) {
      adjPost = {word: adjective};

      //post adjective to
      $.post("adjective", adjPost, function(response) {
        var adjectiveRes = response.msg;

        //insert into adjective response tag
        $("#adjectiveRes").text(adjectiveRes);
      });
    }

    if (verb) {
      verbPost = {word: verb};
      $.post("verb", verbPost, function(response) {
        var verbRes = response.msg;
        $("#verbRes").text(verbRes);
      });
    }

    if (noun) {
      nounPost = {word: noun};
      $.post("noun", nounPost, function(response) {
        var nounRes = response.msg;
        $("#nounRes").text(nounRes);
      });
    }

    $("#submitWords")[0].reset();
  });
});
