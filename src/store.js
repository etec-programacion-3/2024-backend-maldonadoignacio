// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({
          ...product,
          quantity: 1
        });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      const index = state.cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    UPDATE_CART_QUANTITY(state, { productId, quantity }) {
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    updateCartQuantity({ commit }, payload) {
      commit('UPDATE_CART_QUANTITY', payload);
    }
  },
  getters: {
    cartItemCount: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
    },
    cartItems: state => state.cart
  }
});

export default store;