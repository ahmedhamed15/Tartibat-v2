$(function () {
  'use strict';


  $('.navbar-toggler').on('click', function () {
    $('.animated-icon1').toggleClass('open');
  });

  $('.header.header .header-media .video-play-icon').on('click', function() {
    $(this).fadeOut().prev('video')[0].play();
  });

  $('.header.header .header-media video').on('click', function() {
    $(this).next('.video-play-icon').fadeOut();
  });

  if($(window).width() < 769) {
    $('.header.header .header-media video').removeAttr('controls');
    $('.header.header .header-media video').on('click', function() {
      if (this.paused == false) {
          this.pause();
      } else {
          this.play();
      }
    });
  }

  if ($('.solution-slider').length) {
    if($(window).width() > 768) {
      $('.solution-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        centerMode: true,
        variableWidth: false,
        rtl: false,
      });
    } else {
      $('.solution-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: false,
        rtl: false,
      });
    }
  }

  if ($('.portfolio-slider').length) {
    $('.portfolio-slider').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
    });
  }


  $('.solutions .solution-slider .slick-arrow, .portfolio .portfolio-slider button.slick-arrow').text("");

  if ($(window).width() > 768) {
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 0) {
        $('nav.navbar').css('boxShadow', '5px 5px 10px #130e40');
      } else {
        $('nav.navbar').css('boxShadow', 'none');
      }
    });
  }

  if ($(window).width() > 768) {
    $("body").niceScroll({
      cursorcolor: "#F6403D",
      cursorwidth: "7px",
      cursorborderradius: "0",
      cursorborder: "0",
      zindex: "99999",
      horizrailenabled: false
    });
  }

  $('.arrange-for-you .arrange-form .form-group label[for^="selected"]').on('click', function() {
    if ($(this).hasClass('background')) {
      $(this).css('background', 'none');
      $(this).removeClass('background');
    } else {
      $(this).css('backgroundColor', $(this).css('borderColor'));
      $(this).addClass('background');
    }
  });

  new WOW().init();




  //slideshow style interval
  var autoSwap = setInterval( swap,7000);

  //pause slideshow and reinstantiate on mouseout
  $('.carousel, .slider').hover(
    function () {
      clearInterval(autoSwap);
  }, 
    function () {
    autoSwap = setInterval( swap,7000);
  });

  //global variables
  var items = [];
  var startItem = 1;
  var position = 0;
  var itemCount = $('.carousel>li').length;
  var leftpos = itemCount;
  var resetCount = itemCount;

  //unused: gather text inside items class
  $('.carousel>li').each(function(index) {
      items[index] = $(this).text();
  });

  //swap images function
  function swap(action) {
    var direction = action;
    
    //moving carousel backwards
    if(direction == 'counter-clockwise') {
      var leftitem = $('.left-pos').attr('id') - 1;
      if(leftitem == 0) {
        leftitem = itemCount;
      }
      
      $('.right-pos').removeClass('right-pos').addClass('back-pos');
      $('.main-pos').removeClass('main-pos').addClass('right-pos');
      $('.left-pos').removeClass('left-pos').addClass('main-pos');
      $('#'+leftitem+'').removeClass('back-pos').addClass('left-pos');
      
      startItem--;
      if(startItem < 1) {
        startItem = itemCount;
      }
    }
    
    //moving carousel forward
    if(direction == 'clockwise' || direction == '' || direction == null ) {
      function pos(positionvalue) {
        if(positionvalue != 'leftposition') {
          //increment image list id
          position++;
          
          //if final result is greater than image count, reset position.
          if((startItem+position) > resetCount) {
            position = 1-startItem;
          }
        }
      
        //setting the left positioned item
        if(positionvalue == 'leftposition') {
          //left positioned image should always be one left than main positioned image.
          position = startItem - 1;
        
          //reset last image in list to left position if first image is in main position
          if(position < 1) {
            position = itemCount;
          }
        }
    
        return position;
      }  
    
    $('#'+ startItem +'').removeClass('main-pos').addClass('left-pos');
    $('#'+ (startItem+pos()) +'').removeClass('right-pos').addClass('main-pos');
    $('#'+ (startItem+pos()) +'').removeClass('back-pos').addClass('right-pos');
    $('#'+ pos('leftposition') +'').removeClass('left-pos').addClass('back-pos');

      startItem++;
      position=0;
      if(startItem > itemCount) {
        startItem = 1;
      }
    }
  }

  //next button click function
  $('#next').click(function() {
    swap('clockwise');
  });

  //prev button click function
  $('#prev').click(function() {
    swap('counter-clockwise');
  });

  //if any visible items are clicked
  $('.items').click(function() {
    if($(this).attr('class') == 'items left-pos') {
      swap('counter-clockwise'); 
    }
    else {
      swap('clockwise'); 
    }
  });

  
  $('#container').mixItUp();

});