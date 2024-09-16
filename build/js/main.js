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
