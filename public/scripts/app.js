/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// ----------------------------------------------------- Function for error message
function showError(message){
  alert(message);
};

$(document).ready(function(e){
// ----------------------------------------------------- Form submission using Jquery
  $('#btnSubmitTweet').on('click',function(e){
    e.preventDefault();
    var vTweet = $('#txtTweet').val();
    var vTweetData = {
      text: vTweet
    };
    // ----------------------------------------------------- Validation 1
    if (vTweet.length === 0) {
      showError("You didn't tweet anything :(");
      return;
    }; 
    // ----------------------------------------------------- Validation 2
    if (vTweet.length > 140){
      showError("You exceeded 140 characters :(");
      return;
    }; 
    // ----------------------------------------------------- Proceed posting to Ajax
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: vTweetData,
      dataType: "json",
      success: function(data){
        console.log("ajax post request succesful");
        console.log(data);
        loadTweets();
        $('#txtTweet').val('');
      },
      error: function(response){
        console.log("some error occured");
        console.log(response);
      }
    });
  });

  function createTweetElement(tweetObject) {
    var $article = $('<article class="tweet">');
    var $header = $('<header>');
    var $avatar = $('<img class="avatar" src='+ tweetObject.user.avatars.small + '>' );
    var $h2 = $('<h2 class="username">'+ tweetObject.user.handle + '</h2>');
    var $h1 = $('<h1 class="fullname">'+ tweetObject.user.name + '</h2>');
    var $divTweetContent = $('<div class="tweet-content">');
    var $p = $('<p>' + tweetObject.content.text + '</p>');
    var $footer = $('<footer>');
    var $divIcons = $('<div class="icons">');
    var $iFlag = $('<i class="fa fa-flag">');
    var $iRetweet = $('<i class="fa fa-retweet">');
    var $iHeart = $('<i class="fa fa-heart">');
    var $pTimestamp = $('<p class="timestamp">' + moment(tweetObject.created_at).fromNow() + '</p>');

    $header.append($avatar).append($h2).append($h1);
    $divTweetContent.append($p);
    $divIcons.append($iFlag).append($iRetweet).append($iHeart)
    $footer.append($divIcons).append($pTimestamp);

    $article.append($header).append($divTweetContent).append($footer);
    return $article;
  }

  function renderTweets(arrayTweetObject) {
    $('#all-tweets').empty();
    for (var i in arrayTweetObject) {
      var article = createTweetElement(arrayTweetObject[i]);
      $('#all-tweets').prepend(article);
    }
  }

// ----------------------------------------------------- Proceed getting from Ajax
  function loadTweets(){
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json",
      success: function(data){
        console.log("ajax get request succesful");
        renderTweets(data);
      },
      error: function(response){
        console.log("some error occured");
      }
    });
  };
  loadTweets();

});

// ----------------------------------------------------- Miscellaneous tips

//[] 0
//{} "name"
//var str = "name";
//{"name":1}["name"]

//array is easy to loop through
//object is easy for us to comprehend what it means