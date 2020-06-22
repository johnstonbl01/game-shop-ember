import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ProductDetailController extends Controller {
  @service('cart') cartService;

  get gameTimeString() {
    return this.model.product.gameTimeHours === '1' ? 'hour' : 'hours';
  }
}
