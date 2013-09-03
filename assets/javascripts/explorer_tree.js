/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* dvl */
//$(function() {

$('#projects-index li.root>div.root.close').unbind('click');
$('#projects-index li.root>div.root.close').parent().find('li').show();

var expandState = [], expandStateRoot = [];
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

    var restoreState = function(expands) {

    };

    restoreState(expandState)
    return expandState;
};

puthasedState = function() {

    var hashState = "";
    for (var key in expandState) {
        hashState += "|" + key;
        for (var state in expandState[key]) {
            hashState += ',' + state;
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
    if (idx < 0)
        idx = $('#projects-index li.root').index(elm.parent().parent().parent())

    var subidx = $('#projects-index li.root>ul.projects>li.child>div.child').index(elm) - 1;
    if (elm.hasClass('close')) {
        console.log('isClosed');
        if (idx >= 0) {
            if (subidx >= 0) {
                console.log('idx =', idx, ' subidx=', subidx);
                expandState[idx][subidx] = true;
            }
            else {
                console.log('idx =', idx, ' no subidx');
                expandState[idx] = expandStateRoot[idx] || [];
            }
        }
        //elm.parent().find('>li.child').slideDown('fast');
        var childs = elm.parent().children('ul.projects').slideDown(200, function() {
            elm.removeClass('close').addClass('open');
            elm.parent().parent().css('');
        });
    }
    else {
        console.log('isOpen');
        if (idx >= 0) {
            if (subidx >= 0) {
                console.log('idx =', idx, ' subidx=', subidx);
                delete expandState[idx][subidx];
            }
            else {
                console.log('idx =', idx, ' no subidx');
                expandStateRoot[idx] = expandState[idx];
                delete expandState[idx];
            }
        }

        elm.parent().children('ul.projects').stop().slideUp(300, function() {
            elm.addClass('close').removeClass('open');
        });
    }
    puthasedState();
};

// init
gethasedState();
var es;
$('#projects-index li.root>div.root').each(function(i, e) {
    es = e;
    console.log(es);
    if ($(e).parent().children('ul.projects').length > 0) {

        if (typeof(expandState[i]) !== "undefined") {
            $(e).addClass('open').removeClass('close');
        }
        else
            $(e).removeClass('close').addClass('open');

        $(e).parent().children('ul.projects').children('li.child').children('ul.projects').each(function(i2, e2) {
            console.log(expandState, i, i2);

            if (typeof(expandState[i]) !== "undefined" && typeof(expandState[i][i2]) === "undefined") {
                $(e2).hide();
                $(e2).parent().children('div.child').addClass('close').removeClass('open');
            }
            else {
                $(e2).addClass('open').removeClass('close');
            }

        });

    }
});

/*$('#projects-index li.root>div.root').parent().children('ul.projects').each(function(i, e) {
 
 if ($(this).parent().find('ul').length > 0) {
 if (typeof(expandState[i]) !== "undefined") {
 $(this).addClass('open').removeClass('close');
 }
 else
 $(this).removeClass('open').addClass('close');
 
 }
 //hide()
 //console.log(i);
 //if (typeof(expandState[i]) !== "undefined") {
 $(e).hide();
 //}
 });
 */
// root elements
$('#projects-index li.root>div.root.close, #projects-index li.root>div.root.open').bind('click', toggle);
// child elements
$('#projects-index li.child>div.child').each(function(i, e) {
    var childs = $(e).parent().children('ul.projects');
    if (childs.length > 0) {
        $(e).addClass('open').bind('click', toggle);
    }
});
//});
