/**
 * Created by LukMcCall on 07.08.2017.
 */
(function () {

    var defaultSection = 'websites';
    var slides = document.getElementsByClassName('slide');
    var sliders = document.getElementsByClassName('slider');
    var links = document.getElementsByClassName('link');
    var urlVars = getUrlVars();
    var section = urlVars['section'];

    if(section == undefined) section = defaultSection;

    init();

    function init() {
        if(!sectionSelect()){
            section = defaultSection;
            sectionSelect();
        }
        linkSystem();
    }

    function sectionSelect() {
        var goodSection = false;
        for(var i=0; i < sliders.length;i++){
            if(sliders[i].getAttribute('section') != section) sliders[i].classList.add('hidden');
            else {
                sliders[i].classList.remove('hidden');
                goodSection = true;
            }
        }
        return goodSection;
    }

    function linkSystem() {
        //slides
        for(var i=0; i<slides.length;i++){
            slides[i].addEventListener('click', function () {
                redirect(this.getAttribute('url'),false,'_blank');
            });
        }
        //link
        for(i=0; i<links.length;i++){
            if(links[i].getAttribute('url') === '?section='+section) links[i].classList.add('active');
            else links[i].classList.remove('active');
            links[i].addEventListener('click', function () {
               redirect(this.getAttribute('url'),true);
            });
        }
    }

    function redirect(url,newTab, option) {
        if(newTab){
            window.location.href = url;
        }else {
            var win;
            if (option != undefined)
                win = window.open(url, option);
            else
                win = window.open(url);
            win.focus();
        }
    }

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
})();