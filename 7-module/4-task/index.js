import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.render();
    this.addEvent();
    this.start(value);
  }

  render() {
    this.Slider = createElement(`
<div class="slider">
  <div class="slider__thumb">
    <span class="slider__value"></span>
  </div>
  <div class="slider__progress"></div>
  <div class="slider__steps">
    ${'<span></span>'.repeat(this.steps)}
  </div>
</div>
    `);
  }

  addEvent() {
    this.Slider.ondragstart = () => false;
    this.Slider.addEventListener('click', this.onClick);
    this.query('thumb').addEventListener('pointerdown', () => {
      this.Slider.classList.add('slider_dragging');
      document.addEventListener('pointermove', this.onMove);
      document.addEventListener('pointerup', this.onUp);
    });
  }

  onClick = (event) => {
    this.start(this.position(this.rate(event)));
    this.Slider.dispatchEvent(new CustomEvent('slider-change', {detail: this.value, bubbles: true}));
  };

  start = (value) => {
    this.sliderSteps = this.Slider.querySelectorAll('.slider__steps span');
    this.value = value;
    this.segment = this.steps - 1;

    const active = this.query('step-active');
    if (active) {
      active.classList.remove('slider__step-active');
    }
    this.sliderSteps[value].classList.add('slider__step-active');

    let percent = (value / this.segment) * 100;
    this.query('thumb').style.left = `${percent}%`;
    this.query('progress').style.width = `${percent}%`;
    this.query('value').textContent = value;
  };

  onMove = (event) => {
    event.preventDefault();
    let rate = this.rate(event);
    this.value = this.position(rate);
    this.query('thumb').style.left = `${rate * 100}%`;
    this.query('progress').style.width = `${rate * 100}%`;
    this.query('value').textContent = this.value;

    const active = this.query('step-active');
    if (active) {
      active.classList.remove('slider__step-active');
    }
    this.sliderSteps[this.value].classList.add('slider__step-active');
  };

  onUp = (event) => {
    event.preventDefault();
    this.start(this.position(this.rate(event)));
    this.Slider.classList.remove('slider_dragging');

    this.Slider.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
    document.removeEventListener('pointermove', this.onMove);
    document.removeEventListener('pointerup', this.onUp);
  };

  position(rate) {
    let point = Math.round(rate * this.segment);
    return point;
  }

  rate = (event) => {
    let res = (event.clientX - this.Slider.getBoundingClientRect().x) / this.Slider.offsetWidth;
    res = (res < 0) ? 0 : res;
    res = (res > 1) ? 1 : res;
    return res;
  };

  query(str) {
    return this.Slider.querySelector(`.slider__${str}`);
  }

  get elem() {
    return this.Slider;
  }
}
