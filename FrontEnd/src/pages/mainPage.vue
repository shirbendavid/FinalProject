<template>
  <b-container class="container">
    <h1 class="title">
      Hello
    </h1>
    <b-row>
      <b-col v-if="!$root.store.email">
        <login-page></login-page>
      </b-col>
      <b-col v-else>
        <h2>connect</h2>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LoginPage from '../pages/loginPage'
export default {
  components: {
    LoginPage,
  },
//   async created() {
//     if (this.$root.store.username) {
//     }
//   },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}

@import url('https://fonts.googleapis.com/css?family=Allura');
@import url('https://fonts.googleapis.com/css?family=Raleway');

.title {
  font-family: 'Allura';
  color: black;
  text-align: center;
}

</style>
