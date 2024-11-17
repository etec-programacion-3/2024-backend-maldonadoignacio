<template>
  <div class="product-cards-container">
    <h3 class="section-title">Productos Destacados</h3>
    <div class="cards-grid">
      <div 
        v-for="(product, index) in products" 
        :key="index" 
        class="product-card"
      >
        <div class="product-image-container">
          <img 
            v-if="product.imagenes && product.imagenes.length > 0" 
            :src="getImageUrl(product.imagenes[0])" 
            :alt="product.nombre" 
            class="product-image"
          >
        </div>
        <div class="product-info">
          <h4 class="product-name">{{ product.nombre }}</h4>
          <p class="product-description">{{ truncateDescription(product.descripcion) }}</p>
          <div class="product-details">
            <span class="product-price">${{ formatPrice(product.precio) }}</span>
            <span class="product-category">{{ product.categoria }}</span>
          </div>
          <div class="product-variants">
            <div class="product-colors">
              <span 
                v-for="(color, colorIndex) in product.colores_disponibles" 
                :key="colorIndex" 
                class="color-dot"
                :style="{ backgroundColor: getColorCode(color) }"
                :title="color"
              ></span>
            </div>
            <div class="product-sizes">
              <span 
                v-for="(size, sizeIndex) in product.tallas_disponibles" 
                :key="sizeIndex" 
                class="size-tag"
              >
                {{ size }}
              </span>
            </div>
          </div>
          <div class="product-actions">
            <button 
              class="cta-button" 
              @click="handleAddToCart(product)"
              :disabled="product.stock === 0"
            >
              {{ product.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock' }}
            </button>
            <span 
              class="stock-indicator" 
              :class="{ 'low-stock': product.stock <= 10 }"
            >
              Stock: {{ product.stock }}
            </span>
            <!-- Opcional: Indicador de producto en carrito -->
            <span 
              v-if="isProductInCart(product)" 
              class="in-cart-indicator"
            >
              En Carrito
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'ProductCards',
  data() {
      return {
          products: [],
          colorMap: {
              'negro/blanco': '#000000',
              'rojo/negro': '#FF0000',
              'azul/verde': '#0000FF',
              'azul/granate': '#800020',
              'azul claro': '#87CEEB',
              'blanco': '#FFFFFF',
              'púrpura/oro': '#800080',
              'negro': '#000000',
              'gris oscuro': '#A9A9A9',
              'azul marino': '#000080',
              'gris/verde': '#808080',
              'azul/naranja': '#0000FF'
          }
      };
  },
  computed: {
      // Mapea los getters del store
      ...mapGetters([
          'cartItems',
          'cartItemCount',
          'cartTotal'
      ])
  },
  methods: {
      // Usa mapActions para las acciones del carrito
      ...mapActions([
          'addToCart',
          'removeFromCart',
          'updateCartQuantity'
      ]),
      
      async fetchProducts() {
          try {
              const response = await axios.get('http://localhost:5000/api/products');
              this.products = response.data;
          } catch (error) {
              console.error('Error al cargar productos:', error);
          }
      },
      
      getImageUrl(imageName) {
          return require(`@/assets/products/${imageName}`);
      },
      
      formatPrice(price) {
          return new Intl.NumberFormat('es-AR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
          }).format(price);
      },
      
      truncateDescription(description, length = 100) {
          return description.length > length 
              ? description.substring(0, length) + '...' 
              : description;
      },
      
      getColorCode(color) {
          return this.colorMap[color] || '#FFFFFF';
      },
      
      // Método para añadir al carrito usando la acción de Vuex
      handleAddToCart(product) {
    this.addToCart({
        ...product,
        imagen: product.imagenes && product.imagenes.length > 0 
               ? product.imagenes[0] 
               : null,
        id: product._id || product.id,
    });

          
    // Opcional: Mostrar una notificación o mensaje
    console.log(`Producto añadido al carrito: ${product.nombre}`);
},
      
      // Método para verificar si un producto está en el carrito
      isProductInCart(product) {
          return this.cartItems.some(item => item.id === (product._id || product.id));
      }
  },
  
  mounted() {
      this.fetchProducts();
  }
};
</script>


<style scoped>
.product-cards-container {
  padding: 70px;
  height: 100%  ;
  width: 100%;
}

.section-title {
  text-align: center;
  margin-bottom: 20px;
  color: black;
  ;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 100px ;
  margin-top: 20px;
}

.product-card {
  background-color: #1a1a1a; /* Fondo oscuro */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.product-price {
  font-size: 1.2em;
  font-weight: bold;
}



.product-card:hover {
  transform: translateY(-5px); 
}

.product-image-container {
  height: 200px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: auto;
}

.product-info {
  padding: 15px;
  color: #ffffff; /* Texto blanco */
}

.product-name {
  font-size: 1.5em;
  margin: 0;
}

.product-description {
  font-size: 0.9em;
  color: #cccccc; /* Color gris claro para la descripción */
}

.product-details {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.product-variants {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.product-colors, .product-sizes {
  display: flex;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}

.size-tag {
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
  color:black }


.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cta-button {
  background-color: #28a745; /* Color verde */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #218838; /* Color verde más oscuro al pasar el ratón */
}

.cta-button:disabled {
  background-color: #ccc;
}

.stock-indicator {
  font-size: 0.9em;
}

.low-stock {
  color: red;
}

.product-category {
  font-size: 0.8em;
  color: #aaaaaa; /* Color gris para la categoría */
}


</style>