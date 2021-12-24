import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (!product) {
      return;
    }
    let prod = this.cartItems.find(item => item.product.id === product.id);
    if (prod) {
      prod.count++;
    } else {
      prod = {product, count: 1};
      this.cartItems.push(prod);
    }
    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let productIndex = this.cartItems.findIndex(item => item.product.id === productId);
    if (productIndex > -1) {
      this.cartItems[productIndex].count += amount;
      if (this.cartItems[productIndex].count === 0) {
        this.cartItems.splice(productIndex, 1);
      }
    }
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return !this.cartItems.length;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let sum = 0;
    for (const card of this.cartItems) {
      sum += card.count;
    }
    return sum;
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let sum = 0;
    for (const card of this.cartItems) {
      sum += card.product.price * card.count;
    }
    return sum;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    let modalBody = document.createElement('div');

    for (const cartElement of this.cartItems) {
      modalBody.append(this.renderProduct(cartElement.product, cartElement.count));
    }
    modalBody.append(this.renderOrderForm());
    this.modal.setBody(modalBody);
    this.modal.open();

    modalBody.addEventListener('click', (event) => {
      let button = event.target.closest('button');
      if (button) {
        if (button.classList.contains('cart-counter__button_plus')) {
          let productId = event.target.closest('.cart-product').dataset.productId;
          this.updateProductCount(productId, 1);
        }
        if (button.classList.contains('cart-counter__button_minus')) {
          let productId = event.target.closest('.cart-product').dataset.productId;
          this.updateProductCount(productId, -1);
        }
      }
    });
    modalBody.querySelector('.cart-form')
      .addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    let winModel = document.body.classList.contains('is-modal-open');
    if (winModel) {
      for (const item of cartItem) {
        let productCount = document.querySelector(`[data-product-id="${item.product.id}"] .cart-counter__count`);
        let productPrice = document.querySelector(`[data-product-id="${item.product.id}"] .cart-product__price`);
        productCount.textContent = item.count;
        productPrice.textContent = `€${(item.product.price * item.count).toFixed(2)}`;
      }
      let infoPrice = document.querySelector(`.cart-buttons__info-price`);
      infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    }
    if (cartItem.length === 0) {
      this.modal.close();
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
    event.preventDefault();
    document.querySelector('button[type="submit"]')
      .classList.add('is-loading');
    const formData = new FormData(document.querySelector('.cart-form'));

    fetch(`https://httpbin.org/post`, {
      method: 'POST',
      body: formData,
    });
    this.modal.setTitle('Success!');
    this.cartItems = [];
    this.cartIcon.update(this);

    document.querySelector('.modal__body')
      .innerHTML = `<div class="modal__body-inner">
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
</div>`;
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

