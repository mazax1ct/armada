//отслеживание скролла для шапки
var header = $('.header'),
    scrollPrev = 0;

var resize_scroll = function(e) {
  var scrolled = $(window).scrollTop();

  if (scrolled > 0) {
		header.addClass('is-scrolled');
	} else {
		header.removeClass('is-scrolled');
	}

	scrollPrev = scrolled;
};

$(document).on('click', '.js-menu-toggler', function() {
  var _this = $(this);
  if(!_this.hasClass('is-active')) {
    $('body').addClass('is-overflow');
    $('.header').addClass('menu-is-open');
    $(this).addClass('is-active');
  } else {
    $('body').removeClass('is-overflow');
    $('.header').removeClass('menu-is-open');
    $(this).removeClass('is-active');
  }
  return false;
});

$(document).on('click', '.l-menu__link', function () {
  $('.l-menu__link').removeClass('is-active');
  $(this).addClass('is-active');
  $('body').removeClass('is-overflow');
  $('.header').removeClass('menu-is-open');
  $('.js-menu-toggler').removeClass('is-active');
});

$(document).on('click', '.accordion__toggler', function () {
    $(this).toggleClass('is-active');
    $(this).closest('.accordion').find('.accordion__body').slideToggle();
    return false;
});

$(document).ready(function() {
  //запуск функции навешивания класса на шапку
  resize_scroll();

  $('.js-form').each(function() {
      var form = $(this),
          btn = form.find('button[type="submit"]'),
          formStatus = form.find('.js-form-status');

      function checkInput() {
          form.find(':required').each(function() {
              if($(this).val() != '') {
                  $(this).removeClass('error');
              } else {
                  $(this).addClass('error');
              }
          });
      }

      btn.click(function() {
          checkInput();
      });

      form[0].onsubmit = async(e) => {
          e.preventDefault();

          /*let response = await fetch('/local/ajax/vacancy_form.php', {
              method: 'POST',
              body: new FormData(formElem)
          });*/

          //let result = await response.json();

          let result = {
              STATUS: 'ERROR',
              ERROR: 'Произошла ошибка. Попробуйте позже или напишите нам на почту armada‑hockey@mail.ru',
          }

          if (result.STATUS == 'ERROR') {
              // вывести result.ERROR
              formStatus.addClass('error').html(result.ERROR);
          } else {
              // вывести успешная отправка
              formStatus.removeClass('error').html('Ваша заявка принята');
          }
      };
  });


  $(document).on('change', '[required]', function () {
     if($(this).val() !== ''){
         $(this).removeClass('error');
     }
  });

  if($('.js-trainers-slider').length) {
    $('.js-trainers-slider').each(function(index) {
      let slider = new Swiper($(this)[0], {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: '.js-slider-next[data-slider="'+$(this).attr('data-slider')+'"]',
          prevEl: '.js-slider-prev[data-slider="'+$(this).attr('data-slider')+'"]',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 40
          }
        }
      });
    });
  }
});

//перезапуск функции навешивания класса на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);
