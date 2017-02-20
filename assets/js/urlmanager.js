var isMobile = false;
$(window).load(function() {
    if ($(window).outerWidth() < 600)
        isMobile = true;

    var url = window.location.href;
    var secciones = url.split('/');
    if (secciones.length > 0)
    {
        if (secciones.indexOf('politicarecuperada') > -1)
        {
            $('html,body').animate({
              scrollTop: $('#politicarecuperada').offset().top - 80
            }, 1000, function(){
                if(secciones[secciones.length-1] != 'politicarecuperada')
                {
                    var id = secciones[secciones.length-1];
                    CargarVideo(videos.filter(function(item){return item.id.videoId == id})[0], false);
                    MostrarReproductor();
                }
            });
        }
        else if (secciones.indexOf('adherir') > -1)
        {
            $('html,body').animate({
              scrollTop: $('#adherir').offset().top - 80
            }, 1000);
        }
    }
});