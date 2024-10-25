<template>
  <div class="register-container">
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="registerUser" class="form">
      <div class="form-group">
        <label for="username">Nombre de Usuario:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          placeholder="Ingrese su nombre de usuario"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label> 
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Ingrese su contraseña"
        />
      </div>
      <button type="submit" class="btn">Registrar</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }} 😊</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }} 😠</p>
    <div class="footer-links">
      <p>¿Ya tienes una cuenta? <router-link to="/login">Iniciar sesión</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          password: this.password
        });
        console.log('Usuario registrado:', response.data);
        this.successMessage = response.data.message; // Mensaje de éxito
        this.errorMessage = ''; // Limpiar el mensaje de error
      } catch (error) {
        this.successMessage = ''; // Limpiar el mensaje de éxito
        this.errorMessage = error.response.data.message || 'Error al registrar el usuario'; // Mensaje de error
      }
    }
  }
};
</script>

<style>
.register-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1); /* Fondo suave y transparente */
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #ffffff;
  text-align: center;
  position: relative;
  backdrop-filter: blur(10px); /* Efecto 3D */
}

h2 {
  margin-bottom: 30px;
  font-family: 'Arial', sans-serif;
  font-size: 28px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

input {
  width: 95%;
  padding: 13px;
  border: 2px solid #00bcd4; /* Color de borde azul */
  border-radius: 10px;
  margin-top: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

input:focus {
  outline: none;
  border-color: #80deea;
  box-shadow: 0 0 10px rgba(128, 222, 238, 0.5);
}

.btn {
  padding: 12px;
  background-color: #00bcd4;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background-color: #0004ff;
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.5);
}

.success {
  color: #00ff00; /* Color verde para el mensaje de éxito */
  margin-top: 15px;
  font-weight: bold;
}

.error {
  color: #ff0000; /* Color rojo para el mensaje de error */
  margin-top: 15px;
  font-weight: bold;
}

.footer-links {
  margin-top: 20px;
}

.footer-links a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

.footer-links a:hover {
  text-decoration: underline;
  color: #000000;
}
</style>
