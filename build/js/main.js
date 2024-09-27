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

$(document).on('click', '.js-submenu-toggler', function () {
  let _this = $(this);
  if($('body').width() < 1024) {
    if(!_this.hasClass('is-active')) {
      $(_this).closest('.main-menu__item').find('.submenu').slideDown();
      $(_this).addClass('is-active');
    } else {
      $(_this).closest('.main-menu__item').find('.submenu').slideUp();
      $(_this).removeClass('is-active');
    }

    return false;
  }
});

$(document).on('click', '.gallery__item', function () {
  let gallery  = (new Function("return [" + $(this).attr('data-content') + "];")());
  $.fancybox.open(gallery);
});

$(document).ready(function() {
  if($('.main-banner__bg').length) {
    $(window).scroll(function() {
      let scrollWindowTop = window.scrollY;
      $('.main-banner__bg').css({transform: 'translateY('+scrollWindowTop+'px)'});
    });
  }

  if($('.js-slider').length) {
    $('.js-slider').each(function(index) {
      let slider = new Swiper($(this)[0], {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          type: "fraction",
          el: '.js-slider-navigation[data-id="'+$(this).attr('data-id')+'"]',
        },
        navigation: {
          nextEl: '.js-slider-next[data-id="'+$(this).attr('data-id')+'"]',
          prevEl: '.js-slider-prev[data-id="'+$(this).attr('data-id')+'"]',
        }
      });
    });
  }

  if($('.main-banner__content-section--2').length) {
    $('.main-banner__content-section--2 p span').hover(
      function() {
        $('.main-banner__content-section--2 p span').removeClass('is-active');
        $(this).addClass('is-active');
      }, function() {

      }
    );
  }

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
              ERROR: 'Произошла ошибка. Попробуйте позже или напишите нам на почту armada-hockey@mail.ru',
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
});
