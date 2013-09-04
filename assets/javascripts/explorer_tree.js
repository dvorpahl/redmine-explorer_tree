/**
 * (C)2013 plastΆгե network
 * → http://www.plastart.de
 * → danilo.vorpahl@gmail.com
 *
/*
    Created on : 03.09.2013, 10:31:37
    Author     : dvorpahl

 *
 * @param {type} window
 * @returns {undefined}
 */
(function(window) {

    var PLUGIN = "explorer_tree";
    var DEBUG = false;
    var URLUPDATE = true;

    var urlHashPattern = new RegExp('\\?et(\\[.*?\\])', ["i"]);
    var eStates = [];

    /**
     * urlHash
     * @type type
     * -----------------------------------------------------------------------------
     */
    var urlHash = {};

        urlHash.gethashedState = function() {
            if (DEBUG) console.log('gethashedState()');
            var current = [];

            var m, foundMatch; //matches
                m = urlHashPattern.exec(window.location.hash) ||
                    urlHashPattern.exec(window.sessionStorage.getItem(PLUGIN));
            if (DEBUG) console.log(m);

            if (m !== null && (foundMatch = ((m[1]).substr(0, (m[1]).length - 1).substr(1))) !== "") {
                var aStates = foundMatch.split(',');
                for (var i in aStates) {
                    current['_'+aStates[i]] = true;
                }
            }
            if (DEBUG) console.log(current);
            return current;
        };

        urlHash.createhashString = function(current) {
            if (DEBUG) console.log('createhashString()');
            var hashString = "";

            for (var k in current) {
                if(current[k] === true)
                hashString += "," + k.substr(1);
            }
            if (hashString.length > 1)
                hashString = '?et[' + hashString.substr(1) + ']';

            if (DEBUG) console.log(hashString);
            return hashString;
        };

        urlHash.puthashState = function(hashString) {
            if (DEBUG) console.log('puthashState()');
            if(URLUPDATE) window.location.hash = (window.location.hash).replace(urlHashPattern, '') + hashString;
            window.sessionStorage.setItem(PLUGIN, hashString);

            return true;
        };

    /**
     * helper
     * @type type
     * -----------------------------------------------------------------------------
     */
    var helper = {};
    
        helper.getItems = function() {
            return $('#projects-index li.root>div.root, #projects-index li.child>div.child');
        };

/*        helper.finder = function(elm) {
            var subidx, idx = $('#projects-index li.root>div.root').index($(elm));
            if (idx < 0) {
                idx = $('#projects-index li.root').index($(elm).parent().parent().parent());
                var root = $('#projects-index li.root>div.root').get(idx);
                subidx = $(root).parent().children('ul.projects').children('li.child').index($(elm).parent());

                if (DEBUG) console.log('sub element (' + subidx + ') of root-idx = ', idx);

            }
            else if (DEBUG) console.log('root element root-idx = ', idx);
        };
*/    
        helper.sdbm = function(str) {
            var hash = 0, char;
            for (var i = 0; i < str.length; i++) {
                char = str.charCodeAt(i);
                hash = char + (hash << 6) + (hash << 16) - hash;
            }
            return hash;
        };

        helper.hash = function(str){
          return str.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a;},0);              
        };

        helper.genIdentity = function(elm) {
            var href = $(elm).children('a').attr('href');
            var identity = helper.hash(href);
            var hexId = (identity < 0 ? (0xFFFFFFFF + identity + 1) : identity).toString(16);
            if (DEBUG) console.log('genIdentity('+hexId+')',href);
            return hexId;
        };
        
    /**
     * tree
     * @type type
     * -----------------------------------------------------------------------------
     */
    var tree = {};
    
        tree.eventHandler = function(event) {
            if (DEBUG) console.log('toggle()', event);
            if (DEBUG) console.log('target =', event.target);

            // little helper to find eventElement
            function getTarget(objEvent) {
                var targ, e = objEvent;
                if (e.target) targ = e.target;                   // most browsers
                else if (e.srcElement) targ = e.srcElement;      // internet explorer
                if (targ.nodeType === 3) targ = targ.parentNode; // defeat safari bug
                return targ;
            }

            if(tree.toggle(getTarget(event))) {
                
            };
            
            event.stopPropagation();
        };

        tree.toggle = function(elm) {

            var containers = $(elm).parent().children('ul.projects');
            var hexId = $(elm).attr('data-id');
            
            if($(elm).hasClass('close')) {
                containers.slideDown(200, function() {
                    $(elm).removeClass('close').addClass('open');
                    eStates['_'+hexId] = true;
                    urlHash.puthashState(urlHash.createhashString(eStates));
                });
                return true;
            }
            else {
                containers.stop().slideUp(300, function() {
                    $(elm).removeClass('open').addClass('close');
                    eStates['_'+hexId] = false;
                    urlHash.puthashState(urlHash.createhashString(eStates));
                });
                return true;
            }
            return false;
        };

        tree.identity = function() {
            helper.getItems().each(function(i, item){
                if($(item).next('ul.projects').length>0) {
                    var hexId = helper.genIdentity(item);
                    eStates["_"+hexId] = false;
                    $(item).attr('data-id', hexId);
                }
            });
        };
    
        tree.restore = function() {
            var states = urlHash.gethashedState();

            for (var k in states) {
                if (eStates.hasOwnProperty(k)) {
                    eStates[k] = true;
                }
            }

            helper.getItems().each(function(i, item){
                var hexId = $(item).attr('data-id');
                if(eStates['_'+hexId] === false) {
                    $(item).next().hide();
                    $(item).addClass('close');
                }
                else {
                    $(item).addClass('open');
                }
            });
        };
    

    // init --------------------------------------------------------------------
    tree.identity();
    tree.restore();
    helper.getItems().bind('click', tree.eventHandler);

})(this);
