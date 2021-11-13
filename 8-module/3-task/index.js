export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
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
    // ваш код
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
    // ваш код
    return !this.cartItems.length;
  }

  getTotalCount() {
    // ваш код
    let sum = 0;
    for (const card of this.cartItems) {
      sum += card.count;
    }
    return sum;
  }

  getTotalPrice() {
    // ваш код
    let sum = 0;
    for (const card of this.cartItems) {
      sum += card.product.price * card.count;
    }
    return sum;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

