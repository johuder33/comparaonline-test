const chai = require('chai');
const { expect } = chai;
// import CarInsurance class
const CarInsurance = require('../classes/CarInsurance');
const Product = require('../classes/Product');

describe('Suite Tests CarInsurance', () => {
    it('should instance a valid CarInsurance', () => {
        const Car = new CarInsurance([]);
        expect(Car).to.be.an.instanceof(CarInsurance);
    });

    it('should return array of products', () => {
        const ProductsAtZeroDay = [
            new Product('Low Coverage', 10, 10),
            new Product('Full Coverage', 13, 41),
            new Product('Special Full Coverage', 5, 16),
            new Product('Mega Coverage', 25, 45),
            new Product('Super Sale', 15, 20)
        ];

        const Car = new CarInsurance(ProductsAtZeroDay);
        expect(Car.products).to.have.deep.members(ProductsAtZeroDay);
    });

    it('should iterate over array of products and products need to be updated', () => {
        const ProductsAtZeroDay = [
            new Product('Low Coverage', 10, 10),
            new Product('Full Coverage', 13, 41),
            new Product('Special Full Coverage', 5, 16),
            new Product('Mega Coverage', 25, 45),
            new Product('Super Sale', 15, 20)
        ];

        const Car = new CarInsurance(ProductsAtZeroDay);

        for(var i = 1; i <= 30; i++) {
            Car.updatePrice();
        }

        expect(Car.products).to.have.deep.members(ProductsAtZeroDay);
        expect(Car.products[0].name).to.equal('Low Coverage');
        expect(Car.products[0].sellIn).to.equal(-20);
        expect(Car.products[0].price).to.equal(0);

        expect(Car.products[1].name).to.equal('Full Coverage');
        expect(Car.products[1].sellIn).to.equal(-17);
        expect(Car.products[1].price).to.equal(50);

        expect(Car.products[2].name).to.equal('Special Full Coverage');
        expect(Car.products[2].sellIn).to.equal(-25);
        expect(Car.products[2].price).to.equal(0);

        expect(Car.products[3].name).to.equal('Mega Coverage');
        expect(Car.products[3].sellIn).to.equal(25);
        expect(Car.products[3].price).to.equal(50);

        expect(Car.products[4].name).to.equal('Super Sale');
        expect(Car.products[4].sellIn).to.equal(-15);
        expect(Car.products[4].price).to.equal(0);
    });
})