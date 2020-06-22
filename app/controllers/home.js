/* eslint-disable ember/use-brace-expansion */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @service('cart') cartService;
  @service('product') productService;

  @tracked isPopularListType = true;
  @tracked isNewestListType = false;
  @tracked inputIsFocused = false;

  @action
  onListTypeClick(listType) {
    if (!this.model.products || !listType) {
      return null;
    }

    if (listType === 'newest') {
      this.isNewestListType = true;
      this.isPopularListType = false;
    }

    if (listType === 'popular') {
      this.isPopularListType = true;
      this.isNewestListType = false;
    }

    return this.filterProductsByListType(listType);
  }

  @action
  onInputChange(evt) {
    const sortFn = this.isNewestListType ? (a, b) => b.published - a.published : this.sortByRating;
    const filteredProducts = this.model.products
      .slice()
      .filter(({ name }) => name.toLowerCase().includes(evt.target.value))
      .sort(sortFn);

    set(this.model, 'shopProducts', filteredProducts);
  }

  @action
  onInputFocus() {
    this.inputIsFocused = !this.inputIsFocused;
  }

  @action
  onInputSubmit(evt) {
    if (evt.key === 'Enter') {
      const inputEl = document.querySelector('input');

      if (inputEl) {
        inputEl.blur();
      }
    }
  }

  filterProductsByListType(listType) {
    const sortFn = listType === 'newest' ? (a, b) => b.published - a.published : this.sortByRating;

    set(this.model, 'shopProducts', this.model.products.slice().sort(sortFn));
  }

  sortByRating(a, b) {
    return b.rating - a.rating;
  }
}
