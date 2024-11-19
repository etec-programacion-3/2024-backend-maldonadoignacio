<template>
  <div class="category-page">
    <h2>Productos en: {{ formatCategoryName(category) }}</h2>
    <div v-if="loading" class="loading">
      Cargando productos...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="products-grid">
      <div 
        v-for="product in products" 
        :key="product._id" 
        class="product-card"
      >
        <div class="product-image-container">
          <img 
            :src="product.imagen"
            :alt="product.nombre"
            class="product-image"
            @error="handleImageError"
          >
        </div>
        <h4>{{ product.nombre }}</h4>
        <p>{{ product.descripcion }}</p>
        <p class="product-price">${{ product.precio.toFixed(2) }}</p>
        <button 
          @click="addToCart(product)"
          :disabled="!product.stock"
          class="add-to-cart-button"
        >
          {{ product.stock ? 'Añadir al Carrito' : 'Sin Stock' }}
        </button>
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
      products: [],
      loading: true,
      error: null
    };
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${this.category}/products`);
        this.products = response.data;
      } catch (error) {
        this.error = 'Error al cargar productos. Por favor, intente nuevamente.';
        console.error('Error al cargar productos:', error);
      } finally {
        this.loading = false;
      }
    },
    handleImageError(e) {
      e.target.src = require('@/assets/default-product.jpg');
    },
    addToCart(product) {
      if (product.stock > 0) {
        // Aquí deberías implementar la lógica para agregar al carrito
        // Probablemente usando Vuex o el sistema de gestión de estado que uses
        this.$emit('add-to-cart', product);
      }
    },
    formatCategoryName(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
  },
  watch: {
    '$route.params.category'(newCategory) {
      this.category = newCategory;
      this.fetchProducts();
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.category-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
}

.error {
  color: red;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  padding: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s;
  background: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-price {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.2em;
  margin: 10px 0;
}

.add-to-cart-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover:not(:disabled) {
  background-color: #3aa876;
}

.add-to-cart-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>