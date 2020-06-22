import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service('product') productService;

  beforeModel() {
    if (!this.productService.products) {
      this.transitionTo('home');
    }
  }

  model(params) {
    return {
      product: this.productService.products.find((prod) => prod.id === params.id)
    };
  }
}
