<template>
<div class="container">
  <br/>
   <router-link to="/" >
    <b-button class="button"
              color="primary" 
              @click="Logout()">
      Back To Home
    </b-button>
   </router-link>
<br/>
      <ParameterManage/>
<br/>
      <button  class="button" tag="b-nav-item" @click="openUsersTable()">
        Users Table
      </button>
      <br/>
      <br/>
      <button  class="button" tag="b-nav-item" @click="openReports()">
        Reports
      </button>
<transition name="fade">
        <div class="popup-modal" v-if="isVisibleUsersTable">
            <div class="window">
                <slot>
                  <button  class="button" tag="b-nav-item" @click="closeUsersTable()">
                    CLOSE
                  </button>
                        <FollowExperiment/>
                </slot>
            </div>
        </div>
    </transition>
  <transition name="fade">
        <div class="popup-modal" v-if="isVisibleReports">
            <div class="window">
                <slot>
                  <button  class="button" tag="b-nav-item" @click="closeReports()">
                    CLOSE
                  </button>
                  Reports
                </slot>
            </div>
        </div>
    </transition>

    <!-- <ParameterManage/> -->
  </div>
</template>

<script>
import ParameterManage from '../components/parameterManage'
import FollowExperiment from '../components/followExperiment'
export default {
  data() {
    return {
      isVisibleUsersTable: false,
      isVisibleReports: false
    }
  },
    methods: {
    openUsersTable() {
      this.isVisibleUsersTable = true
    },
    closeUsersTable() {
      this.isVisibleUsersTable = false
    },
    openReports() {
      this.isVisibleReports = true
    },
    closeReports() {
      this.isVisibleReports = false
    },
    Logout() {
      this.$root.store.logoutAdmin();
      this.$root.toast("Logout", "Admin logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
  components: {
    ParameterManage,
    FollowExperiment
  },
}
</script>

<style>
/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 1;
}

.window {
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}
</style>