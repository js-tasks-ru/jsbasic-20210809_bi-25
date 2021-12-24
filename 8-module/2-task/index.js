import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this._elem = createElement(`
<div class="products-grid">
  <div class="products-grid__inner">
  </div>
</div>\``);
    this.cards();
  }

  cards() {
    let listCards = this._elem.querySelector('.products-grid__inner');
    listCards.innerHTML = '';

    for (const product of this.products) {

      if (this.filters.noNuts && product.nuts) {
        continue;
      }
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        continue;
      }
      if (this.filters.maxSpiciness !== undefined && this.filters.maxSpiciness < product.spiciness) {
        continue;
      }
      if (this.filters.category !== product.category && this.filters.category) {
        continue;
      }

      let newCard = new ProductCard(product);
      listCards.append(newCard.elem);
    }
  }


  updateFilter(filter) {
    Object.assign(this.filters, filter);
    this.cards();
  }

  get elem() {
    return this._elem;
  }
}
