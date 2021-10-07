import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEvent();
  }

  render() {
    this.RibbonMenu = createElement(`
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    <nav class="ribbon__inner"> </nav>
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
`);
    for (const item of this.categories) {
      const menu = createElement(`
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `);
      this.query('inner').append(menu);
    }
    this.query('item').classList.add('ribbon__item_active');
  } //конец render

  addEvent() {
    this.RibbonMenu.addEventListener('click', (event) => {
      let tar = event.target;
      if (tar.closest('.ribbon__arrow_left')) {
        this.moveLeft();
      }
      if (tar.closest('.ribbon__arrow_right')) {
        this.moveRight();
      }

      if (tar.closest('.ribbon__item')) {
        event.preventDefault();
        let active = this.query('item_active')
        if (active) {
          active.classList.remove('ribbon__item_active');
        }
        tar.classList.add('ribbon__item_active');

        // let ID = event.target.closest('[data-id]').dataset.id;
        let ID = tar.dataset.id;
        this.RibbonMenu.dispatchEvent(
          new CustomEvent('ribbon-select', {
            detail: ID,
            bubbles: true,
          })
        );
      }
    });

    this.query('inner').addEventListener('scroll', (event) => this.update(event));
  }

  moveLeft() {
    this.query('inner').scrollBy(-350, 0);
  }

  moveRight() {
    this.query('inner').scrollBy(350, 0);
  }

  update() {
    let arrowLeft = this.query('arrow_left');
    let arrowRight = this.query('arrow_right');

    if (this.scrollLeft() < 1) {
      arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (this.scrollRight() < 1) {
      arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      arrowRight.classList.add('ribbon__arrow_visible');
    }
  }

  scrollLeft() {
    return this.query('inner').scrollLeft;
  }

  scrollRight() {
    return this.query('inner').scrollWidth - (this.query('inner').scrollLeft + this.query('inner').clientWidth);
  }

  query(str) {
    return this.RibbonMenu.querySelector(`.ribbon__${str}`);
  }

  get elem() {
    return this.RibbonMenu;
  }

}
