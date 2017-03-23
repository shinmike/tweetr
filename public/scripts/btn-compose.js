$(document).ready(function(){
    $('.btn-compose').on('click', function(){
      $('.new-tweet').toggle();
      $('#txtTweet').focus();
    });
});