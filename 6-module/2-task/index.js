import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  constructor(product) {
    this.product = product;
    this._elem = createElement(`
<div class="card">
  <div class="card__top">
    <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
    <span class="card__price">€${this.product.price.toFixed(2)}</span>
  </div>
  <div class="card__body">
    <div class="card__title">${this.product.name}</div>
    <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>
`);
    const button = this._elem.querySelector('.card__button');
    button.addEventListener('click', choice);
    const id = this.product.id;

    function choice() {
      const myEvent = new CustomEvent("product-add", {
        detail: id,
        bubbles: true
      });
      button.dispatchEvent(myEvent);
    }
  }

  get elem() {
    return this._elem;
  }
}
