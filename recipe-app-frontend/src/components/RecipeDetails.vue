<template>
  <div class="Details">
    <h1>Details of Recipe</h1>
    <div v-if="loading" class="loading-indicator">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <div v-for="(item, index) in recipe" :key="index">
        <div v-for="(el, index) in item.ingredients" :key="index">
          <p>{{ el.name }}</p>
        </div>
        <h2>{{ item.step }}</h2>
        <p>{{ item.description }}</p>
        <!-- Add more properties from the object as needed -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RecipeDetails",
  data() {
    return {
      recipe: [],
      loading: true,
    };
  },
  created() {
    // Fetch recipe data from the API
    this.fetchRecipe();
  },
  methods: {
    async fetchRecipe() {
      try {
        let id = localStorage.getItem("id");
        const response = await axios.get(
          `https://recipe-application-c430.onrender.com/recipes/steps/${id}`
        ); // Replace with your API URL
        this.recipe = response.data[0].steps;
        this.loading = false,
        console.log(this.recipe); // Use the entire recipe object
      } catch (error) {
        this.loading = false,
        console.error("Error fetching recipe details:", error);
      }
    },
  },
};
</script>

<style scoped>
.Details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* Ingredients Section */
.Details p {
  font-size: 20px;
  color: #555;
  margin-bottom: 10px;
}

/* Steps Section */
h2 {
  font-size: 24px;
  margin-top: 20px;
  color: #f76d57;
  text-transform: uppercase;
  letter-spacing: 1px;
}

p {
  font-size: 18px;
  color: #777;
  margin-bottom: 20px;
}
</style>
