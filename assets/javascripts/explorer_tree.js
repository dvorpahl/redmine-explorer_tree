/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* dvl */
var t,z;
$(function() {
    toggle = function(e) {
        var elm = $(e.srcElement);
        if (elm.hasClass('close')) {
            t = elm;
            console.log('opening',t);
            elm.removeClass('close').addClass('open', function() {
                console.log(elm);
                elm.parent().find('li.child').slideDown('fast');
            });
        }
        else {
            z = elm;
            console.log('closing',z)
            elm.parent().find('li.child').slideUp();
            elm.addClass('close').removeClass('open');
        }
    };

    // init
    $('#projects-index li.root>div.root').each(function(e) {
        if ($(this).parent().find('ul').length > 0) {
            $(this).removeClass('open').addClass('close');
        }
    });
    $('#projects-index li.root>div.root.close').parent().find('li.child').hide();
    $('#projects-index li.root>div.root.close').bind('click',toggle);
});
