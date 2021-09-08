import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    console.log('количество карточек ' + this.slides.length);

    const carousel = document.createElement('div');
    carousel.classList.add('carousel');

    const arrowR = createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
    `);
    const arrowL = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `);
    carousel.append(arrowR); // добавление стрелок в документ
    carousel.append(arrowL);

    const carousel__inner = document.createElement('div');
    carousel__inner.classList.add("carousel__inner");

    // отрисовка слайдов
    for (const slide of slides) {
      const elemCarousel = createElement(`
          <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
      carousel__inner.append(elemCarousel);

    }

    carousel.append(carousel__inner); // Добавление слайдов в документ

    //прячу все слайды кроме первого[0]
    let allSlides = carousel.querySelectorAll('.carousel__slide');
    for (let i = 1; i < allSlides.length; i++) {
      allSlides[i].hidden = true;
    }

    // события для стрелок
    let clickRight = carousel.querySelector('.carousel__arrow_right');
    let clickLeft = carousel.querySelector('.carousel__arrow_left');
    clickRight.addEventListener('click', actRight);
    clickLeft.addEventListener('click', actLeft);
    clickLeft.style.display = 'none';

    let poz = 0;

    function actRight() {
      allSlides[poz].hidden = true;
      poz++;
      allSlides[poz].hidden = false;

      if (poz === 3) {
        clickRight.style.display = 'none';
      }
      if (poz !== 0) {
        clickLeft.style.display = '';
      }
    }

    function actLeft() {
      allSlides[poz].hidden = true;
      poz--;
      allSlides[poz].hidden = false;

      if (poz === 0) {
        clickLeft.style.display = 'none';
      }
      if (poz !== 3) {
        clickRight.style.display = '';
      }
    }

    // событие, добавление товара в корзину
    const button = carousel.querySelector('.carousel__inner');
    button.addEventListener('click', choice);

    function choice() {
      if (event.target.closest('button')) {
        const id = (event.target.closest('.carousel__slide')).dataset.id;

        let ev = new CustomEvent("product-add", {
          detail: id,
          bubbles: true
        });
        button.dispatchEvent(ev);

      }
    }

    this._elem = carousel;
  }

  get elem() {
    return this._elem;
  }
}
