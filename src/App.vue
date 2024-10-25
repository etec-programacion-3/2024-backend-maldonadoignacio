<template>
  <div id="app">
    <header>
      <h1>Sportify - E-commerce de Indumentaria Deportiva</h1>
      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/register">Registro</router-link>
        <router-link to="/login">Iniciar sesión</router-link>
      </nav>
    </header>
    
    <main>
      <router-view /> <!-- Aquí se mostrará el componente registrado -->
    </main>

    <footer>
      <p>© 2024 Sportify. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #fff;
  background-color: rgb(0, 0, 0);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegurarse de que ocupa toda la altura */
}

header {
  background: linear-gradient(to right, #001f3f, #0074d9); /* Fondo degradado atractivo */
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

h1 {
  font-size: 28px;
  color: #fff;
  margin-bottom: 10px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
}

nav {
  margin-top: 10px;
}

nav a {
  color: #00bcd4; /* Color para los enlaces */
  margin: 0 15px;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;
  transition: color 0.3s;
}

nav a:hover {
  color: #ffffff; /* Color blanco al pasar el mouse */
}

nav a.router-link-exact-active {
  border-bottom: 2px solid #ffffff; /* Línea en el enlace activo */
}

main {
  flex: 1; /* Para que el main ocupe todo el espacio restante */
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
}

footer p {
  margin: 0;
  color: #fff;
}
</style>
