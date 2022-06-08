const { privateDecrypt } = require('crypto');
const { redirect } = require('express/lib/response');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { products });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let selectedProduct = products.filter(prod => {return prod.id == req.params.id});
		console.log(selectedProduct)
		return res.render('detail', { selectedProduct : selectedProduct[0] });
		
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		var newProduct = {
		id: products.length+1,
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		discount: req.body.discount,
		image: req.file.filename,
		category: req.body.category,
		}
		
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let  [productToEdit] = products.filter(prod => {return prod.id == req.params.id}); 
		res.render('product-edit-form', { productToEdit: productToEdit })
	},
	// Update - Method to update
	update: (req, res) => {
		editIndex = products.findIndex(prod => {return prod.id == req.params.id})

		var newProduct = {
			id: products[editIndex].id,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			image: products[editIndex].image,
			category: req.body.category,
			}
		products[editIndex] = newProduct
		
		res.redirect('/products/')
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		destroyIndex = products.findIndex(prod => {return prod.id == req.params.id})
		console.log('--------------------------------------')
		console.log('listado de productos antes de borrar')
		console.log('--------------------------------------')
		console.log(products)
		console.log(' ')
		console.log(' ')

		products.splice(destroyIndex,1);

		console.log('--------------------------------------')
		console.log('listado de productos DESPUES de borrar')
		console.log('--------------------------------------')
		console.log(products)
		console.log(' ')
		console.log(' ')
		res.redirect('/products/')
	}
};

module.exports = controller;