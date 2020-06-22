import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ProductService extends Service {
  @tracked products;

  async fetchProducts() {
    if (this.products && this.products.length > 0) {
      return this.products;
    }

    const apiResult = await fetch(
      'https://qwbegxw1t8.execute-api.us-east-1.amazonaws.com/dev/games'
    );

    const games = await apiResult.json();
    this.products = games;
    return games;
  }
}
