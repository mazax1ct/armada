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

$(document).ready(function() {
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
