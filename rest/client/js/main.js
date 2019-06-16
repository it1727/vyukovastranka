$(function(){
    /* Získá všechny záznamy z movies.json prostřednictvím AJAX požadavku */
    function getAll() {
        $.ajax({
            url: 'http://localhost:3000/api/movies',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                $('#list').html('');
                data.forEach(function(film) {
                    $('#list').append('<tr><td>'+film.id
                        +'</td><td><a href="#" data-id="'+film.id+'">'+film.bitva
                        +'</a></td><td>'+film.vitez+'</td><td>'+film.loser+'</td><td>'+film.doba+'</td><td>'+film.vitezvel+'</td><td>'+film.loservel+'</td><td><button class="btn btn-danger delete" data-id="'+film.id+'">Smazat</button></td></tr>');
                });
                $('#list a').on('click', function(){
                    getById($(this).data('id'));
                }); 
                $('.delete').on('click', function(){
                    deleteById($(this).data('id'));
                }); 
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    /* Získá jeden záznam podle id */
    function getById(id) {
        $.ajax({
            url: 'http://localhost:3000/api/movies/' + id,
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                $('#id').val(data.id);
                $('#bitva').val(data.bitva);
                $('#vitez').val(data.vitez);
                $('#loser').val(data.loser);
                $('#doba').val(data.doba);
                $('#vitezvel').val(data.vitezvel);
                $('#loservel').val(data.loservel);
                $('#popis').val(data.popis);
                $('#modelId').modal('show');
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    /* Smazat záznam podle id */
    function deleteById(id) {
        $.ajax({
            url: 'http://localhost:3000/api/movies/' + id,
            type: 'DELETE',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    /* Vytvořit nový záznam */
    function create(data) {
        $.ajax({
            url: 'http://localhost:3000/api/movies',
            type: 'POST',
            data: data,
            dataType: 'json',            
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    /* Editovat záznam */
    function update(id, data) {
        $.ajax({
            url: 'http://localhost:3000/api/movies/' + id,
            type: 'PUT',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    $('button#submit').on('click', function(){
        var json = {};
        json.bitva = $('#bitva').val();
        json.vitez = $('#vitez').val();
        json.loser = $('#loser').val();
        json.doba = $('#doba').val();
        json.vitezvel = $('#vitezvel').val();
        json.loservel = $('#loservel').val();
        json.popis = $('#popis').val();
        var data = JSON.stringify(json);
        if ($('#id').val()) {
            update($('#id').val(), data);
        } else {
            create(data);
        }
    });

    $('button#create').on('click', function(){
        $('#id').val('');
        $('#bitva').val('');
        $('#vitez').val('');
        $('#loser').val('');
        $('#doba').val('');
        $('#vitezvel').val('');
        $('#loservel').val('');
        $('#popis').val('');
    });

    getAll();
});
    
