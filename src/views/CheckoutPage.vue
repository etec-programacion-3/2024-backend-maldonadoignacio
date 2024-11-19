<template>
    <div class="checkout-container">
      <div class="checkout-wrapper">
        <!-- Encabezado Animado -->
        <div class="checkout-header">
          <h1 class="animate__animated animate__fadeInDown">
            <i class="fas fa-shopping-cart"></i> Finalizar Compra
          </h1>
          <p class="animate__animated animate__fadeInUp">
            Estás a un paso de completar tu compra
          </p>
        </div>
  
        <!-- Contenido Principal -->
        <div class="checkout-content">
          <!-- Columna Izquierda: Resumen del Carrito -->
          <div class="cart-summary">
            <div class="section-header">
              <h2>
                <i class="fas fa-box-open"></i> Productos en tu Carrito
              </h2>
              <span class="item-count">{{ cartItems.length }} Productos</span>
            </div>
  
            <!-- Lista de Productos -->
            <transition-group name="cart-list" tag="div" class="cart-items">
              <div 
                v-for="item in cartItems" 
                :key="item.id" 
                class="cart-item animate__animated animate__fadeIn"
              >
                <div class="item-image">
                  <img 
                    :src="getProductImage(item)" 
                    :alt="item.nombre"
                  >
                  <div class="item-badges">
                    <span class="badge">{{ item.categoria }}</span>
                  </div>
                </div>
                
                <div class="item-details">
                  <h3>{{ item.nombre }}</h3>
                  <p class="item-description">
                    {{ truncateDescription(item.descripcion) }}
                  </p>
                  
                  <div class="item-pricing">
                    <div class="price-tag">
                      <span class="current-price">${{ item.precio.toFixed(2) }}</span>
                    </div>
                    
                    <div class="quantity-control">
                      <button 
                        @click="decreaseQuantity(item)" 
                        class="qty-btn"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                      <span class="quantity">{{ item.quantity }}</span>
                      <button 
                        @click="increaseQuantity(item)" 
                        class="qty-btn"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div class="item-subtotal">
                    <span>Subtotal: ${{ (item.precio * item.quantity).toFixed(2) }}</span>
                    <button 
                      @click="removeFromCart(item.id)" 
                      class="remove-item"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </transition-group>
  
            <!-- Resumen Total -->
            <div v-if="cartItems.length > 0" class="cart-total">
              <div class="total-breakdown">
                <div class="total-line">
                  <span>Subtotal</span>
                  <span>${{ calculateSubtotal() }}</span>
                </div>
                <div class="total-line">
                  <span>IVA (21%)</span>
                  <span>${{ calculateIVA() }}</span>
                </div>
                <div class="total-line total-final">
                  <strong>Total</strong>
                  <strong>${{ calculateTotal() }}</strong>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Columna Derecha: Formulario de Compra -->
          <div class="checkout-form">
            <div class="section-header">
              <h2>
                <i class="fas fa-shipping-fast"></i> Detalles de Envío
              </h2>
            </div>
  
            <form @submit.prevent="processCheckout" class="shipping-form">
              <!-- Información Personal -->
              <div class="form-section">
                <h3>Información Personal</h3>
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">Nombre</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="shippingInfo.firstName" 
                      required
                    >
                  </div>
                  <div class="form-group">
                    <label for="lastName">Apellido</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      v-model="shippingInfo.lastName" 
                      required
                    >
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="shippingInfo.email" 
                    required
                  >
                </div>
              </div>
  
              <!-- Información de Envío -->
              <div class="form-section">
                <h3>Dirección de Envío</h3>
                <div class="form-group">
                  <label for="address">Dirección</label>
                  <input 
                    type="text" 
                    id="address" 
                    v-model="shippingInfo.address" 
                    required
                  >
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="city">Ciudad</label>
                    <input 
                      type="text" 
                      id="city" 
                      v-model="shippingInfo.city" 
                      required
                    >
                  </div>
                  <div class="form-group">
                    <label for="postal">Código Postal</label>
                    <input 
                      type="text" 
                      id="postal" 
                      v-model="shippingInfo.postalCode" 
                      required
                    >
                  </div>
                </div>
              </div>
  
              <!-- Métodos de Pago -->
              <div class="form-section">
                <h3>Método de Pago</h3>
                <div class="payment-methods">
                  <div 
                    v-for="method in paymentMethods" 
                    :key="method.id" 
                    class="payment-method"
                  >
                    <input 
                      type="radio" 
                      :id="method.id" 
                      :value="method.id" 
                      v-model="selectedPaymentMethod"
                      required
                    >
                    <label :for="method.id">
                      <i :class="method.icon"></i>
                      {{ method.name }}
                    </label>
                  </div>
                </div>
              </div>
  
              <!-- Botón de Compra -->
              <button 
                type="submit" 
                class="checkout-button"
                :disabled="cartItems.length === 0"
              >
                <i class="fas fa-lock"></i> Confirmar Compra
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import 'animate.css';
  
  export default {
    name: 'CheckoutPage',
    data() {
      return {
        shippingInfo: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          postalCode: ''
        },
        selectedPaymentMethod: null,
        paymentMethods: [
          { 
            id: 'credit', 
            name: 'Tarjeta de Crédito', 
            icon: 'fas fa-credit-card' 
          },
          { 
            id: 'paypal', 
            name: 'PayPal', 
            icon: 'fab fa-paypal' 
          },
          { 
            id: 'transfer', 
            name: 'Transferencia Bancaria', 
            icon: 'fas fa-university' 
          }
        ]
      };
    },
    computed: {
      ...mapGetters([
        'cartItems',
        'cartTotal'
      ])
    },
    methods: {
      ...mapActions([
        'removeFromCart',
        'updateCartQuantity'
      ]),
      getProductImage(item) {
        try {
          if (item.imagen) {
            if (item.imagen.startsWith('http')) {
              return item.imagen;
            }
            return require(`@/assets/products/${item.imagen}`);
          }
        } catch (error) {
          console.warn('Error cargando imagen del producto:', error);
        }
        return require('@/assets/default-product.jpg');
      },
      calculateTotal() {
        return this.cartTotal.toFixed(2);
      },
      calculateSubtotal() {
        return this.cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0).toFixed(2);
      },
      calculateIVA() {
        return (this.calculateSubtotal() * 0.21).toFixed(2);
      },
      increaseQuantity(item) {
        this.updateCartQuantity({ 
          productId: item.id, 
          quantity: item.quantity + 1 
        });
      },
      decreaseQuantity(item) {
        if (item.quantity > 1) {
          this.updateCartQuantity({ 
            productId: item.id, 
            quantity: item.quantity - 1 
          });
        } else {
          this.removeFromCart(item.id);
        }
      },
      processCheckout() {
        if (!this.validateCheckout()) {
          return;
        }
  
        const orderData = {
          items: this.cartItems,
          total: this.calculateTotal(),
          shippingInfo: this.shippingInfo,
          paymentMethod: this.selectedPaymentMethod
        };
  
        this.sendOrderToBackend(orderData);
      },
      validateCheckout() {
        if (!this.selectedPaymentMethod) {
          alert('Por favor, selecciona un método de pago');
          return false;
        }
        return true;
      },
      sendOrderToBackend(orderData) {
        console.log('Orden procesada:', orderData);
        alert('¡Compra realizada con éxito!');
        this.$router.push('/');
      },
      truncateDescription(description) {
        return description.length > 50 ? description.substring(0, 50) + '...' : description;
      }
    }
  };
  </script>
  
  <style scoped>
  .checkout-container {
  padding: 20px;
  background-color: #000000;
  min-height: 100vh;
}

  
.checkout-wrapper {
  max-width: 1200px;
  margin: auto;
  background: rgb(0, 0, 0);
  border-radius: 8px;
  box-shadow: 0 0px 6px rgba(131, 255, 183, 0.591);
  padding: 20px;
}
  
  .checkout-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .cart-summary {
    margin-bottom: 20px;
  }
  
  .cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
  
  .item-image {
  position: relative;
  width: 150px;  /* Tamaño fijo para la imagen */
  height: 150px; /* Tamaño fijo para la imagen */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.item-image img {
  width: 100%;    /* Asegura que la imagen ocupe todo el contenedor */
  height: 100%;   /* Asegura que la imagen ocupe todo el contenedor */
  object-fit: cover; /* Mantiene la proporción de aspecto recortando si es necesario */
  transition: transform 0.3s ease;
}

  .item-badges {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  
  .item-details {
    flex-grow: 1;
    margin-left: 15px;
  }
  
  .item-pricing {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .qty-btn {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .item-subtotal {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .checkout-form {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(14, 255, 70, 0.2);
  box-shadow: 0 0 20px rgba(14, 255, 70, 0.1);
}
  
.form-section {
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  border: 1px solid rgba(14, 255, 70, 0.1);
}

.form-section h3 {
  color: #f7f7f7;
  font-size: 1.2em;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid rgba(14, 255, 70, 0.3);
  padding-bottom: 10px;
}

  .form-row {
    display: flex;
    justify-content: space-between;
  }
  
  .form-group {
    flex: 1;
    margin-right: 20px;
  }


  .form-group label {
  display: block;
  margin-bottom: 8px;
  color: #0eff46;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(14, 255, 70, 0.3);
  border-radius: 8px;
  color: #fff;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #0eff46;
  box-shadow: 0 0 10px rgba(14, 255, 70, 0.2);
  background: rgba(14, 255, 70, 0.05);
}

  .form-group:last-child {
    margin-right: 0;
  }
  
  .payment-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}
  
.payment-method {
  position: relative;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(14, 255, 70, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.payment-method::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(14, 255, 70, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}
.payment-method:hover::before {
  transform: translateX(100%);
}

.payment-method:hover {
  transform: translateY(-3px);
  border-color: #0eff46;
  box-shadow: 0 5px 15px rgba(14, 255, 70, 0.2);
}

.payment-method.selected {
  background: rgba(14, 255, 70, 0.1);
  border-color: #0eff46;
}

.payment-method input[type="checkbox"] {
  display: none;
  background-color: #0eff46;
}

.payment-method label {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #fff;
  font-size: 1.1em;
  width: 100%;
  cursor: pointer;
}
  
.payment-method i {
  font-size: 24px;
  color: #fdfffe;
  transition: transform 0.3s ease;
}
.payment-method:hover i {
  transform: scale(1.2);
  color: #0eff46;
}

.checkout-button {
  width: 100%;
  padding: 15px 30px;
  margin-top: 30px;
  background: linear-gradient(45deg, #0eff46, #00cc33);
  border: none;
  border-radius: 10px;
  color: #000;
  font-size: 1.2em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.checkout-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: 0.5s;
}
.checkout-button:hover::before {
  left: 100%;

}
.checkout-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(14, 255, 70, 0.728);
}
  

.checkout-button:active {
  transform: translateY(-1px);
}
  
  
  .checkout-button:disabled {
    background-color: #8bfec5;
  }

  .checkout-button i {
  margin-right: 10px;
  font-size: 1.1em;
}


/* Animaciones para validación */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.form-group input:invalid:focus {
  border-color: #ff4646;
  animation: shake 0.3s ease-in-out;
}



@media (max-width: 768px) {
  .payment-methods {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .form-group {
    margin-right: 0;
    margin-bottom: 15px;
  }
}


  .item-count {
    font-weight: bold;
    color: #555;
  }
  
  .price-tag {
    font-size: 1.2em;
    color: #333;
  }
  
  .current-price {
    font-weight: bold;
    color: #e74c3c;
  }
  
  .total-breakdown {
    margin-top: 10px;
  }
  
  .total-line {
    display: flex;
    justify-content: space-between;
  }
  
  .total-final {
    font-weight: bold;
    color: #e74c3c;
  }
  </style>