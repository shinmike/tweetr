$( document ).ready(function() {
    console.log( 'ready!' );
    $('.new-tweet textarea').on('input', function(){
        // console.log($(this).val().length);
        var charLimit = 140;
        var charLength = $(this).val().length;
        var charRemaining = charLimit - charLength;
        var $counter = $(this).parent().children('.counter');
        // console.log($counter);
        $counter.text(charRemaining);
        if (charRemaining < 0) {
            $counter.addClass('overLimit');
        } else {
            $counter.removeClass('overLimit');
        }
    });
});

console.log("Hello world");