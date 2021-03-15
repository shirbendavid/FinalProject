
<template>
  <div id="app">
    <NavBar  v-if="!isNotManage"/>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Vue from 'vue';
import Carousel3d from 'vue-carousel-3d';
 
Vue.use(Carousel3d);


export default {
  components: {
    NavBar,
  },
  name: "App",
  computed: {
    isNotManage() {
      return this.$route.name === 'management'
  }
}
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@import url(https://fonts.googleapis.com/css?family=Raleway);

@media all and (max-width: 480px) {

#app {
  font-family: Raleway;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  // background-image: url("assets/2757336.jpg");
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
}
</style>