const chai = require('chai');
const { expect } = chai;
// import Product class
const Product = require('../classes/Product');

describe('Suite Tests Product', () => {
    let ProductInstance;
    const productName = 'Super Sale';
    const productSellIn = 5;
    const productPrice = 20;

    beforeEach(() => {
        ProductInstance = new Product(productName, productSellIn, productPrice);
    });

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

    it('should return true if the name is the same', () => {
        expect(ProductInstance._hasNameEqualTo(productName)).to.be.true;
    });

    it('should return false if the name is different from the instance', () => {
        expect(ProductInstance._hasNameEqualTo('Non Product')).to.be.false;
    });

    it('should return true if the has positive price', () => {
        expect(ProductInstance._hasPositivePrice()).to.be.true;
    });

    it('should return false if not has positive price', () => {
        // force price to be 0
        ProductInstance.price = 0;
        expect(ProductInstance._hasPositivePrice()).to.be.false;
    });

    it('should return maximun price as a 50', () => {
        expect(ProductInstance.getLimitPrice).to.equal(50);
    });

    it('should return true if price is less thant pass argument given', () => {
        expect(ProductInstance._hasPriceNotGreatherThan(ProductInstance.getLimitPrice)).to.be.true;
    });

    it('should return false if price is not less thant pass argument given', () => {
        // force price to be 51
        ProductInstance.price = 51;
        expect(ProductInstance._hasPriceNotGreatherThan(ProductInstance.getLimitPrice)).to.be.false;
    });

    it('should return true if sellIn days is less than argument given', () => {
        expect(ProductInstance._sellInDayIsLessThan(10)).to.be.true;
    });

    it('should return false if sellIn days is not less than argument given', () => {
        expect(ProductInstance._sellInDayIsLessThan(4)).to.be.false;
    });
    
    it('should return the remain number to reach the maximun price per product', () => {
        // as price is 20 and maximun price is 50
        // so if we pass 35 it will result as 55 price, so that it's incorrect
        // so this function will return just 30 price that is the remain value to reach to maximun value
        expect(ProductInstance._checkBoundariesPrices(35)).to.equal(30);
        expect(ProductInstance._checkBoundariesPrices(45)).to.equal(30);
        ProductInstance.price = 49;
        expect(ProductInstance._checkBoundariesPrices(45)).to.equal(1);
        ProductInstance.price = 1;
        expect(ProductInstance._checkBoundariesPrices(45)).to.equal(45);
    });

    it('should add 3 points to price product', () => {
        ProductInstance.updatePriceIn(3);
        expect(ProductInstance.price).to.equal(23);
    });

    it('should sustract 5 points to price product', () => {
        ProductInstance.updatePriceIn(-5);
        expect(ProductInstance.price).to.equal(15);
    });

    it('should decrement price x2 points', () => {
        ProductInstance._decresePriceBy2();
        expect(ProductInstance.price).to.equal(18);
    });

    it('should decrese sellIn day by 1', () => {
        ProductInstance._decreseSellDay();
        expect(ProductInstance.sellIn).to.equal(4);
        ProductInstance._decreseSellDay();
        expect(ProductInstance.sellIn).to.equal(3);
    });

    it('should return true is sellIn days has been expired', () => {
        ProductInstance.sellIn = 0;
        expect(ProductInstance._hasExpiredDaysToSell()).to.be.true;
    });

    it('should return false is sellIn days has not been expired', () => {
        expect(ProductInstance._hasExpiredDaysToSell()).to.be.false;
    });

    it('should set specific price for product', () => {
        ProductInstance._setPriceTo(3);
        expect(ProductInstance.price).to.equal(3);
    });
})