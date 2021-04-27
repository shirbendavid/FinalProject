import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import VueSelectImage from 'vue-select-image';
Vue.use(VueSelectImage);
import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);

require('vue-select-image/dist/vue-select-image.css');

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import VueCookies from "vue-cookies";
Vue.use(VueCookies);

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  FormRadioPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
  FormRatingPlugin,
  InputGroupPlugin,
  ImagePlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  FormRadioPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
  FormRatingPlugin,
  InputGroupPlugin,
  ImagePlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response.status == 401) {
      router.push({ name: "login" }).catch(() => {});
    }

    return Promise.reject(error);
  }
);
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  // base_url: "https://icc.ise.bgu.ac.il/coil",
  base_url: "http://localhost:3000",
  email: localStorage.email,
  numberOfImagesInGame: localStorage.numberOfImagesInGame
  ? JSON.parse(localStorage.numberOfImagesInGame)
  : [],
  addNumberOfImagesInGame(numberOfImagesInGame) {
    localStorage.setItem("numberOfImagesInGame", JSON.stringify(numberOfImagesInGame));
    this.numberOfImagesInGame = numberOfImagesInGame;
  },
  numberOfScreensInGame: localStorage.numberOfScreensInGame
  ? JSON.parse(localStorage.numberOfScreensInGame)
  : [],
  addNumberOfScreensInGame(numberOfScreensInGame) {
    localStorage.setItem("numberOfScreensInGame", JSON.stringify(numberOfScreensInGame));
    this.numberOfScreensInGame = numberOfScreensInGame;
  },
  limitSelectInGame: localStorage.limitSelectInGame
  ? JSON.parse(localStorage.limitSelectInGame)
  : [],
  addLimitSelectInGame(limitSelectInGame) {
    localStorage.setItem("limitSelectInGame", JSON.stringify(limitSelectInGame));
    this.limitSelectInGame = limitSelectInGame;
  },
  numberOfImagesRating: localStorage.numberOfImagesRating
  ? JSON.parse(localStorage.numberOfImagesRating)
  : [],
  addNumberOfImagesRating(numberOfImagesRating) {
    localStorage.setItem("numberOfImagesRating", JSON.stringify(numberOfImagesRating));
    this.numberOfImagesRating = numberOfImagesRating;
  },
  minImagesRating: localStorage.minImagesRating
  ? JSON.parse(localStorage.minImagesRating)
  : [],
  addMinImagesRating(minImagesRating) {
    localStorage.setItem("minImagesRating", JSON.stringify(minImagesRating));
    this.minImagesRating = minImagesRating;
  },
  numberOfImagesInDB: localStorage.numberOfImagesInDB
  ? JSON.parse(localStorage.numberOfImagesInDB)
  : [],
  addNumberOfImagesInDB(numberOfImagesInDB) {
    localStorage.setItem("numberOfImagesInDB", JSON.stringify(numberOfImagesInDB));
    this.numberOfImagesInDB = numberOfImagesInDB;
  },
  login(email, firstname) {
    localStorage.setItem("email", email);
    this.email = email;
    console.log("login", this.email);
    localStorage.setItem("firstname", firstname);
    this.firstname = firstname
  },
  loginAdmin(email) {
    localStorage.setItem("emailAdmin", email);
    this.emailAdmin = email;
    console.log("login admin", this.emailAdmin);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("email");
    localStorage.removeItem("firstname");
    localStorage.removeItem("minImagesRating");
    localStorage.removeItem("numberOfImagesRating");
    localStorage.removeItem("numberOfImagesInDB");
    localStorage.removeItem("numberOfImagesInGame");
    localStorage.removeItem("numberOfScreensInGame");
    localStorage.removeItem("limitSelectInGame");
    if(!localStorage.getItem("emailAdmin")){
      localStorage.removeItem("emailAdmin");
      Vue.$cookies.remove("session");
    }
    this.email = undefined;
  },
  logoutAdmin(){
    localStorage.removeItem("emailAdmin");
    Vue.$cookies.remove("session");
    this.emailAdmin=undefined;
  }
};
console.log(shared_data);

router.beforeEach((to, from, next) => {
  // if session expired or localStorage was deleted
  if (shared_data.email === undefined || !Vue.$cookies.get("session")) {
    if (
      (shared_data.email === undefined && shared_data.emailAdmin === undefined && Vue.$cookies.get("session")) ||
      (shared_data.email !== undefined && !Vue.$cookies.get("session"))
    ) {
      shared_data.logout();
    }

    // if the route requires Authorization, and user is not authorized, we redirect to login page
    if (to.matched.some((location) => location.meta.requiresAuth)) {
      next({ name: "login" });
    } else next();
  } else next();
});

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
