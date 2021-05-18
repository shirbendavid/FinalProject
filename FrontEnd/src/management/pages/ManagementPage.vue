<template>
    <div :style="image">

      <div class="container">
      
        <router-link to="/" >
          <b-button class="button"
                    color="primary" 
                    @click="Logout()">
          Home
          </b-button>
        </router-link>
        <br>
            <h1 class="title">Managment Portal</h1>

        <br/>

        <ParameterManage/>

        <br/>
        
      <div class="flex">
        <button class="btn-down" tag="b-nav-item" @click="openUsersTable()">
          Users Table
        </button>
        <br/>
        <br/>

        <button class="btn-down" tag="b-nav-item" @click="openReports()">
          Reports
        </button>
      </div>

        <transition name="fade">
            <div class="popup-modal" v-if="isVisibleUsersTable">
                <div class="window" style="overflow-y: scroll; max-height:90%; margin-top: 50px; margin-bottom:50px;">
                    <slot>
                      <button class="button-x" tag="b-nav-item" @click="closeUsersTable()">
                        X
                      </button>
                      <FollowExperiment/>
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
                      <br/>
                      <b-row>
                        <b-col>
                           <InitialRatingUsers/>   
                        </b-col>
                        <b-col>
                            <InitialRatingImages/>
                        </b-col>
                      </b-row>
                      <br/>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
  </div>
</template>

<script>
import ParameterManage from '../components/parameterManage'
import FollowExperiment from '../components/followExperiment'
import InitialRatingUsers from '../components/initialRatingUsers'
import InitialRatingImages from '../components/initialRatingImages'
export default {
  data() {
    return {
      isVisibleUsersTable: false,
      isVisibleReports: false,
       image: {
        backgroundImage: "url(data:image/jpeg;base64,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)"
      },
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
    FollowExperiment,
    InitialRatingUsers,
    InitialRatingImages
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
.container{
  width: 100%;
  height: auto;
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
    overflow-y: initial !important
}
.title{
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
    /* background: rgb(241, 227, 207); */
}

.reports {
  width: 40%;
  background: rgba(255, 234, 204, 0.945);
} 

.title {
  margin-top: 0px;
}

image{
    width: 100%;
    height: 100%;
    max-height: 100%;
    margin: 0;
    padding: 0;
    background-size:100% 100%;
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
  font-family: "Merienda", Helvetica, Arial;
  margin-right: 30px;
  margin-bottom: 30px;
  margin-top: 5px;
}

.btn-down:hover {
  background: rgba(255, 255, 255, 0.39);
  color:  rgba(10, 10, 10, 0.774);
  font-weight: bold;
  transition: all 0.4s ease;
}

.flex {
    display: flex;
}

</style>