<template>
  <div class="login-signup-toggle">
    <div class="form-container">
      <h2>Create an Account</h2>
      <form v-if="isSignupForm" @submit.prevent="submitSignup">
        <div class="form-group">
          <input
            type="text"
            placeholder="Full Name"
            v-model="signupData.fullName"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email"
            v-model="signupData.email"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            v-model="signupData.password"
            required
          />
        </div>
        <div class="form-actions">
          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <a href="#" @click="toggleForm">Log in</a>
          </p>
        </div>
      </form>
      <form v-else @submit.prevent="submitLogin">
        <div class="form-group">
          <input
            type="email"
            placeholder="Email"
            v-model="loginData.email"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            v-model="loginData.password"
            required
          />
        </div>
        <div class="form-actions">
          <button type="submit">Log In</button>
          <p>
            Don't have an account? <a href="#" @click="toggleForm">Sign Up</a>
          </p>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "LoginSignup",
  data() {
    return {
      isSignupForm: true,
      signupData: {
        fullName: "",
        email: "",
        password: "",
      },
      loginData: {
        email: "",
        password: "",
      },
      name: null,
    };
  },
  mounted() {
    this.name = localStorage.getItem("name");
    if (this.name) {
      this.$router.push({ name: "Recipes" });
    }
  },
  methods: {
    toggleForm() {
      this.isSignupForm = !this.isSignupForm;
    },
    async submitSignup() {
      try {
        let obj = {
          name: this.signupData.fullName,
          email: this.signupData.email,
          password: this.signupData.password,
        };
        console.log(obj);
        const response = await axios.post(
          "https://recipe-application-c430.onrender.com/users/register",
          obj
        );
        Swal.fire({
          title: "success",
          text: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
        console.log("Signup successful:", response.data);
      } catch (error) {
        Swal.fire({
          title: "error",
          text: error.response.data.msg,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(error.response.data.msg);
      }
    },
    async submitLogin() {
      try {
        const response = await axios.post(
          "https://recipe-application-c430.onrender.com/users/login",
          this.loginData
        );
        Swal.fire({
          title: "success",
          text: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        Swal.fire({
          title: "error",
          text: error.response.data.msg,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(error.response.data.msg);
      }
    },
  },
};
</script>

<style scoped>
.login-signup-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
#Oauth {
  width: 70%;
}
#Oauth a {
  text-decoration: none;
  color: white;
}
#Oauth a img {
  width: 15px;
  height: 100%;
}
.form-container {
  max-width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  margin-top: 20px;
}

button {
  background-color: #f76d57;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ff5733;
}

p {
  margin-top: 10px;
}

a {
  text-decoration: none;
  color: #f76d57;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
