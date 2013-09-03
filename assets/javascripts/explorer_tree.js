/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* dvl */
$(function() {
    toggle = function(e) {
        var elm = $(e.srcElement);
        if (elm.hasClass('close')) {
            //elm.parent().find('>li.child').slideDown('fast');
            elm.parent().children('ul.projects').childreen('li.child').slideDown();
            elm.removeClass('close').addClass('open');
        }
        else {
            elm.parent().children('ul.projects').childreen('li.child').slideUp();
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
