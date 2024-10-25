<template>
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>Precio: ${{ product.price.toFixed(2) }}</p>
      <button class="btn">Añadir al carrito</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductCard',
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .product-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s;
  }
  
  .product-card:hover {
    transform: scale(1.05);
  }
  
  .btn {
    padding: 10px;
    background-color: #00bcd4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: #0004ff;
  }
  </style>
  