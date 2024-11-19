const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    enum: ['botines', 'camisetas', 'camperas', 'zapatillas', 'shorts']
  },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
