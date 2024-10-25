<template>
    <div class="category-card">
      <img :src="category.image" alt="" class="category-image" />
      <h4>{{ category.name }}</h4>
      <button class="btn">Ver Productos</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategoryCard',
    props: {
      category: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .category-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    width: 200px;
  }
  
  .category-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .btn {
    margin-top: 10px;
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
  