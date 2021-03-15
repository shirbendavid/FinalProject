<template>
<div class="container">
   <router-link to="/" >
    <!-- <b-button>Back To Home</b-button> -->
            <b-button class="button" tag="b-nav-item" @click="Logout()">
          Back To Home
        </b-button>
   </router-link>
<br/>
<br/>
      <ParameterManage/>
  </div>
</template>

<script>
import ParameterManage from '../components/parameterManage'
export default {
    methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "Admin logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
  components: {
    ParameterManage,
  },
}
</script>

<style>

</style>