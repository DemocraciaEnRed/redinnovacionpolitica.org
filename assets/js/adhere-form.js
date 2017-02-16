$(window).load(function() {

    /* Seleccionar el primer radio button (Persona) */
    var contr = $('#form-adhere input[type=radio]');
    contr.first().prop( "checked", true );

    /* Cargar lista de paises en el select */
    $.ajax({ url: '/assets/js/countries.json', dataType: 'text'})
    .done(function( data ) {
        data = JSON.parse(data);
        var select = $('#pais-adherente-1');
        $.each( data, function( key, val ) {
            select.append('<option value="'+key+'">'+val+'</option>')
        });
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });

    /* Evento de selección de radio button para cambiar el placeholder de los textboxes */
    contr.on('change', function(ev){
        if($(ev.target).attr('id') == "tipo-persona-adherente")
        {
            $('#nombre-adherente-1').attr('placeholder', 'Escribe tu nombre');
            $('#email-adherente-1').attr('placeholder', 'Escribe tu email');
        }
        else if($(ev.target).attr('id') == "tipo-organizacion-adherente")
        {
            $('#nombre-adherente-1').attr('placeholder', 'Escribe el nombre de la organización');
            $('#email-adherente-1').attr('placeholder', 'Escribe el email de la organización');
        }
    })

    /* Enviamos el formulario 
    $('#submit-adhere').click(function(ev){
        $.post( '/assets/php/adhere-form.php', $('form-adhere').serialize())
        .done(function(data) {
            $( '.ajax-message' ).html( data );
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    });
    */
});