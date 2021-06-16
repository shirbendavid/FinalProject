<template>
  <div class="admin-login-container">
    <br />
              <router-link to="/" >
          <b-button variant="outline-secondary" class="btn-x">
         HOME
          </b-button>
        </router-link>
        <br>
      <div class="admin-login-window">
        <div class="admin-login-overlay"></div>
        <div class="content">     
               <div class="welcome">Welcome!</div>
          <div class="subtitle">Log into the management portal.</div>
          <br />
          <b-form @submit.prevent="onLogin">
            <b-form-group
              id="input-group-email"
              label-cols-sm="3"
              label="Email"
              class="labels"
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

            <b-form-group
              id="input-group-Password"
              label-cols-sm="3"
              label="Password"              
              class="labels"
              label-for="Password"
            >
              <b-form-input
                id="Password"
                type="password"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback>
                Password is required
              </b-form-invalid-feedback>
            </b-form-group>

            <button
              type="submit"
              variant="primary"
              style="width: 90%; display: block;"
              class="ghost-round full-width"
            >
              Login
            </button>
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


  <br/>
</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "LoginManage",
  data() {
    return {
      form: {
        email: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
      },
      password: {
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
        await this.axios.post(
          this.$root.store.base_url + "/LoginAdmin",
          {
            email: this.form.email,
            password: this.form.password,
            // withCredentials: true,
          }
        );
        this.$root.loggedIn = true;
        this.$root.store.loginAdmin(this.form.email);
        this.$router.push("/management");

      } catch (err) {
        console.log(err.response);
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
  created() {
    if(localStorage.getItem("emailAdmin") && this.$cookies.get('session'))
      this.$router.push("/management");
  },
};
</script>
<style lang="scss">

.admin-login-container {
  max-width: 500px;
  margin-left: 30%;
}


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
  color: rgba(255, 255, 255, 0.829);
  font-weight: 400;
  cursor: pointer;
  transition: color 0.2s ease;
}

.highlight:hover {
  color: #fff;
  transition: color 0.2s ease;
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
  border: 1px solid black;
  border-radius: 15px;
  color: rgba(10, 10, 10, 0.65);
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
  font-size: 19px;
  font-weight: 300;
  line-height: 2.5em;
  margin-bottom: 25px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-family: Raleway !important;
  margin-top: 40px;
  margin-left: 20px;
}

.ghost-round:hover {
  background: rgba(255, 255, 255, 0.267);
  color: black;
  font-weight: bold;
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

.content {
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
  color: rgb(34, 34, 34);
  font-weight: bold;
}

.welcome {
  font-weight: 200;
  margin-top: 60px;
  text-align: center;
  font-size: 45px;
  font-size: 2.5rem;
  letter-spacing: 0px;
  letter-spacing: 0.05rem;
  color: black;
  font-family: Raleway !important;
}

.subtitle {
  text-align: center;
  line-height: 1em;
  font-weight: 100;
  letter-spacing: 0px;
  letter-spacing: 0.02rem;
  color: rgb(34, 34, 34);
  font-weight: bold;
  font-family: Raleway !important;
  font-size: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.menu {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
}

.admin-login-window {
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
  border-radius: 5px;
  background-color: rgba(251, 241, 226, 0.555);
}

.admin-login-overlay {
  background: -webkit-linear-gradient(#ccd2df, #6b656e);
  background: linear-gradient(#eba980c5, #f3c48ec7);
  opacity: 50%;
  filter: alpha(opacity=85);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
  border-radius: 15px;
}

.bold-line {
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

.labels {
    font-family: Raleway !important;
}
.btn-x {
  width:7%;
  margin-top: 1%;
  margin-right: 90%;
  position: absolute;
  top: 0;
  right: 0;
  font-family: Raleway !important;
}

@media (max-width: 600px) {
  .window {
    width: 100%;
    height: 100%;
  }
  .overlay {
    width: 100%;
    height: 100%;
  }
}
</style>
