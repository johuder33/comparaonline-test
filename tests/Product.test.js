const chai = require('chai');
const { expect } = chai;
// import Product class
const Product = require('../classes/Product');

describe('Suite Tests Product', () => {
    let ProductInstance, fullCoverageProduct, megaProduct, specialProduct, superProduct;
    
    const productName = 'Lower Coverage';
    const productSellIn = 5;
    const productPrice = 20;

    const productFullCoverage = 'Full Coverage';
    const productFullCoverageSellIn = 3;
    const productFullCoveragePrice = 9;

    const productMega = 'Mega Coverage';
    const productMegaSellIn = 3;
    const productMegaPrice = 9;

    const productSpecial = 'Special Full Coverage';
    const productSpecialSellIn = 15;
    const productSpecialPrice = 10;

    const productSuperName = 'Super Sale';
    const productSuperSellIn = 8;
    const productSuperPrice = 9;

    beforeEach(() => {
        ProductInstance = new Product(productName, productSellIn, productPrice);
        fullCoverageProduct = new Product(productFullCoverage, productFullCoverageSellIn, productFullCoveragePrice);
        megaProduct = new Product(productMega, productMegaSellIn, productMegaPrice);
        specialProduct = new Product(productSpecial, productSpecialSellIn, productSpecialPrice);
        superProduct = new Product(productSuperName, productSuperSellIn, productSuperPrice);
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

    it('should update Full Coverage x2 when sell in days has been expired', () => {
        // force expired days
        fullCoverageProduct.sellIn = -1;
        fullCoverageProduct.updatePrice();
        expect(fullCoverageProduct.price).to.equal(productFullCoveragePrice + 2);
    });

    it('should not update full coverage more than maximun price', () => {
        // force price
        fullCoverageProduct.price = 50;
        fullCoverageProduct.updatePrice();
        fullCoverageProduct.updatePrice();
        fullCoverageProduct.updatePrice();
        fullCoverageProduct.updatePrice();
        expect(fullCoverageProduct.price).to.equal(50);
    });

    it('should not update mega coverage more than maximun price', () => {
        // force mega price 
        megaProduct.price = 49;
        megaProduct.updatePrice();
        megaProduct.updatePrice();
        megaProduct.updatePrice();
        expect(megaProduct.price).to.equal(50);
    });

    it('should not update mega price if greather than maximun price', () => {
        // force mega price 
        megaProduct.price = 51;
        megaProduct.updatePrice();
        megaProduct.updatePrice();
        megaProduct.updatePrice();
        megaProduct.updatePrice();
        megaProduct.updatePrice();
        expect(megaProduct.price).to.equal(51);
    });

    it('should update Special Full Coverage Product for x2 is sellIn days is less than 11 days', () => {
        // force sellIn days 
        specialProduct.sellIn = 10;
        specialProduct.updatePrice();
        expect(specialProduct.price).to.equal(productSpecialPrice + 2);
    });

    it('should update Special Full Coverage Product for x3 is sellIn days is less than 6 days', () => {
        // force sellIn days 
        specialProduct.sellIn = 5;
        specialProduct.updatePrice();
        expect(specialProduct.price).to.equal(productSpecialPrice + 3);
    });

    it('should update to zero (0) price when Special Full Coverage Product sellIn days is 0', () => {
        // force sellIn days 
        specialProduct.sellIn = 0;
        specialProduct.updatePrice();
        expect(specialProduct.price).to.equal(0);
    });

    it('should update x2 Super Sale Product', () => {
        superProduct.updatePrice();
        superProduct.updatePrice();
        expect(superProduct.price).to.equal(productSuperPrice - 4);
    });

    it('should set price zero (0) when next price is less than 1', () => {
        superProduct.updatePrice(); // 7
        superProduct.updatePrice(); // 5
        superProduct.updatePrice(); // 3
        superProduct.updatePrice(); // 1
        superProduct.updatePrice(); // 0
        superProduct.updatePrice(); // 0
        superProduct.updatePrice(); // 0
        expect(superProduct.price).to.equal(0);
    });

    it('should update price for normal products', () => {
        ProductInstance.updatePrice();
        expect(ProductInstance.price).to.equal(productPrice - 1);
        ProductInstance.updatePrice();
        expect(ProductInstance.price).to.equal(productPrice - 2);
    });

    it('should update price x2 when sellIn days has beed expired', () => {
        // force sellIn expired
        ProductInstance.sellIn = 0;
        ProductInstance.updatePrice();
        expect(ProductInstance.price).to.equal(productPrice - 2);
        ProductInstance.updatePrice();
        expect(ProductInstance.price).to.equal(productPrice - 4);
    });

    it('should decrese sellIn days for each product except Mega Coverage product', () => {
        ProductInstance.updateSellInDays();
        fullCoverageProduct.updateSellInDays();
        megaProduct.updateSellInDays();
        specialProduct.updateSellInDays();
        superProduct.updateSellInDays();
        
        expect(ProductInstance.sellIn).to.equal(productSellIn - 1);
        expect(fullCoverageProduct.sellIn).to.equal(productFullCoverageSellIn - 1);
        expect(megaProduct.sellIn).to.equal(productMegaSellIn);
        expect(specialProduct.sellIn).to.equal(productSpecialSellIn - 1);
        expect(superProduct.sellIn).to.equal(productSuperSellIn - 1);

        ProductInstance.updateSellInDays();
        fullCoverageProduct.updateSellInDays();
        megaProduct.updateSellInDays();
        specialProduct.updateSellInDays();
        superProduct.updateSellInDays();
        
        expect(ProductInstance.sellIn).to.equal(productSellIn - 2);
        expect(fullCoverageProduct.sellIn).to.equal(productFullCoverageSellIn - 2);
        expect(megaProduct.sellIn).to.equal(productMegaSellIn);
        expect(specialProduct.sellIn).to.equal(productSpecialSellIn - 2);
        expect(superProduct.sellIn).to.equal(productSuperSellIn - 2);
    });
})