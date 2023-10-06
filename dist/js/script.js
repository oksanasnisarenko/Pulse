$(document).ready(function(){
  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });    
  


  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass
        ('catalog__content_active').eq($(this).index()).addClass
        ('catalog__content_active');
  });

 function toggleClass(item) {
  $(item).each(function(i){
    $(this).on('click', function(e){
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); 
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

    });
  });
 }
   
 toggleClass('.catalog-item__link');
 toggleClass('.catalog-item__back');
  
 // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultstion, #thanks, #order').fadeOut('slow');
    });
   

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow'); 
        });
    });


   // Forms

    function validateForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Введите {0} символа")   // 0 в дужках оставляти завжди
          },
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты"
          }
        }
      });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    
    $('input[name=phone]').mask("(999) 999-99-99");
  

// відправка письма 

    $('form').submit(function(e){           //коли форма виконалась, пройшла валідацію
       e.preventDefault();                // відміна перезагрузки браузера

      if(!$(this).valid()) {         // щоб не відправлялася пуста форма
        return;
      }

       $.ajax({                            // відправлення даних на сервер
           type: "POST",                      // відправлення
           url: "mailer/smart.php",                                // який обробник буде виконувати дану операцію
           data: $(this).serialize()                                      // ті дані які хочемо відправити
       }).done(function(){
           $(this).find("input").val("");   //післи виконання встановлюємо пусту строчку, в полі вводу
           
           $('#consultation, #order').fadeOut();
           $('.overlay, #thanks').fadeIn('slow');

           $('form').trigger('reset');  // всі форми повинні очиститися
       });  
       return false;                                 
    });   

    // Smooth scroll and pageup

    $(window).scroll(function(){
        if($(this).scrollTop()>1600) {
           $('.pageup').fadeIn();
        } else {
           $('.pageup').fadeOut();
        };
    });

    $("a[href='#up']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });


  new WOW().init();

});

  