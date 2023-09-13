<template>
  <nav class="navbar">
    <div class="navbar-end">
      <router-link to="/" class="navbar-item">Home</router-link>
      <router-link v-if="!name" to="/Login" class="navbar-item" id="login"
        >Login || Signup</router-link
      >

      <router-link v-else to="" class="navbar-item">User :- {{ name }}</router-link>
      <router-link to="/recipe" class="navbar-item">Recipes</router-link>
      <router-link to="/my-items" class="navbar-item">My-items</router-link>
      <button v-if="name" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      name: null,
      // Placeholder for the user name
    };
  },
  mounted() {
    // Check if the user name is available in the local storage
    const name = localStorage.getItem("name");
    
    if (name) {
      this.name = name;
    }
  },
  methods: {
    logout() {
      // Perform the logout action

      localStorage.clear();
      this.name = null;
    },
  },
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
