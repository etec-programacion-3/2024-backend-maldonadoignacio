<template>
    <div class="category-page">
      <h2>Productos en: {{ category }}</h2>
      <div class="products-grid">
        <div 
          v-for="(product, index) in products" 
          :key="index" 
          class="product-card"
        >
          <h4>{{ product.nombre }}</h4>
          <p>{{ product.descripcion }}</p>
          <span>${{ product.precio }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CategoryPage',
    data() {
      return {
        category: this.$route.params.category,
        products: []
      };
    },
    methods: {
      async fetchProductsByCategory() {
        try {
          const response = await axios.get('http://localhost:5000/api/products');
          const allProducts = response.data;
          this.products = allProducts.filter(product => product.categoria === this.category);
        } catch (error) {
          console.error('Error al cargar productos de la categoría:', error);
        }
      }
    },
    mounted() {
      this.fetchProductsByCategory();
    }
  };
  </script>
  
  <style scoped>
  .category-page {
    padding: 20px;
  }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  .product-card {
    background-color: #000000;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
  }
  .product-card h4 {
    font-size: 1.2em;
  }
  .product-card p {
    font-size: 0.9em;
  }
  .product-card span {
    font-weight: bold;
  }
  </style>