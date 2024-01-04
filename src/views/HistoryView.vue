<template>
    <div class="history-view">
      <a href="/" >
  <i class="fas fa-arrow-left"></i> Go Back
    </a>
      <h2>Transcription History</h2>
      <div v-for="(transcript, index) in history" :key="index" class="transcription-item">
        <p><strong>Language:</strong> {{ transcript.language }}</p>
        <p><strong>Text:</strong> {{ transcript.text }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../axios'
  export default {
    name :"historyView",
    data() {
      return {
        history: [],
        user : null
      };
    },
    async mounted() {
    
    try{
      const response = await axios.get('user')
      this.$store.dispatch('user',response.data.user)
      this.fetchHistory();
      this.user = response.data.user
    }catch(error){
      this.$router.push('/login')
      console.log("Log In to continue")
    }


      // Assume you fetch the history data using Axios
      
    },
    methods: {
      async fetchHistory() {
        try {
          // Use the appropriate API endpoint and axios for fetching data
          const response = await axios.get('/history');
          this.history = response.data.history;
        } catch (error) {
          console.error('Error fetching history:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styling here */
  .history-view {
    max-width: 600px;
    margin: auto;
  }
  
  .transcription-item {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
  }
  
  /* Add more styles as needed */
  </style>
  