import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.render();
    this.sliderSteps = this.Slider.querySelectorAll('.slider__steps span');
    this.addEvent();
    this.move(value);
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
    this.Slider.querySelector('.slider__steps span').classList.add('slider__step-active');
  }

  addEvent() {
    this.Slider.addEventListener('click', (event) => {
      let section = this.select(event);
      this.move(section);
      this.Slider.dispatchEvent(new CustomEvent('slider-change', {detail: section, bubbles: true}));
    });
  }

  select(event) {
    const mouse = event.clientX;
    let section;
    let numberLittleSection = (this.sliderSteps.length - 1) * 2;
    let xFirst, xLast, delta;
    xFirst = this.sliderSteps[0].getBoundingClientRect().x;
    xLast = this.sliderSteps[this.sliderSteps.length - 1].getBoundingClientRect().x;
    delta = (xLast - xFirst) / numberLittleSection;

    for (let i = 0; i < this.sliderSteps.length; i++) {
      let point = this.sliderSteps[i].getBoundingClientRect().x;
      if (mouse > point - delta && mouse < point + delta) {
        section = i;
      }
    }
    return section;
  }

  move(section) {
    this.query('value').textContent = section;
    const active = this.query('step-active');
    if (active) {
      active.classList.remove('slider__step-active');
    }
    this.sliderSteps[section].classList.add('slider__step-active');
    let leftPercents = section / (this.sliderSteps.length - 1) * 100;
    this.query('thumb').style.left = `${leftPercents}%`;
    this.query('progress').style.width = `${leftPercents}%`;
  }

  query(str) {
    return this.Slider.querySelector(`.slider__${str}`);
  }

  get elem() {
    return this.Slider;
  }
}
