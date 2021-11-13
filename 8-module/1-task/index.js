import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    // ваш код ...
    let elemClientRect = this.elem.getBoundingClientRect();
    let WinWidth = document.documentElement.clientWidth;
    let elemWidth = this.elem.offsetWidth;

    if (!elemWidth) {
      return;
    }

    if (!this.PotPos) {
      this.PotPos = elemClientRect.top;
    }

    if (this.PotPos < window.pageYOffset && WinWidth > 767) {
      this.elem.style.zIndex = 100;
      this.elem.style.position = 'fixed';
      let pointL = document.querySelector('.container').getBoundingClientRect().right + 20;

      if ((WinWidth - pointL - elemWidth) < 10) {
        this.elem.style.left = (WinWidth - elemWidth - 10) + 'px';
      } else {
        this.elem.style.left = pointL + 'px';
      }

    } else {
      this.elem.style.cssText = '';
    }
  }
}
