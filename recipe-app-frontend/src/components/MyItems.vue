<template>
  <div class="recipe-list">
    <h1>My-Recipes</h1>
    <div v-if="loading" class="loading-indicator">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <div class="recipe-card" v-for="recipe in recipes" :key="recipe.id">
        <img :src="recipe.image" :alt="recipe.title" />
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <button @click="details(recipe.id)">
          <router-link to="/recipe-details" class="navbar-item"
            >Recipe-details</router-link
          >
        </button>
        <button @click="Del(recipe.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "MyItems",
  data() {
    return {
      recipes: [],
      loading: true,
    };
  },
  methods: {
    async fetchRecipes() {
      let token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://recipe-application-c430.onrender.com/recipes/userRecipes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Replace with your API URL
        this.recipes = response.data.data;
        if(this.recipes.length==0){
            Swal.fire({
            title: "My list is empty",
            text: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
        (this.loading = false), console.log(this.recipes);
      } catch (error) {
        (this.loading = false),
          Swal.fire({
            title: "error",
            text: error.response.data.msg,
            icon: "error",
            confirmButtonText: "OK",
          });
        console.error(error.response.data.msg);
      }
    },
    details(Id) {
      localStorage.setItem("id", Id);
    },
    Del(Id) {
      let token = localStorage.getItem("token");
      console.log(token);

      axios
        .delete(
          `https://recipe-application-c430.onrender.com/recipes/userRecipes/${Id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          Swal.fire({
            title: "success",
            text: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
          console.log(response.data);
          this.fetchRecipes();
        })
        .catch((error) => {
          Swal.fire({
            title: "error",
            text: error.response.data.msg,
            icon: "error",
            confirmButtonText: "OK",
          });
          console.error(error.response.data.msg);
        });
    },
  },
  mounted() {
    this.fetchRecipes();
  },
};
</script>

<style scoped>
/* Recipe List Styles */
.recipe-list {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

/* Recipe Card Styles */
.recipe-card {
  display: inline-block;
  width: calc(33.33% - 20px); /* Three cards per row with some spacing */
  margin: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: left;
}

.recipe-card img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
.recipe-card button {
  text-decoration: none;
  color: white;
  margin-right: 5px;
  background-color: red;
  cursor: pointer;
}
.navbar-item {
  text-decoration: none;
  color: white;
}
.recipe-card h2 {
  font-size: 18px;
  margin-top: 10px;
}

.recipe-card p {
  font-size: 16px;
  color: #777;
}

/* Media Query for Responsiveness */
@media screen and (max-width: 768px) {
  .recipe-card {
    width: calc(50% - 20px); /* Two cards per row on smaller screens */
  }
}

@media screen and (max-width: 480px) {
  .recipe-card {
    width: 100%; /* Single card per row on small screens */
  }
}

/* Add your CSS styles for recipe cards and pagination here */
</style>
