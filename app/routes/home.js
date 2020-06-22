import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service('product') productService;

  async model() {
    const products = await this.productService.fetchProducts();

    return {
      searchValue: '',
      products,
      shopProducts: products.slice().sort((a, b) => b.rating - a.rating)
    };
  }
}
