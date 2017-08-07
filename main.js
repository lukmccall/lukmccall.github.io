/**
 * Created by LukMcCall on 07.08.2017.
 */
(function () {
    var slides = document.getElementsByClassName('slide');
    for(var i=0; i<slides.length;i++){
        slides[i].addEventListener('click', function () {
            redirect(this.getAttribute('url'));
        });
    }

    function redirect(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
})();