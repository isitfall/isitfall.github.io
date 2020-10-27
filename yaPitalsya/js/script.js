'use strict'

document.addEventListener('DOMContentLoaded', ()=>{

//main slider
function showThisShit() {
  const slides = document.querySelectorAll('.main__slider-content'),
        prev = document.querySelector('.main__slider-btns_prev'),
        next = document.querySelector('.main__slider-btns_next');
  let slideIndex = 1;
  
  
  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1
    } else if (n < 1) {
      slideIndex = slides.length
    }   
    
    slides.forEach(item => {
      item.style.display = 'none' ;
      item.classList.remove('fadeIn');
      //це костыль можно прописать норм функцию, но чет влом
      if (item.innerHTML.length > 41) {
        item.style.fontSize = '30px'
      }     
    });

    slides[slideIndex-1].style.display = 'block';
    slides[slideIndex-1].classList.add('fadeIn');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });

  next.addEventListener('click', () => {
    plusSlides(1)
  });

  showSlides(slideIndex);

}

//review slider

  function showReviewsSlides({transition}) {
    const slides  = document.querySelectorAll('.reviews__carousel__item'),
          prev = document.querySelector('.reviews__carousel__btns_prev'),
          next = document.querySelector('.reviews__carousel__btns_next'),
          slidesWrapper = document.querySelector('.reviews__carousel__wrapper'),
          width = window.getComputedStyle(slidesWrapper).width,          
          slidesField = document.querySelector('.reviews__carousel__content'); 


    let offset = 0;

    function installPresets(n = slides.length) {
      slidesField.style.cssText =   `width: ${100*n}%;
                                    display: flex;
                                    flex-direction: row;
                                    transition: ${transition}s all`
      slidesWrapper.style.overflow = 'hidden';

      slides.forEach(slides => {
        slides.style.width = width;
      });

    }
    //Next btn func
    function scrollPrev() {
      if (offset == parseInt(width)*(slides.length - 1)) {
        offset = 0;
      } else {
        offset += parseInt(width)
      }

      slidesField.style.transform = `translateX(-${offset}px)`;
    }

    //Next btn func
    function scrollNext() {
      if (offset == 0) {
        offset = parseInt(width)*(slides.length - 1);
      } else {
        offset -= parseInt(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;
    }
    
    installPresets();

    //вешаем обработчики
    next.addEventListener('click', scrollPrev);
    prev.addEventListener('click', scrollNext);
  }

  //modals .news stupidest realisation
  function showModals() {
    const modals = $('.news__catalog-item__wrapper'),
          img = $('.news__catalog-item__img'),
          linkIn = $('.news__catalog-item__link_in'),
          linkBack = $('.news__catalog-item__link_back');

    //desktop

    function moveSlideIn(item = linkIn) {     
      item.each(function (i) {
          $(this).on('click', function (e) {            
              e.preventDefault();
              modals.eq(i).addClass('news__catalog-item__wrapper_active');
              img.eq(i).addClass('news__catalog-item__img_hide');
          });
      });
    }

    function moveSlideBack(item = linkBack) {     
      item.each(function (i) {
          $(this).on('click', function (e) {   
              // modals.removeClass('news__catalog-item__wrapper_active');              
              e.preventDefault();
              modals.eq(i).removeClass('news__catalog-item__wrapper_active');
              img.eq(i).removeClass('news__catalog-item__img_hide');
          });
      });
    }

    
    moveSlideIn();
    moveSlideBack();    

  }

  //news catalog

  function showMoreNews() {

    //для десктопа
    const link = $('.news__header__link'),
          window = $('.news__catalog');

          link.each(function () {
            $(this).on('click', e => {
              e.preventDefault();
              link.toggleClass('news__header__link_active');
              window.toggleClass('news__catalog_active');
            });
          });       
          
  }

  //HARDCORE SLIDER

  function showHardcoreSlides({transition}) {
    const slides = $('.gallery__carousel__item'),
          slidesField = $('.gallery__carousel__content'),
          btnPrev = $('.gallery__btns_prev'),
          btnNext = $('.gallery__btns_next');        

                   

    function installPresets(n = slides.length) {
      slidesField[0].style.cssText =   `width: ${33*n}%;
                                    display: flex;
                                    flex-direction: row;
                                    transition: ${transition}s all`
      if ($(window).width() < 576) {
        slidesField[0].style.cssText =   `width: ${54*n}%;
                                          transform: translateX(-19%)`
      }
      //убираем класс активности со всех элементов
      slides.each( function() {            
        $(this).removeClass('gallery__carousel__item_active');        
      });

      //добавляем класс активности центральному элементу
      $('.gallery__carousel__item:eq(1)').toggleClass('gallery__carousel__item_active');    

    }    



    //лучше выколоть глаза или смотреть на сварку,
    //чем пытаться понять, что делает эта жесть 

      function replaceFirstToLast({time = transition, arr = $('.gallery__carousel__item')}) {
        const first = arr[0];  

            $('.gallery__carousel__item').each(function () {             
              $(this).css({'transform':'translateX(-100%)', 'transition':`${time}s all`});
            });


            $('.gallery__carousel__item:eq(1)').toggleClass('gallery__carousel__item_active');

            setTimeout(() => {
              first.remove();

              $('.gallery__carousel__item').each(function () {
                $(this).css("transform", "translateX(0)");
              });
              $('.gallery__carousel__content').append(first);
              $('.gallery__carousel__item:eq(2)').css({'transform':'translateX(100%)'});

              setTimeout(() =>{
                $('.gallery__carousel__item:eq(2)').css({'transform':'translateX(0)', 'transition':`${time}s all`});
              }, time*200);
              setTimeout(() =>{
                $('.gallery__carousel__item:eq(1)').toggleClass('gallery__carousel__item_active')
                .css({'transform':'scale(1.8, 1.5)', 'transition':`${time}s all`});
              }, time);
            }, time);       
      }

      function replaceLastToFirst({time = transition, arr = $('.gallery__carousel__item')}) {
        const last = arr[arr.length - 1];  

        $('.gallery__carousel__item').each(function () {
          $(this).css({'transform':'translateX(100%)', 'transition':`${time}s all`});
        });


        $('.gallery__carousel__item:eq(1)').toggleClass('gallery__carousel__item_active');

        setTimeout(() => {
          last.remove();

          $('.gallery__carousel__item').each(function () {
            $(this).css("transform", "translateX(0)");
          });
          $('.gallery__carousel__content').prepend(last);
          $('.gallery__carousel__item:eq(0)').css({'transform':'translateX(-100%)'});
          setTimeout(() =>{
            $('.gallery__carousel__item:eq(0)').css({'transform':'translateX(0)', 'transition':`${time}s all`});
          }, time*200);
          setTimeout(() =>{
            $('.gallery__carousel__item:eq(1)').toggleClass('gallery__carousel__item_active')
            .css({'transform':'scale(1.8, 1.5)', 'transition':`${time}s all`});
          }, time);
        }, time);     
  
      }

      
      
      installPresets();
      btnNext.on('click', replaceFirstToLast);
      btnPrev.on('click', replaceLastToFirst);
  }


  function menuActiveElements() {
    const linksParents = document.querySelectorAll('.header__nav__item');
   
    
    //удаление класса активности
    function deleteActiveClass(item = linksParents) {
      item.forEach(elem => {
        elem.classList.remove('header__nav__item_active');
      });
    }   
    
    //сразу же очистим класс активности
    deleteActiveClass();

    //добавим класс активности на первый элемент,
    //чтобы при старте страницы позиция отображалась

    linksParents[0].classList.add('header__nav__item_active');

    //прокручивай собака
    function scrollingTo(eventTarget) {

      const blockID = eventTarget.getAttribute('href').substr(1); //из таргета получаем idName

      document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
      })
    }

      //вешаем обработчик
      linksParents.forEach(elem => {          
          elem.addEventListener('click', (e) => {
            if (e.target && e.target.tagName == "A") { //тут делегирование событий
              e.preventDefault(); 
              deleteActiveClass(); //удаляем класс активности всех элементов              
              elem.classList.toggle('header__nav__item_active'); //ну тут совсем для дибилов непонятно
              scrollingTo(e.target);
            }                    
          }); 
      });          
  }

  //mobile menu
  function showMobileMenu() {
    const hamburger = document.querySelector('.mobile__hamburger'),
          hamburgerItem = document.querySelectorAll('.mobile__hamburger__item'),
          menu = document.querySelector('.header'),
          menuItem = document.querySelectorAll('.header__nav__item');


          function changeMobileClasses () {
            //сделаем span в виде крестика
            hamburgerItem.forEach(item => {
              item.classList.toggle('mobile__hamburger__item_active');
            });
            //меняем класс активности меню
            menu.classList.toggle('header__mobile'); 
            menu.cssText = 'transition: 0.5s all';
            
          }

          hamburger.addEventListener('click', changeMobileClasses);

          //скрываем меню при клике на ссылку
          menuItem.forEach(elem => {
            elem.addEventListener('click',changeMobileClasses);
          });

  }


  menuActiveElements(); //для гамбургера
  showMobileMenu();
  showMoreNews();   //разворачивает новостную ленту
  showModals();     //показывает контент в новостных окошках

  showThisShit();   //первый слайдер
  showHardcoreSlides({
    transition: 0.5
  }); //второй слайдер
  showReviewsSlides({  //третий слайдер
    transition: 0.8
  });
}); 
