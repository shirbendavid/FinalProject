<template>
  <div>
    <div class="management_container">
      <router-link to="/">
        <b-button class="button" color="primary" @click="Logout()">
          Home
        </b-button>
      </router-link>
      <br />
      <h1 class="title">Managment Portal</h1>

      <ParameterManage />

      <br />

      <div class="flex">
        <button class="btn-down" tag="b-nav-item" @click="openUsersTable()">
          Users Table
        </button>
        <br />
        <br />

        <button class="btn-down" tag="b-nav-item" @click="openReports()">
          Reports
        </button>
      </div>

      <transition name="fade">
        <div class="popup-modal" v-if="isVisibleUsersTable">
          <div
            class="window"
            style="overflow-y: scroll; max-height:90%; margin-top: 50px; margin-bottom:50px;"
          >
            <slot>
              <button
                class="button-x"
                tag="b-nav-item"
                @click="closeUsersTable()"
              >
                X
              </button>
              <FollowExperiment />
            </slot>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="popup-modal" v-if="isVisibleReports">
          <div class="window reports">
            <slot>
              <button class="button-x" tag="b-nav-item" @click="closeReports()">
                X
              </button>
              <h2 class="p-1 text-center title">Reports</h2>
              <br />
              <b-row>
                <b-col>
                  <InitialRatingUsers />
                </b-col>
                <b-col>
                  <InitialRatingImages />
                </b-col>
              </b-row>
              <br />
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ParameterManage from "../components/parameterManage";
import FollowExperiment from "../components/followExperiment";
import InitialRatingUsers from "../components/initialRatingUsers";
import InitialRatingImages from "../components/initialRatingImages";
export default {
  data() {
    return {
      isVisibleUsersTable: false,
      isVisibleReports: false,
    };
  },
  methods: {
    openUsersTable() {
      this.isVisibleUsersTable = true;
    },
    closeUsersTable() {
      this.isVisibleUsersTable = false;
    },
    openReports() {
      this.isVisibleReports = true;
    },
    closeReports() {
      this.isVisibleReports = false;
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
    FollowExperiment,
    InitialRatingUsers,
    InitialRatingImages,
  },
};
</script>

<style>
 @import url(https://fonts.googleapis.com/css?family=Raleway);

/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.management_container {
  width: 90%;
  height: auto;
  margin-left: 62px;
  margin-right: 62px;
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
  overflow-y: initial !important;
}
.title {
  font-size: xx-large;
}
.window {
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
}

.reports {
  width: 40%;
  background: rgba(255, 234, 204, 0.945);
}

.title {
  margin-top: 0px;
}

image {
  width: 100%;
  height: 100%;
  max-height: 100%;
  margin: 0;
  padding: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.button-x {
  width: 30px;
}

.button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn-down {
  background: rgba(255, 255, 255, 0.233);
  border: 1.4px solid black;
  border-radius: 5px;
  color: rgba(10, 10, 10, 0.65);
  font-size: 19px;
  line-height: 2em;
  width: 14%;
  font-family: Raleway !important;
  margin-right: 30px;
  margin-bottom: 30px;
  margin-top: 5px;
}

.btn-down:hover {
  background: rgba(255, 255, 255, 0.39);
  color: rgba(10, 10, 10, 0.774);
  font-weight: bold;
  transition: all 0.4s ease;
}

.flex {
  display: flex;
}

</style>
