<template>
  <div class="recipe-list">
    <h1>Recipes</h1>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by title..."
      />
      <button @click="searchRecipes">Search</button>
    </div>
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
        <button @click="addToMyList(recipe.id, recipe.title, recipe.image)">
          Add to my list
        </button>
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RecipesPage",
  data() {
    return {
      recipes: [],
      currentPage: 1,
      recipesPerPage: 10,
      searchQuery: "",
      loading: true, // Adjust as needed
    };
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/data/${this.currentPage}`
        ); // Replace with your API URL
        this.loading = false;
        this.recipes = response.data.msg.results;
        console.log(this.recipes);
      } catch (error) {
        this.loading = false;
        console.error(error.response.data.msg);
      }
    },
    async searchRecipes() {
      try {
        this.loading = true;
        const response = await axios.get(
          `http://localhost:8000/recipes/search?data=${this.searchQuery}`
        );
        this.recipes = response.data.results;
        console.log(this.recipes);
        this.loading = false;
        this.searchQuery = "";
      } catch (error) {
        this.loading = false;
        console.error(error.response.data.msg);
      }
    },
    nextPage() {
      this.currentPage++;
      this.loading = true;
      this.fetchRecipes();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loading = true;
        this.fetchRecipes();
      }
    },
    details(Id) {
      localStorage.setItem("id", Id);
    },
    addToMyList(Id, title, image) {
      let token = localStorage.getItem("token");
      console.log(token);
      console.log(Id, title, image);
      let obj = {
        id: Id,
        title: title,
        image: image,
      };

      axios
        .post(
          "http://localhost:8000/recipes", // Replace with the correct endpoint
          obj,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the 'Authorization' header
            },
          }
        )
        .then((response) => {
          console.log("Recipe added to my list:", response.data);
          // Handle success or show a confirmation message
        })
        .catch((error) => {
          console.error(error.response.data.msg);
          // Handle error or show an error message
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

/* Pagination Styles */
.pagination {
  margin-top: 20px;
}

.pagination button {
  background-color: #f76d57;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  font-size: 16px;
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
