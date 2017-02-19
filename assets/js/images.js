$(window).load(function() {
    $('img').each(function(index, item){
        $(item).attr('src', $(item).attr('data-src'));
    });
});