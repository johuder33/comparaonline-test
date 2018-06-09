const chai = require('chai');
const { expect } = chai;
// import Product class
const Product = require('../classes/Product');

describe('Suite Tests Product', () => {
    it('should create a valid Product instance', () => {
        const name = 'My Product';
        const sellIn = 20;
        const price = 10;

        const product = new Product(name, sellIn, price);
        expect(product).to.be.an.instanceof(Product);
        expect(product.name).to.equal(name);
        expect(product.sellIn).to.equal(sellIn);
        expect(product.price).to.equal(price);
    });
})