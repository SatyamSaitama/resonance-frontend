<!-- src/components/RedirectPage.vue -->
<template>
    <transition name="fade" mode="out-in">
      <div v-if="showRedirect" class="redirect-container" key="redirect-container">
        <p class="redirect-message">Redirecting...</p>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'RedirectPage',
    data() {
      return {
        showRedirect: true,
      };
    },
    mounted() {
      // Simulate a delay for demonstration purposes
      setTimeout(() => {
        this.showRedirect = false;
  
        // Store access_token in localStorage
        const accessToken = this.$route.params.access_token;
        localStorage.setItem('token', accessToken);
  
        // Redirect after the fade-out animation
        setTimeout(() => {
          this.$router.push('/');
        }, 500); // Adjust the timing to match the transition duration
      }, 2000); // Adjust the timing for how long you want to display the message before redirecting
    },
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  .redirect-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .redirect-message {
    font-size: 24px;
    color: #333;
  }
  </style>
  