$(function () {
  $(".top__slider").slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
  });

  $(".article-slider__items").slick({
    dots: false,
    arrows: true,
    prevArrow:
      '<button type="button" class="slick-arrow slick-prev"><img src="img/arrow-left.svg" alt="prev"></button>',
    nextArrow:
      '<button type="button" class="slick-arrow slick-next"><img src="img/arrow-right.svg" alt="next"></button>',
  });

  $(".contact-slider__inner").slick({
    slidesToShow: 10,
    slidesToScroll: 10,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1511,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },

      {
        breakpoint: 1201,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 851,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 551,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 376,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".rightside-menu__closebtn").on("click", function () {
    $(".rightside-menu").addClass("rightside-menu--close");
  });

  $(".header__btn-menu").on("click", function () {
    $(".menu").toggleClass("menu--open");
  });

  $(".header__btn").on("click", function (event) {
    event.stopPropagation(); // Предотвращает всплытие
    $(".rightside-menu").css("transform", "translateX(0%)"); // Показываем меню
  });

  $(".rightside-menu__closebtn").on("click", function () {
    $(".rightside-menu").css("transform", "translateX(100%)"); // Скрываем меню
  });

  var mixer = mixitup(".gallery__inner", {
    load: {
      filter: ".living",
    },
  });

  $(".article-slider__items").slick({
    prevArrow:
      '<button type="button" class="slick-arrow slick-prev"><img src="img/arrow-left.svg" alt="prev"></button>',
    nextArrow:
      '<button type="button" class="slick-arrow slick-next"><img src="img/arrow-right.svg" alt="next"></button>',
    dots: false,
    arrows: true,
  });

  $(".about-section__popup-play").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  $(".blog__popup-play").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  // var mixer = mixitup('.container');

  // $("[data-fancybox]").fancybox();

  // $("#rateYo").rateYo();

  // $(".js-range-slider").ionRangeSlider();
});

document.querySelector(".about-section__prev").style.backgroundImage =
  'url("/img/about-prev-bg.jpg")';

document.querySelector(".about-section__popup").style.backgroundImage =
  'url("/img/about-popup-bg.jpg")';
