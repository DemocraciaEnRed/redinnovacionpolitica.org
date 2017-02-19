$(window).load(function() {
    var url = window.location.href;
    var secciones = url.split('/');
    if (secciones.length > 0)
    {
        if (secciones.indexOf('politicarecuperada') > -1)
        {
            $('html,body').animate({
              scrollTop: $('#politicarecuperada').offset().top - 150
            }, 1000);
        }
        else if (secciones.indexOf('adherir') > -1)
        {
            $('html,body').animate({
              scrollTop: $('#adherir').offset().top - 150
            }, 1000);
        }
    }
});