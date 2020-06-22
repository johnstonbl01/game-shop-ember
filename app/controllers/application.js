import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service('cart') cartService;

  @action
  onCheckoutClick() {
    this.cartService.setShowCart(false);
    this.transitionToRoute('checkout');
    this.cartService.updateCart([]);
  }
}
