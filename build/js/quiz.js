$(document).on('click', '.js-quiz-opener', function() {
  if(!$(this).hasClass('is-active')) {
    $(this).addClass('is-active');
    $('body').addClass('is-overflow');
    $('.quiz').addClass('is-active');
  }
  return false;
});

$(document).on('click', '.js-quiz-closer', function() {
  $('.js-quiz-opener').removeClass('is-active');
  $('body').removeClass('is-overflow');
  $('.quiz').removeClass('is-active');
  $('.quiz__form')[0].reset();
  $('.quiz__error').hide();
  $('.quiz__success').hide();
  $('.quiz__step').removeClass('is-active filled');
  $('.quiz__step input[type="text"]').removeClass('filled');
  $('.quiz__step:first').addClass('is-active');
  $('.quiz__form-buttons').show();
  $('.js-quiz-prev').prop('disabled', 'disabled');
  return false;
});

$(document).ready(function() {
  $('.quiz__form')[0].reset()
});

function checkNext() {
  if($('.quiz__step.is-active').next('.quiz__step').length) {
    if($('.quiz__step.is-active').hasClass('filled')) {
      $('.js-quiz-next').prop('disabled', '');
    } else {
      $('.js-quiz-next').prop('disabled', 'disabled');
    }
  } else {
    $('.js-quiz-next').hide();
    $('.js-quiz-submit').show();
  }
}

function checkPrev() {
  if($('.quiz__step.is-active').prev('.quiz__step').length) {
    $('.js-quiz-prev').prop('disabled', '');
  } else {
    $('.js-quiz-prev').prop('disabled', 'disabled');
  }
}

function checkInput(el) {
  if(el.val().length > 0) {
    el.addClass('filled')
  } else {
    el.removeClass('filled')
  }
}

$(document).on('input', '.quiz__step.is-active input[type="text"]', function () {
  checkInput($(this));

  if($('.quiz__step.is-active input:not(.filled)').length <= 0) {
    $('.quiz__step.is-active').addClass('filled');
    checkNext();
    if($('.quiz__step.is-active').hasClass('quiz__finish')) {
      $('.js-quiz-submit').prop('disabled', '');
    }
  } else {
    $('.quiz__step.is-active').removeClass('filled');
    checkNext();
    if($('.quiz__step.is-active').hasClass('quiz__finish')) {
      $('.js-quiz-submit').prop('disabled', 'disabled');
    }
  }
});

$(document).on('change', '.quiz__step.is-active input[type="radio"]', function () {
  if($('.quiz__step.is-active input:checked').length > 0) {
    $('.quiz__step.is-active').addClass('filled');
    checkNext();
    if($('.quiz__step.is-active').hasClass('quiz__finish')) {
      $('.js-quiz-submit').prop('disabled', '');
    }
  } else {
    $('.quiz__step.is-active').removeClass('filled');
    checkNext();
    if($('.quiz__step.is-active').hasClass('quiz__finish')) {
      $('.js-quiz-submit').prop('disabled', 'disabled');
    }
  }
});

$(document).on('click', '.js-quiz-next', function () {
  if($('.quiz__step.is-active').next('.quiz__step').length) {
    $('.quiz__step.is-active').next('.quiz__step').addClass('is-active');
    $('.quiz__step.is-active').prev('.quiz__step').removeClass('is-active');
    checkNext();
    checkPrev();
  }
  return false;
});

$(document).on('click', '.js-quiz-prev', function () {
  if($('.quiz__step.is-active').prev('.quiz__step').length) {
    $('.quiz__step.is-active').prev('.quiz__step').addClass('is-active');
    $('.quiz__step.is-active').next('.quiz__step').removeClass('is-active');
    $('.js-quiz-next').show();
    $('.js-quiz-submit').hide();
    checkPrev();
    checkNext();
  }
  return false;
});

$(document).on('submit', '.quiz__form', function () {
  /*let response = await fetch('/local/ajax/quiz_form.php', {
      method: 'POST',
      body: new FormData(formElem)
  });*/

  //let result = await response.json();

  let result = {
      STATUS: 'SUCCESS'
  }

  if (result.STATUS == 'ERROR') {
      $('.quiz__step.is-active').hide();
      $('.quiz__error').show();
  } else {
    $('.quiz__step.is-active').hide();
    $('.quiz__success').show();
    $('.quiz__form-buttons').hide();
  }

  return false;
});
