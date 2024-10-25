<template>
    <div class="home-container">
      <div class="banner">
        <h2>Bienvenido a Sportify</h2>
        <p>Encuentra la mejor indumentaria deportiva aquí.</p>
      </div>
      
      <div class="categories-section">
        <h3>Categorías</h3>
        <div class="category-list">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category" 
          />
        </div>
      </div>
  
      <div class="product-section">
        <h3>Productos Destacados</h3>
        <div class="product-list">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ProductCard from './ProductCard.vue';
  import CategoryCard from './CategoryCard.vue';
  
  export default {
    name: 'HomePage',
    components: {
      ProductCard,
      CategoryCard,
    },
    data() {
      return {
        categories: [
          { id: 1, name: 'Zapatillas', image: 'https://acdn.mitiendanube.com/stores/001/544/041/products/photoroom_20240426_163306-9531a1959cd10a8f6417169131392044-240-0.jpg' },
          { id: 2, name: 'Camisetas', image: 'https://www.relevo.com/futbol/eurocopa-masculina/camisetas-selecciones-eurocopa-2024-20240314154053-nt.html' },
          { id: 3, name: 'Pantalones', image: 'https://www.indump0912.com.ar/indumentaria-deportiva-adultos/short-de-futbol/short-de-futbol-rojo-con-numero' },
          { id: 4, name: 'Accesorios', image: 'https://www.istockphoto.com/es/fotos/accesorios-deportivos' },
        ],
        products: [
          { id: 1, name: 'Zapatillas Deportivas', price: 59.99 },
          { id: 2, name: 'Camiseta de Fútbol', price: 29.99 },
          { id: 3, name: 'Pantalones Cortos', price: 19.99 },
          { id: 4, name: 'Chaqueta Deportiva', price: 49.99 },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .home-container {
    text-align: center;
    padding: 20px;
  }
  
  .banner {
    background: url('https://www.uniminuto.edu/deporte-centro-sur') no-repeat center center/cover;
    padding: 50px 20px;
    color: white;
  }
  
  .categories-section, .product-section {
    margin-top: 40px;
  }
  
  .category-list, .product-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  h3 {
    margin: 20px 0;
  }
  </style>
  