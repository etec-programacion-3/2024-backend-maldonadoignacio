const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/:categoryName/products', async (req, res) => {
  try {
    const products = await Product.find({ categoria: req.params.categoryName });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos de la categoría', error });
  }
});

router.get('/:categoryName/products', async (req, res) => {
  try {
    const products = await Product.find({ categoria: req.params.categoryName });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos de la categoría', error });
  }
});

module.exports = router;