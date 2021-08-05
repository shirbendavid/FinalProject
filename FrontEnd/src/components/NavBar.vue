<template>
  <b-navbar class="navbar">
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'main' }">
          <b-icon icon="house-door" aria-hidden="true"></b-icon>
          Home
        </router-link>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'about' }">
          <b-icon icon="info-circle" aria-hidden="true"></b-icon>
          About
        </router-link>
</b-navbar-nav>

        <b-navbar-nav class="navbar" v-if="$root.store.email && this.$cookies.get('session')">
        <b-icon icon="person" scale="1.4" aria-hidden="true"></b-icon>
        <!-- <b-nav-text>Welcome</b-nav-text> -->
          <b-nav-item-dropdown right >

                 <template v-slot:button-content>
            <em>Welcome {{ $root.store.firstname }} </em>
          </template>
        <button  class="btn" tag="b-nav-item" @click="Logout()">
          <b-icon icon="power" aria-hidden="true"></b-icon>
          Logout
        </button>          

          </b-nav-item-dropdown>
 
  </b-navbar-nav>

        <!-- <b-nav-text v-if="$root.store.email && this.$cookies.get('session')">
          <b-icon icon="person" scale="1.4" aria-hidden="true"></b-icon>
          Welcome <b>{{ $root.store.firstname }}</b>
        </b-nav-text>
      </b-navbar-nav> -->

      <b-navbar-nav
        class="ml-auto"
        v-if="!$root.store.email && !this.$cookies.get('session')"
      >
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'register' }">
          <b-icon icon="clipboard-check" aria-hidden="true"></b-icon>
          Register
        </router-link>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'login' }">
          <b-icon icon="person" scale="1.4" aria-hidden="true"></b-icon>
          Login
        </router-link>
      </b-navbar-nav>
      
      <!-- after log in -->
      <b-navbar-nav
        class="ml-auto"
        v-else-if="$root.store.email && this.$cookies.get('session')"
      >
        <div
          v-if="$root.store.numberOfImagesRating < $root.store.minImagesRating"
        >
          <router-link
            class="nav"
            tag="b-nav-item"
            :to="{ name: 'observation' }"
          >
            <b-icon icon="images" aria-hidden="true"></b-icon>
            Rate
          </router-link>
        </div>
        <div v-else>
          <router-link class="nav" tag="b-nav-item" :to="{ name: 'ranking' }">
            <b-icon icon="images" aria-hidden="true"></b-icon>
            Rate
          </router-link>
        </div>
        <b-navbar-nav
          v-if="$root.store.numberOfImagesRating >= $root.store.minImagesRating"
        >
          <b-nav-item-dropdown text="Game" right>
            <router-link class="nav" tag="b-nav-item" :to="{ name: 'game' }">
              <b-icon icon="controller" aria-hidden="true"></b-icon>
              Play
            </router-link>
            <router-link
              class="nav"
              tag="b-nav-item"
              :to="{ name: 'leaderboard' }"
            >
              <b-icon icon="trophy" aria-hidden="true"></b-icon>
              Leaderboard
            </router-link>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            v-if="this.$root.store.playAdvancedGame===true"
            text="AdvancedGame"
            right
          >
            <router-link tag="b-nav-item" :to="{ name: 'advanced' }">
              <b-icon icon="joystick" aria-hidden="true"></b-icon>
              Play
            </router-link>
            <router-link
              class="nav"
              tag="b-nav-item"
              :to="{ name: 'leaderboardAdvance' }"
            >
              <b-icon icon="trophy" aria-hidden="true"></b-icon>
              Leaderboard
            </router-link>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- <button class="btn" tag="b-nav-item" @click="Logout()">
          <b-icon icon="power" aria-hidden="true"></b-icon>
          Logout
        </button> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    Logout() {
      this.$alert("Thanks! See you tommorow!");
      this.$root.store.logout();

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
  async created() {
    if( this.$root.store.emailAdmin!==undefined){
      this.$root.store.logoutAdmin();
    }
  }
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Raleway);

.navbar {
  background: -webkit-linear-gradient(#ccd2df, #6b656e);
  background: linear-gradient(#e9c9b5c5, #e9e3ddc7);
  float: inline-start;
  font-size: 18px;
  font-family: Raleway !important;
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

.btn {
  background-color: #e9c9b5c5;
  border: none;
}
</style>
