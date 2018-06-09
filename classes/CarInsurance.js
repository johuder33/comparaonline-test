/**
 * a CarInsurance class for manage all the products into car insurance
 *
 * @class CarInsurance
 * @argument {array} products array of Products instances
 */
class CarInsurance {
	constructor(products = []) {
		this.products = products;
	}
	
	/**
	 * Our new updatePrice function that will be called by each product when iterate them
	 *
	 * @returns
	 * @memberof CarInsurance
	 */
	updatePrice() {
		return this.products.map((product) => {
			product.updatePrice();
			product.updateSellInDays();
			return product;
		});
	}
}

module.exports = CarInsurance;