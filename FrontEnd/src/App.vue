
<template>
  <div :style="bgImg" class="img1">
  <div id="app">
    <NavBar  v-if="!isNotManageOrGames"/>
    <router-view />
  </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Vue from 'vue';
import Carousel3d from 'vue-carousel-3d';
 
Vue.use(Carousel3d);

export default {
  data() {
          return {
            bgImg: {
                backgroundImage: "url(" + require("./assets/main-b.jpg")+")",
                backgroundRepeat: "no-repeat",
                backgroundSize: '100%'
            },
            };
  },
          
  components: {
    NavBar,
  },
  name: "App",
  computed: {
    isNotManageOrGames() {
      return this.$route.name === 'management' || this.$route.name==='game' || this.$route.name==='advanced' || this.$route.name==='loginManagement'
      
  }
}
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@import url(https://fonts.googleapis.com/css?family=Raleway);

.img1{
      height: auto;    
      width: 100%;
      background-size: cover,contain;
  }
#app {
  font-family: Raleway;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>