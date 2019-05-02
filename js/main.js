$(function(){
    //ted dulezite

    //mouseenter
    $('.objekt').on('mouseenter',function(){
        $(this).attr({'style':'fill:rgba(0,255,0,0.15);stroke:rgba(0,255,0,0.15)'});
        $('#nazev').text($(this).data('nazev'));
    })
    //mouseleave
    $('.objekt').on('mouseleave',function(){
        $(this).attr({'style':'fill:rgba(0,255,0,0.1);stroke:rgba(0,255,0,0.1)'});
    })

    //ted nedulezite
    $('#ustava p').hide();
    $('#ustava h4').on('click', function(){
        if ($(this).nextUntil('h4').is(':hidden')) {
            $(this).css({'background-color':'#38a'});
        } else {
            $(this).css({'background-color':'#444'});
        }
        $(this).nextUntil('h4').toggle(500);
    });

    var kviz = $('#kviz div.row');
    osobnosti.forEach(function(obj, idx){
        console.log(obj.photo);
        kviz.append('<div class="col-sm-4"><figure id="'+idx+'"><img src="img/osobnost0.jpg" alt="Osobnost"><figcaption>'
        +obj.name+'</figcaption></figure></div>');
    });

    var photo = $('#kviz img');
    photo.on('click',function(){
        var index = Math.floor(Math.random()*osobnosti.length);
        $(this).attr('src','img/'+osobnosti[index].photo)
               .attr('alt',osobnosti[index].name);
    });

    var check = $('#kviz .btn-success');
    check.on('click', function(){
        $('#kviz figure').each(function(idx,obj){
            var figcaption = $(obj).find('figcaption').text();
            var alt = $(obj).find('img').attr('alt');
            if (figcaption == alt) {
                $(obj).find('img').css({'border':'2px solid green'}); 
            } else {
                $(obj).find('img').css({'border':'2px solid red'});
            }
        });        
    });

    var odkazy = $('#odkazy ul');
    osobnosti.forEach(function(obj, idx){
        odkazy.append('<li><a href="'+obj.link+'" target="_blank">'
        +obj.name+'</a></li>');
    });

})