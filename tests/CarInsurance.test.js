const chai = require('chai');
const { expect } = chai;
// import CarInsurance class
const CarInsurance = require('../classes/CarInsurance');

describe('Suite Tests CarInsurance', () => {
    it('should instance a valid CarInsurance', () => {
        const Car = new CarInsurance([]);
        expect(Car).to.be.an.instanceof(CarInsurance);
    });
})