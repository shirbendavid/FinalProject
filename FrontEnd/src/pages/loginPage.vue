<template>
  <div class="login-container">
    <br />
    <br />
    <div class="bold-line_login"></div>
    <div class="container2_login">
      <div class="window_login">
        <div class="overlay_login"></div>
        <div class="content_login">
          <div class="welcome_login">Please log in!</div>
          <br />
          <b-form @submit.prevent="onLogin">
            <b-form-group
              id="input-group-email"
              label-cols-sm="3"
              label="Email"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="$v.form.email.$model"
                type="text"
                :state="validateState('email')"
              ></b-form-input>
              <b-form-invalid-feedback>
                email is required
              </b-form-invalid-feedback>
            </b-form-group>

            <button
              type="submit"
              variant="primary"
              style="width: 100%; display: block;"
              class="ghost-round full-width"
            >
              Login
            </button>
            <div class="mt-2">
              Do not have an account yet?
              <router-link
                to="register"
                style="color: #d85416; font-size: 19px;"
                ><b>Register here</b></router-link
              >
            </div>
            <br />
            <br />
          </b-form>
          <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show
          >
            Login failed: {{ form.submitError }}
          </b-alert>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post(
          this.$root.store.base_url + "/Login",
          {
            email: this.form.email,
          }
        );
        this.$root.loggedIn = true;
        let saveEmail = this.form.email.toLowerCase();
        console.log(saveEmail);
        this.$root.store.login(
          saveEmail,
          response.data["firstname"],
          response.data["playAdvancedGame"]
        );

        // store number of images rating to user and nimumn number images to rate
        let numberOfImages;
        let params;
        try {
          numberOfImages = await this.axios.get(
            this.$root.store.base_url + "/users/numberOfImages"
          );
          params = await this.axios.get(
            this.$root.store.base_url + "/users/getAllParams"
          );
          this.$root.store.addNumberOfImagesRating(numberOfImages.data.length);
          this.$root.store.addMinImagesRating(
            params.data[0].minimum_images_rating
          );
          this.$root.store.addNumberOfImagesInDB(
            params.data[1].number_of_images_in_DB
          );
          this.$root.store.addNumberOfImagesInGame(
            params.data[0].images_in_game
          );
          this.$root.store.addNumberOfScreensInGame(
            params.data[0].screens_in_game
          );
          this.$root.store.addLimitSelectInGame(
            params.data[0].images_selectes_in_game
          );
        } catch (error) {
          console.log(
            "error.numberOfImages.status",
            error.numberOfImages.status
          );
          this.$router.replace("/NotFound");
          return;
        }
        if (
          this.$root.store.numberOfImagesRating ===
          this.$root.store.minImagesRating
        )
          this.$router.push("/afterLogin");
        else if (
          this.$root.store.numberOfImagesRating >
          this.$root.store.minImagesRating
        )
          this.$router.push("/afterLogin");
        else this.$router.push("/observation");
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 403) this.$router.replace("/maintenance");
        this.form.submitError = err.response.data;
        console.log(err.response.data);
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    },
  },
};
</script>
<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Raleway);
body,
html {
  margin: 0;
  height: 100%;
}

input {
  border: none;
}

button:focus {
  outline: none;
}

::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.65);
}

::-webkit-input-placeholder .input-line:focus + ::input-placeholder {
  color: #fff;
}

.highlight {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  cursor: pointer;
  transition: color 0.2s ease;
}

.highlight:hover {
  color: #fff;
  transition: color 0.2s ease;
}

.spacing {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 120px;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.65);
}

.input-line:focus {
  outline: none;
  border-color: #fff;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.ghost-round {
  cursor: pointer;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 25px;
  color: rgba(10, 10, 10, 0.65);
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
  font-size: 19px;
  font-size: 1.2rem;
  font-family: Raleway !important;
  font-weight: 300;
  line-height: 2.5em;
  margin-top: auto;
  margin-bottom: 25px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.ghost-round:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.input-line {
  background: none;
  margin-bottom: 10px;
  line-height: 2.4em;
  color: #fff;
  font-family: Raleway !important;
  font-weight: 300;
  letter-spacing: 0px;
  letter-spacing: 0.02rem;
  font-size: 19px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.65);
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.full-width {
  width: 100%;
}

.input-fields {
  margin-top: 25px;
}

.content_login {
  padding-left: 25px;
  padding-right: 25px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
  -ms-flex-flow: column;
  flex-flow: column;
  z-index: 5;
}

.welcome_login {
  font-weight: 200;
  margin-top: 75px;
  text-align: center;
  font-size: 40px;
  font-size: 2.5rem;
  letter-spacing: 0px;
  letter-spacing: 0.05rem;
  color: black;
}

.menu_login {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
}

.window_login {
  z-index: 100;
  color: rgb(51, 51, 51);
  font-family: Raleway !important;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
  -ms-flex-flow: column;
  flex-flow: column;
  box-shadow: 0px 15px 50px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  //height: 860px;
  // width: 500px;
  background: #fff;
  // background: url("https://pexels.imgix.net/photos/27718/pexels-photo-27718.jpg?fit=crop&w=1280&h=823")
  //   top left no-repeat;
}

.overlay_login {
  background: -webkit-linear-gradient(#ccd2df, #6b656e);
  background: linear-gradient(#e9c9b5c5, #f3c48ec7);
  opacity: 0.95;
  filter: alpha(opacity=85);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
  border-radius: 15px;
}

.bold-line_login {
  background: #e7e7e7;
  position: absolute;
  top: 0px;
  bottom: 0px;
  margin: auto;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
  background-size: cover;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

@media (max-width: 600px) {
  .window_login {
    width: 100%;
    height: 100%;
  }
  .overlay_login {
    width: 100%;
    height: 100%;
  }
}
</style>
