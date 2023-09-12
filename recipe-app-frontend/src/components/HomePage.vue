<template>
  <div class="recipe-home">
    <header class="recipe-header">
      <h1>Welcome to Our Recipes</h1>
      <p>Explore and discover delicious recipes.</p>
    </header>
    <section class="recipe-cards">
      <!-- Recipe Cards Go Here -->
      <div class="recipe-card">
        <img src="https://tse1.mm.bing.net/th?id=OIP.OM_YQDFEEZ6NPj0XapYwFgHaEo&pid=Api&P=0&h=180" alt="Recipe 1" />
        <h2>Delicious Dishes</h2>
        <p>A mouth-watering dishes that you'll love!</p>
        <router-link to="/recipes/pasta">View Recipe</router-link>
      </div>
      <div class="recipe-card">
        <img src="https://tse1.mm.bing.net/th?id=OIP.IuiDuwoWmTUj4kIZrM4ikQHaFV&pid=Api&P=0&h=180" alt="Recipe 2" />
        <h2>Delicious Dishes</h2>
        <p>A mouth-watering dishes that you'll love!</p>
        <router-link to="/recipes/pizza">View Recipe</router-link>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
/* Recipe Home Page styles */
.recipe-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.recipe-header {
  text-align: center;
  margin-bottom: 40px;
}

.recipe-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
  color: #333;
}

.recipe-header p {
  font-size: 18px;
  color: #666;
}

.recipe-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.recipe-card {
  width: calc(33.33% - 20px);
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-card img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.recipe-card h2 {
  font-size: 24px;
  margin: 10px 0;
}

.recipe-card p {
  font-size: 16px;
  color: #777;
}

.recipe-card a {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #f76d57;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.recipe-card a:hover {
  background-color: #ff5733;
}

/* Media Query for Responsiveness */
@media screen and (max-width: 768px) {
  .recipe-card {
    width: calc(50% - 20px);
  }
}

@media screen and (max-width: 480px) {
  .recipe-card {
    width: 100%;
  }
}
</style>
