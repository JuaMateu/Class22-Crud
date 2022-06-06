const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let visitedProducts = products.filter( prod => { 
			return prod.category == "visited" 
		})

		let inSaleProducts = products.filter(prod => { 
			return prod.category == "in-sale" 
		})

		return res.render("index", { visitedProducts : visitedProducts, inSaleProducts: inSaleProducts });
	
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
