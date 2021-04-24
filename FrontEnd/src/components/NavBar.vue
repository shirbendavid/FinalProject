<template>
  <b-navbar class="navbar">
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'main' }">
          Home
        </router-link>
        <b-navbar-nav class="ml-auto">
          <router-link class="nav" tag="b-nav-item" :to="{ name: 'about' }">
            <b-icon icon="question-circle-fill" aria-hidden="true"></b-icon>
              About
          </router-link>  
          </b-navbar-nav>
        <router-link v-if="!$root.store.email" class="nav" tag="b-nav-item" :to="{ name: 'loginManagement' }">
          <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Management
          portal
        </router-link>
      </b-navbar-nav>

      <b-navbar-nav
        class="ml-auto"
        v-if="!$root.store.email && !this.$cookies.get('session')">
        
        <b-nav-text>Hello Guset!</b-nav-text>
        <p class="h3 mb-2">
          <b-icon icon="person" variant="secondary"></b-icon>
        </p>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'register' }">
          Register
        </router-link>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'login' }">
          Login
        </router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else-if="$root.store.email && this.$cookies.get('session')">
        <b-nav-text><b>Welcome {{ $root.store.firstname }} </b></b-nav-text>
        <br />
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'observation' }">
          Rate
        </router-link>

        <router-link class="nav" tag="b-nav-item" :to="{ name: 'game' }">
          Game
        </router-link>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'advanced' }">
          advancedGame
        </router-link>
        <!-- <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{ $root.store.email }}</em>
          </template>
        </b-nav-item-dropdown> -->
        <button class="button" tag="b-nav-item" @click="Logout()">
          Logout
        </button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// @import url("https://fonts.googleapis.com/css?family=Special+Elite");
.navbar {
  background: -webkit-linear-gradient(#ccd2df, #6b656e);
  background: linear-gradient(#e9c9b5c5, #f3c48ec7);
  // position: fixed; /* Set the navbar to fixed position */
  // width: 100%; /* Full width */
  float: inline-start;
  font-size: 18px;
  font-family: "Merienda", Helvetica, Arial;
  height: 60px;
}
.nav :hover {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(29, 27, 27, 0.822);
  color: #fff;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.nav :focus {
  border: 1px solid rgba(29, 27, 27, 0.822);
  font-size: 20px;
}

.button {
  background-color: #e9c9b5c5;
  // border: 1px solid rgba(250, 248, 245, 0.911);
  // border-radius: 25px;
  border: none;
}
</style>
