var img = 1;

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$( document ).ready(function() {
    $( "#navtrigger" ).click(function() {
        $(".icon").toggleClass("change");
        $("#phone .cont").toggleClass("hidden");
    });
    
    $('#mail').submit(function(event){
        var fields = $( this ).serializeArray();
        var name = fields[0].value;
        var email = fields[1].value;
        var content = fields[3].value;
        
        var validation = true;
        var error = '';
        
        if(name == '') {
            validation = false;
            error += '<div>Podaj swoje imie oraz nazwisko.</div>';
        }
        
        if(isEmail(email) == false){
            validation = false;
            error += '<div>Podaj email.</div>';
        }
        
        if(content == ''){
            validation = false;
            error += '<div>Nie możesz wysłać pustej wiadomości.</div>';
        }
        $('#check').html(error);    
        if(validation) return true;
        else return false;
    });
});


$(window).scroll(function(){

    var wScroll = $(this).scrollTop();

    if(wScroll >= $('#trigger').offset().top - 50 ){
        $('#nav').addClass("fixed");
//                $('#trigger').css({'height' : '50px'});
    }
    else{
       $('#nav').removeClass("fixed");
//                $('#trigger').css({'height' : '0px'});
    }
    
     if(wScroll > $('#skills').offset().top - ($(window).height() / 1.2)) {
            $('#skills .col').each(function(i){

              setTimeout(function(){
                $('#skills .col').eq(i).addClass('is-showing');
              }, (800 * (Math.exp(i * 0.14))) - 800);
            }); 
      }
    
    if(wScroll > $('#portfolio').offset().top - ($(window).height() / 1.2)) {
            $('#portfolio .item').each(function(i){

              setTimeout(function(){
                $('#portfolio .item').eq(i).addClass('is-showing');
              }, i*300 );
            }); 
      }
    
    if(wScroll >= $('#kontakt').offset().top - ($(window).height() / 1.3)) {
        $('#kontakt .col').addClass("is-showing");
        $('#kontakt .col2').addClass("is-showing");
    }
    
    
     if(wScroll >= $('#user').offset().top - ($(window).height() / 1.3)) {
        $('#user').addClass("is-showing");
        $('#user-text').addClass("is-showing");
    }
    
});

$( window ).resize(function() {
    var width = $(window).width();
    if(width < 575)
    {
        $('#desktop').css('display','none');
        $('#phone').css('display','block');
    }
    else
    {
      $('#desktop').css('display','block');  
      $('#phone').css('display','none');  
    }
});

setInterval("bg_img()", 6000);

function bg_img(){
    img++;
    if(img>5) img = 1 
    var url = 'url(assets/img/bg_img' + img + '.jpg)';
    $('.bg_img').css('backgroundImage',url);
    
}

//char js
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.responsive = true;

var html = document.getElementById("html").getContext("2d");
var css = document.getElementById("css").getContext("2d");
var js = document.getElementById("js").getContext("2d");
var php = document.getElementById("php").getContext("2d");
var boostrap = document.getElementById("boostrap").getContext("2d");
var laravel = document.getElementById("laravel").getContext("2d");


//HTML
var data = {
    labels: [
        "HTML:5",
    ],
    datasets: [
        {
            data: [98, 2],
            backgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            hoverBackgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            borderWidth: [ 0, 0 ],
        }]
};



var htmlChart = new Chart(html, {
   type: 'doughnut',
    data: data,
      options: {
        cutoutPercentage: 85,
      }
});

// CSS
var data = {
    labels: [
        "Css",
    ],
    datasets: [
        {
            data: [95, 5],
            backgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            hoverBackgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            borderWidth: [ 0, 0 ],
        }]
};



var cssChart = new Chart(css, {
   type: 'doughnut',
    data: data,
      options: {
        cutoutPercentage: 85,
      }
});

// JS
var data = {
    labels: [
        "JS",
    ],
    datasets: [
        {
            data: [75, 25],
            backgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            hoverBackgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            borderWidth: [ 0, 0 ],
        }]
};



var jsChart = new Chart(js, {
   type: 'doughnut',
    data: data,
      options: {
        cutoutPercentage: 85,
      }
});

// PHP
var data = {
    labels: [
        "PHP",
    ],
    datasets: [
        {
            data: [85, 15],
            backgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            hoverBackgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            borderWidth: [ 0, 0 ],
        }]
};



var phpChart = new Chart(php, {
   type: 'doughnut',
    data: data,
      options: {
        cutoutPercentage: 85,
      }
});

// Boostrap
var data = {
    labels: [
        "Boostrap",
    ],
    datasets: [
        {
            data: [90, 10],
            backgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            hoverBackgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            borderWidth: [ 0, 0 ],
        }]
};



var boostrapChart = new Chart(boostrap, {
   type: 'doughnut',
    data: data,
      options: {
        cutoutPercentage: 85,
      }
});

// Laravel
var data = {
    labels: [
        "Laravel",
    ],
    datasets: [
        {
            data: [60, 40],
            backgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            hoverBackgroundColor: [
                "#FF675F",
                "#C7C7C7",
            ],
            borderWidth: [ 0, 0 ],
        }]
};



var laravelChart = new Chart(laravel, {
   type: 'doughnut',
    data: data,
      options: {
        cutoutPercentage: 85,
      }
});
