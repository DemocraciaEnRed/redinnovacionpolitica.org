
var videos = [];
$(window).load(function() {
    $.ajax('https://www.googleapis.com/youtube/v3/search?key=AIzaSyAb1wAtmSCTWL9ACVydY0TwPR4VQv72XJ8&channelId=UCFKdgDTTNf3rnm7FwWGMMuA&part=snippet,id&order=date&maxResults=20')
    .done(function(data){
        if(data.items.length > 1)
        {
            data.items.forEach(function callback(item, index) {
                if(item.id.kind == "youtube#video" && (item.id.videoId != "jWFZLB7vQHk" || item.id.videoId != "TXNo80KL8Cg"))
                    CreatePreview(item);
                    videos.push(item);
            });
        }
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });

    $(".youtube-player-closebutton").on('click', function(ev){
        playerPoliticaRecuperada.stopVideo();
        OcultarReproductor();
        var obj = { Title: document.title, Url: window.location.origin + window.location.pathname + "#!/politicarecuperada" };
        window.history.pushState(obj, obj.Title, obj.Url);
    });

    CalcularProporcionTrailer();
    window.onresize = function(event) {
        CalcularProporcionTrailer();
    };
});

function CalcularProporcionTrailer()
{
    $('#politicarecuperada-trailer').height($('#politicarecuperada-trailer').outerWidth()*.5);
}

function CreatePreview(item)
{
    var fecha = moment(item.snippet.publishedAt);

    var element = 
    $('<div class="col-lg-3 col-md-6 mb-sm-50">'+
        '<div class=" youtube-container" id="'+item.id.videoId+'">'+
        '<div class="youtube-thumb" style="background-image:url('+item.snippet.thumbnails.high.url+')"></div>'+
        '<div class="youtube-date" data-day="'+fecha.date()+'">'+
            fecha.date() + ' de ' + getMonthName(fecha.month()) + ' del ' + fecha.year() +
            '<div class="share-buttons">'+
            '<div class="share-button facebook-button" id="facebook-'+item.id.videoId+'"></div>'+
            '<div class="share-button twitter-button" id="twitter-'+item.id.videoId+'"></div>'+
            '</div>'+
        '</div>'+
        '<div class="youtube-title">'+item.snippet.title+'</div>'+
        '<div class="youtube-description">'+item.snippet.description+'</div>'+
        '</div>'+
      '</div>');
    $('#politicarecuperada .row').append(element);

    element.find('.youtube-thumb, .youtube-title, .youtube-description').on('click', function(ev){
        CargarVideo(item, true);
        MostrarReproductor();
    });

    $('#facebook-'+item.id.videoId).on('click', function(ev){
        CompartirFacebook(item);
    })

    $('#twitter-'+item.id.videoId).on('click', function(ev){
        CompartirTwitter(item);
    })
}

function CompartirFacebook(item)
{
    window.open(
    'http://www.facebook.com/dialog/feed?app_id=404618713225544' +
    '&link=' + location.origin + location.pathname + '%23!%2Fpoliticarecuperada%2F'+item.id.videoId +
    '&picture=http:%2F%2Fredinnovacionpolitica.org/%2Fassets%2Fimages%2Flogo-square.png' +
    '&name=' + 'Política Recuperada' +
    '&caption=' + 'via Red de Innovación Política' +
    '&description=' + 'Ciclo de entrevistas que invitan al debate sobre recuperar la política en América Latina. En cada capítulo se podrá escuchar a alguna personalidad de la nueva política latinoamericana.' +
    '&redirect_uri=' + location.origin + location.pathname + '/close.html' +
    '&display=popup'
    , 'Política Recuperada', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
}

function CompartirTwitter(item)
{
    window.open('https://twitter.com/intent/tweet?'+
    'url=' + location.origin + location.pathname + '%23!%2Fpoliticarecuperada%2F'+item.id.videoId+'&'+
    'related=&'+
    'text='+ '%23PoliticaRecuperada Ciclo de entrevistas realizadas por la Red de Innovación Política', 'tweet', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
}

function getMonthName(num)
{
    switch(num)
    {
        case 0: return "Enero";
        case 1: return "Febrero";
        case 2: return "Marzo";
        case 3: return "Abril";
        case 4: return "Mayo";
        case 5: return "Junio";
        case 6: return "Julio";
        case 7: return "Agosto";
        case 8: return "Septiembre";
        case 9: return "Octubre";
        case 10: return "Noviembre";
        case 11: return "Diciembre";
    }
}


/*-------- REPRODUCTOR ---------*/

var playerPoliticaRecuperada;
/*
function onYouTubeIframeAPIReady() {

    playerPoliticaRecuperada = new YT.Player('yt-player', {
        height: '100%',
        width: '100%',
		playerVars: {
			'controls': 1,
			'modestbranding': 1,
			'rel': 0,
			'showinfo': 0
		},
        events: {
            'onReady': onPlayerPoliticaRecuperadaReady,
            'onStateChange': onPlayerPoliticaRecuperadaStateChange,
            'onError': onPlayerPoliticaRecuperadaError
        }
    });
}
*/

function MostrarReproductor()
{
    $('html, body').css('overflow', 'hidden');

    // Ajuste del reproductor
    $(".youtube-player").width($(window).width()*.96 - 360);
    $(".youtube-player-rightpanel").width(320);

    $('.youtube-player-wrapper').fadeIn('slow');
}

function OcultarReproductor()
{
    $('.youtube-player-wrapper').fadeOut('slow', function(){
        $('html, body').css('overflow', 'auto');
    });
}

var player;
function CargarVideo(item, changeurl)
{
    var fecha = moment(item.snippet.publishedAt);
    $("#youtube-player-date").html(fecha.date() + ' de ' + getMonthName(fecha.month()) + ' del ' + fecha.year());
    $("#youtube-player-date").attr('data-day', fecha.date());
    $("#youtube-player-title").html(item.snippet.title);
    $("#youtube-player-description").html(item.snippet.description);

	playerPoliticaRecuperada.loadVideoById({'videoId': item.id.videoId, 'startSeconds': 0});

    if (changeurl)
    {
        var obj = { Title: document.title, Url: window.location.origin + window.location.pathname + "#!/politicarecuperada/" + item.id.videoId };
        window.history.pushState(obj, obj.Title, obj.Url);
    }
}

var videoDone = false;
function onPlayerPoliticaRecuperadaReady(ev) {
	videoDone = true;
}

function onPlayerPoliticaRecuperadaStateChange(ev) {
}

function onPlayerPoliticaRecuperadaError(ev) {
}