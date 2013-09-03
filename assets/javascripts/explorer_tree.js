/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* dvl */
var es;

$(function() {

    $('#projects-index li.root>div.root.close').unbind('click');
    $('#projects-index li.root>div.root.close').parent().find('li').show();

    var expandState = [];
    var p = new RegExp('\\?et(\\[.*?\\])', ["i"]);

    gethasedState = function() {
        var stateData, m;
        var fallback = window.sessionStorage.getItem('explorer_tree');
        var hashState = window.location.hash;


        m = p.exec(hashState) || p.exec(fallback);
        if (m !== null && (stateData = ((m[1]).substr(0, (m[1]).length - 1).substr(1))) !== "")
        {
            var states = stateData.split('|');
            for (var i in states) {
                var state = states[i].split(',');
                expandState[parseInt(state.shift())] = state;
            }
        }
        return expandState;
    };

    puthasedState = function() {

        var hashState = "";
        for (var key in expandState) {
            hashState += "|" + key;
            for (var state in expandState[key]) {
                hashState += ',' + expandState[key][state];
            }
        }
        if (hashState.length > 1)
            hashState = '?et[' + hashState.substr(1) + ']';

        window.location.hash = (window.location.hash).replace(p, '') + hashState;
        window.sessionStorage.setItem('explorer_tree', hashState);
    };

    toggle = function(e) {
        var elm = $(e.srcElement);
        e.stopPropagation();
        var idx = $('#projects-index li.root>div.root').index(elm);

        if (elm.hasClass('close')) {
            expandState[idx] = [];
            //elm.parent().find('>li.child').slideDown('fast');
            var childs = elm.parent().children('ul.projects').slideDown(200,function(){
                elm.removeClass('close').addClass('open');
            });
            

            //childs.each(function(i, v) {
//                $(v).delay(i * 200).slideDown(250);
//            });
        }
        else {
            delete expandState[idx];
            elm.parent().children('ul.projects').stop().slideUp(300, function(){
                elm.addClass('close').removeClass('open');
            });
            
        }
        puthasedState();
    };

    // init
    gethasedState();

    $('#projects-index li.root>div.root').each(function(i, e) {

        if ($(this).parent().find('ul').length > 0) {
            if (typeof(expandState[i]) !== "undefined") {
                $(this).addClass('open').removeClass('close');
            }
            else
                $(this).removeClass('open').addClass('close');

        }
    });
    $('#projects-index li.root>div.root.close').parent().children('ul.projects').each(function(i, e) {
        //hide()
        //console.log(i);
        //if (typeof(expandState[i]) !== "undefined") {
        $(e).hide();
        //}
    });
    
    // root elements
    $('#projects-index li.root>div.root.close, #projects-index li.root>div.root.open').bind('click', toggle);
    // child elements
    $('#projects-index li.child>div.child').each(function(i,e) {
        var childs = $(e).parent().children('ul.projects');
        if(childs.length>0) {
            $(e).addClass('close').bind('click',toggle);
            $(childs).css({border:'1px solid red'});
        }
        
    
    });
});
