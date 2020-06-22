import Service from '@ember/service';
import { action, set } from '@ember/object';

export default class CartService extends Service {
  showCart = false;
  cart = [];
  total = 0;

  @action
  updateCart(newCart) {
    set(this, 'cart', newCart);
  }

  @action
  addToCart(product) {
    const productIsInCart = this.cart.find((prod) => prod.id === product.id);

    if (!productIsInCart) {
      set(this, 'cart', [...this.cart, product]);
      set(this, 'total', this.calculateTotal(this.cart));
    }
  }

  @action
  setShowCart(bool) {
    set(this, 'showCart', bool);
  }

  calculateTotal(cart) {
    return cart.reduce((sum, product) => sum + parseFloat(product.price), 0).toFixed(2);
  }
}
