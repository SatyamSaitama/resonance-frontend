<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>
<scritpt>
import axios from '../axios';
async created(){
  await axios.get("/")
}
</script>
<style lang="scss">

</style>
