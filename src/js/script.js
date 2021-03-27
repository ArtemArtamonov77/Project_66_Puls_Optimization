/* $(document).ready(function() - все скрипты будут выполняться только когда будет загружена вся страница в браузер со всеми элементами и т.п. */
$(document).ready(function(){
    
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');

  });
  /* Slick слайдер */

/* $(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"> </button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"> </button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                  dots: true
                }
            }   
        ]   
      });
  }); */

  /* Tiny-slider */
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    /* responsive: {
      640: {
        edgePadding: 20,
        gutter: 20,
        items: 1
      },
      700: {
        gutter: 30
      },
      900: {
        items: 1,
        fixedWidth: 1000
      }
    }, */
    controlsText: [
        '<img src="icons/left.svg">',
        '<img src="icons/right.svg">'
    ]
  });
  document.querySelector('.prev').addEventListener('click', function () {
      slider.goTo('prev');
    });
  document.querySelector('.next').addEventListener('click', function () {
      slider.goTo('next');
  });
/* скрипт работы табов */
/* $(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  }
}; */
/* для ссылки "ПОДРОБНЕЕ" */
/*   $('.catalog-item__link').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
  }); */
/* для ссылки "НАЗАД" */
/*   $('.catalog-item__back').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
  }); */
/* Функция для работы кнопок "Подробнее" и "НАЗАД" */
  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();/* отменяет стандартное поведение браузера при клике на ссылку */
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };
  toggleSlide('.catalog-item__link');/* для ссылки "ПОДРОБНЕЕ" */
  toggleSlide('.catalog-item__back');/* для ссылки "НАЗАД" */
  
  // Модальные окна
  /* $('[data-modal=consultation]').fadeOut(); *//*fadeOut() - команда jqwery которая красиво скрывает какие либо элементы  */
  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');/* показываем оверлей и модальное окно*/
  });
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');/*по нажатию на крестик скрываем оверлей и модальные окна*/
  });

  /* Скрипт замены modal_descr описания модального окна в зависимости от выбранной карточки */
  /* each - перебор кнопок */
  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');/*открываем модальное окно по нажатию кнопки в карточках каталога */
    })
  });
  /* Валидация форм https://jqueryvalidation.org/ */


  function validateForms(form){
    $(form).validate({
      rules: { 
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста введите своё имя",
        phone: "Пожалуйста введите свой номер телефона",
        email: {
          required: "Пожалуйста введите свой почтовый адрес",
          email: "Неправильно введён адрес почты"
        }
      }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-99-99") /* Маска ввода */

  /* Работа форм e - ивент, prevenrDefault отменяем действие браузера по умолчанию - после нажатия на отправку  страница перезагружается, теперь не будет перезагружаться */
  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST", /* post тип отправка */
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");/*очистит инпуты после отправки */
      $('#consultation, #order').fadeOut();/* после отправки закроет модальное окно */
      $('.overlay, #thanks').fadeIn('slow');/* после отправки откроет оверлей и окно thanks */
      $('form').trigger('reset'); /* форма очистится  */
    });
    return false;
  });

  // работа стрелки возврата в начало сайта, плавность
  $(window).scroll(function() {
    if ($(this).scrollTop()>1600) {
        $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });
  /* плавный скролл по нажатию стрелки вверх (также на jquery) */
  $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
  /* анимация WOW блока отзывы */
  new WOW().init();
});


