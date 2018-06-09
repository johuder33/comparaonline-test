
/**
 * a Product class for manage its state and responsabilities
 *
 * @class Product
 * @argument {string} name product name
 * @argument {number} name days when sell be expired
 * @argument {number} price product price
 */
class Product {
    constructor(name, sellIn, price) {
      this.name = name;
      this.sellIn = sellIn;
      this.price = price;
    }
}

module.exports = Product;