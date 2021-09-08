import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.poz = 0;
    this.render();
    this.addEvent();
  }

  render() {
    this.carousel = createElement(`
<div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
      </div>
</div>
    `);

    // отрисовка слайдов
    for (const slide of this.slides) {
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
      this.query('inner').append(elemCarousel);

    }
    this.recreate();
  } // конец render

  addEvent() {
    this.carousel.onclick = ({target}) => {
      if (target.closest('.carousel__button')) {
        let ID = target.closest('[data-id]').dataset.id;
        let ev = new CustomEvent("product-add", {
          detail: ID,
          bubbles: true,
        });
        this.carousel.dispatchEvent(ev);
      }

      if (target.closest('.carousel__arrow_right')) {
        this.poz++;
        this.recreate();
      }

      if (target.closest('.carousel__arrow_left')) {
        this.poz--;
        this.recreate();
      }
    };
  }

  recreate() {
    let offset = -this.carousel.offsetWidth * this.poz;
    let aa = this.carousel.querySelector('.carousel__inner');
    aa.style.transform = `translateX(${offset}px)`;
    if (this.poz == this.slides.length - 1) {
      this.query('arrow_right').style.display = 'none';
    } else {
      this.query('arrow_right').style.display = '';
    }

    if (this.poz == 0) {
      this.query('arrow_left').style.display = 'none';
    } else {
      this.query('arrow_left').style.display = '';
    }
  }

  query(str) {
    return this.carousel.querySelector(`.carousel__${str}`);
  }

  get elem() {
    return this.carousel;
  }
}
