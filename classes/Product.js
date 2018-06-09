
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

	/**
	 * this will compare the current product name with given name
	 * @param {string} name name for current product
	 */
	_hasNameEqualTo(name) {
		return this.name === name;
	}

	/**
	 * get if current product price is positive
	 */
	_hasPositivePrice() {
		return this.price > 0;
	}

	/**
	 * A simple getter for maximun price per product
	 */
	get getLimitPrice() {
		return 50;
	}

	/**
	 * this function will tell us if price reach to the limit
	 * @param {number} amount the max number to be compared
	 */
	_hasPriceNotGreatherThan(amount) {
		return this.price < amount;
	}

	/**
	 * this function will tell us if the current sellIn is less thant given days
	 * @param {number} days number of days to compared our sellIn
	 */
	_sellInDayIsLessThan(days) {
		return this.sellIn < days;
	}

	/**
	 *This function will tell us if the next price is greather that our limit 
	* @see getLimitPrice
	* @param {*} nextPrice
	* @returns the normalize price of product
	* @memberof Product
	*/
	_checkBoundariesPrices(nextPrice) {
		let normalizePrice = nextPrice;
		if ((this.price + normalizePrice) > this.getLimitPrice) {
			normalizePrice = (this.price + normalizePrice) - this.getLimitPrice;
			normalizePrice = nextPrice - normalizePrice;
		}

		return normalizePrice;
	}

	/**
	 * Update the price with an specific operation
	 * eg: if -1 is given, so will sustract against current price
	 * eg: if 1 is given, so will add that number to the current price
	 *
	 * @param {*} amount next price for product
	 * @memberof Product
	 */
	updatePriceIn(amount) {
		const nextPrice = this._checkBoundariesPrices(amount);
		this.price = this.price + (nextPrice);
	}

	/**
	 * will decrese our price by x2 speed
	 *
	 * @returns
	 * @memberof Product
	 */
	_decresePriceBy2() {
		// only decrese our price in 2, when our price
		// is actually greather than 1.
		if (this.price > 1) {
			this.updatePriceIn(-2);
			return;
		}

		// decrese our price in just 1
		this.updatePriceIn(-1);
	}

	/**
	 * simply will decrese our sell in day
	 *
	 * @memberof Product
	 */
	_decreseSellDay() {
		this.sellIn -= 1;
	}

	/**
	 *will tell us that our sell days has been expired
	*
	* @returns
	* @memberof Product
	*/
	_hasExpiredDaysToSell() {
		return this.sellIn < 1;
	}

	/**
	 * will set a specific / mandatory price for product
	 *
	 * @param {*} nextPrice the next price
	 * @memberof Product
	 */
	_setPriceTo(price) {
		this.price = price;
	}

	/**
	 * a centralize function that will emit the prices updates for products
	 *
	 * @memberof Product
	 */
	updatePrice() {
		this.updateNormalProductsPrice();
		this.updateFullCoveragePrice();
		this.updateMegaCoveragePrice();
		this.updateSpecialCoveragePrice();
		this.updateSuperSalePrice();
	}

  	/**
	 * will update price only for normal products
	 *
	 * @memberof Product
	 */
	updateNormalProductsPrice() {
		if(this._hasPositivePrice() && this.isNormalProduct()) {
			const nextPrice = this._hasExpiredDaysToSell() ? -2 : -1;
			this.updatePriceIn(nextPrice);
		}
	}

	/**
	 * a simply helper that tell us that current product is just a normal product
	 *
	 * @returns {boolean} true / false
	 * @memberof Product
	 */
	isNormalProduct() {
		return [
		this.isFullCoverage(),
		this.isSpecialFullCoverage(),
		this.isMegaCoverage(),
		this.isSuperSale()
		].every((isNormalProduct) => !isNormalProduct);
	}
	
	/**
	 * will update price only for Super Sale products
	 *
	 * @memberof Product
	 */
	updateSuperSalePrice() {
		if(this._hasPositivePrice() && this.isSuperSale()) {
			this._decresePriceBy2();
		}
	}

	/**
	 * a simply helper that tell us that current product is Super Sale
	 *
	 * @returns {boolean} true / false
	 * @memberof Product
	 */
	isSuperSale() {
		return this._hasNameEqualTo('Super Sale');
	}

	/**
	 * will update price only for Special Coverage products
	 *
	 * @memberof Product
	 */
	updateSpecialCoveragePrice() {
		if (this.isSpecialFullCoverage()) {
		if (this._hasExpiredDaysToSell() && this._hasPositivePrice()) {
			this._setPriceTo(0);
		}

		if (!this._hasExpiredDaysToSell()) {
			let nextPrice = 1;

			if (this._sellInDayIsLessThan(11)) {
				nextPrice = this._sellInDayIsLessThan(6) ? 3 : 2;
			}

			if (this._sellInDayIsLessThan(1)) {
				return this._setPriceTo(0);
			}

			this.updatePriceIn(nextPrice);
		}
		}
	}

	/**
	 * a simply helper that tell us that current product is Special Full Coverage
	 *
	 * @returns {boolean} true / false
	 * @memberof Product
	 */
	isSpecialFullCoverage() {
		return this._hasNameEqualTo('Special Full Coverage');
	}

	/**
	 * will update price only for Mega Coverage products
	 *
	 * @memberof Product
	 */
	updateMegaCoveragePrice() {
		if (this.isMegaCoverage() && this._hasPriceNotGreatherThan(this.getLimitPrice)) {
			this.updatePriceIn(1);
		}
	}

	/**
	 * a simply helper that tell us that current product is Mega Coverage
	 *
	 * @returns {boolean} true / false
	 * @memberof Product
	 */
	isMegaCoverage() {
		return this._hasNameEqualTo('Mega Coverage');
	}

	/**
	 * will update price only for Full Coverage products
	 *
	 * @memberof Product
	 */
	updateFullCoveragePrice() {
		if(this.isFullCoverage() && this._hasPriceNotGreatherThan(this.getLimitPrice)) {
			const nextPrice = this._hasExpiredDaysToSell() ? 2 : 1;
			this.updatePriceIn(nextPrice);
		}
	}

	/**
	 * a simply helper that tell us that current product is full coverage
	 *
	 * @returns {boolean} true / false
	 * @memberof Product
	 */
	isFullCoverage() {
		return this._hasNameEqualTo('Full Coverage');
	}
}

module.exports = Product;