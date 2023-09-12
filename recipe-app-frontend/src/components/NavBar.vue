<template>
  <nav class="navbar">
    <div class="navbar-end">
      <router-link to="/" class="navbar-item">Home</router-link>
      <router-link to="/Login" class="navbar-item"
        >Login || Signup</router-link
      >
      <router-link to="/recipes" class="navbar-item">Recipes</router-link>
      <router-link to="/items" class="navbar-item">My-items</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
/* Navbar styles */
.navbar {
  background-color: #333;
  color: #fff;
  padding: 10px;
}

.navbar-item {
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  transition: background-color 0.3s, transform 0.3s;
}

.navbar-item:hover {
  background-color: #555;
  transform: scale(1.05);
}

.navbar-item:active {
  background-color: #777;
}

.navbar-item.router-link-exact-active {
  background-color: #555;
}

/* Animation for the whole navbar */
.navbar-enter-active,
.navbar-leave-active {
  transition: opacity 0.5s;
}

.navbar-enter, .navbar-leave-to /* .navbar-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
