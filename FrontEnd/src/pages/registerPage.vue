<template>
<div class="container">

  <div class="main-container">
       
    
    <!-- <div class="bold-line"></div> -->
    <div class="containerr" v-if="regis">
      <div class="window">
        <div class="overlay"></div>
        <div class="content">
          <div class="welcome">Hello There!</div>
          <div class="subtitle">
            We're almost done.
            <br />
            You need to create an account.
          </div>
          <br />

          <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
            <b-form-group
              id="input-group-email"
              label-cols-sm="4"
              label="Email"
              label-for="email"
            >
              <b-form-input
                id="email"
                type="email"
                v-model="$v.form.email.$model"
                :state="validateState('email')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.email.required">
                Email address is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.email.email">
                Email is not a properly formatted email address
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-email-confirmEmail"
              label-cols-sm="4"
              label="Confirm Email"
              label-for="confirmEmail"
            >
              <b-form-input
                id="confirmEmail"
                type="email"
                v-model="$v.form.confirmEmail.$model"
                :state="validateState('confirmEmail')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.confirmEmail.required">
                Email address is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.confirmEmail.email">
                Email is not a properly formatted email address
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.confirmEmail.sameAsEmail">
                Email addresses must match
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-firstName"
              label-cols-sm="4"
              label="First Name"
              label-for="firstName"
            >
              <b-form-input
                id="firstName"
                v-model="$v.form.firstName.$model"
                type="text"
                :state="validateState('firstName')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.firstName.required">
                First name is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-lastName"
              label-cols-sm="4"
              label="Last Name"
              label-for="lastName"
            >
              <b-form-input
                id="lastName"
                v-model="$v.form.lastName.$model"
                type="text"
                :state="validateState('lastName')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.lastName.required">
                Last name is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-gender"
              label-cols-sm="4"
              label="Gender"
              label-for="gender"
            >
              <b-form-select
                id="gender"
                v-model="$v.form.gender.$model"
                :options="genders"
                :state="validateState('gender')"
              ></b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.gender.required">
                gender is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-age"
              label-cols-sm="4"
              label="Age"
              label-for="age"
            >
              <b-form-input
                id="age"
                v-model="$v.form.age.$model"
                type="text"
                :state="validateState('age')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.age.required">
                age is required
              </b-form-invalid-feedback>
            </b-form-group>

            <!-- <b-form-group
              id="input-group-Password"
              label-cols-sm="3"
              label="Password"
              label-for="password"
            >
              <b-form-input
                id="password"
                type="password"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.password.required">
                Password is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.password.length">
                Have length between 5-10 characters long
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.password.containsSpecial">
                The password must contain at least: one special character
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.password.containsNumber">
                The password must contain at least: one number
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-confirmedPassword"
              label-cols-sm="3"
              label="Confirm Password"
              label-for="confirmedPassword"
            >
              <b-form-input
                id="confirmedPassword"
                type="password"
                v-model="$v.form.confirmedPassword.$model"
                :state="validateState('confirmedPassword')"
              ></b-form-input>
              <b-form-invalid-feedback
                v-if="!$v.form.confirmedPassword.required"
              >
                Password confirmation is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-else-if="!$v.form.confirmedPassword.sameAsPassword"
              >
                The confirmed password is not equal to the original password
              </b-form-invalid-feedback>
            </b-form-group> -->

            <button
              type="submit"
              variant="primary"
              style="width: 100%;"
              class="ghost-round full-width"
            >
              Create Account
            </button>
            <!-- <br />
            <b-button
              type="reset"
              variant="danger"
              style="border-radius: 25px;  background-color: #d85416;"
            >
              Reset
            </b-button> -->

            <div >
              You have an account already?
              <router-link to="login" style="color: #d85416; font-size: 19px;"
                ><b>Log in here</b></router-link
              >
              <br />

            </div>
          </b-form>
          <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show
          >
            Register failed: {{ form.submitError }}
          </b-alert>
        </div>
      </div>
    </div>
      <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="window1" style="overflow-y:scroll; height:550px; max-width: 950px;">
                <slot>   
                      
                <p class="text" style="color: black; text-align: center;">
                      <img src='../assets/new logo.png' class="center" style="width: 30%; height:30%;" />
                  <br>
                  ברוכים הבאים למשחק העדפת תמונות
                  <br/>
                  .המשחק נערך במסגרת פרויקט גמר במחלקה להנדסת מערכות תוכנה ומידע
                  <br/><br/>
                  <u>:המשחק מחולק לשני שלבים</u>
                  <br/>
                  בשלב הראשון, עליכם לצפות ב-60 תמונות לפחות ולתת להן ציון לפי סולם של 10 דרגות שמבטא עד
                  <br/>
                  כמה אתם אוהבים את התמונה. שלב זה נמשך כ-10 דקות. חשוב שתתנו ציונים המשקפים את העדפותיכם
                  <br/>
                  .כי המשחק תלוי בכך שבהמשך תזהו אילו תמונות אהבתם יותר ואילו פחות
                  <br/><br/>
                  בשלב השני, לאחר דירוג התמונות אתם מוזמנים לשחק במשחק. בכל פעם שתיכנסו למערכת יוצגו בפניכם
                  <br/>
                  ארבעה מסכים שבכל אחד מהם מספר תמונות מתוך אלו שראיתם בשלב הראשון. האתגר הוא לזהות  
                  <br/>
                  .ולבחור בכל אחד מהמסכים את התמונות להן נתתן את הציונים הגבוהים ביותר בשלב הקודם
                  <br/>
                  .על כל בחירה נכונה תזכו בנקודה
                  <!-- <br/><br/>
                  המטרה היא לצבור כמה שיותר נקודות במהלך תקופת המשחק. אנא התאמצו ככל האפשר כדי שתהיה לנו
                  <br/>
                  תחרות מעניינת! אתם מוזמנים לשחק במשחק פעם אחת בכל יום, במהלך כל התקופה בה יהיה המשחק
                  <br/>
                  .זמין. לא ניתן לשחק במשחק יותר מאשר פעם אחת ביום
                  <br/> -->
                  כדי לאפשר משחק בהתאם לכללים, וכדי לאפשר קשר אתכם במהלך תקופת המשחק, נבקשכם לציין כתובת
                  של דואר אלקטרוני באמצעותה נוכל לשלוח לכם הודעות (למשל, תזכורת במידה ועברו מספר ימים מאז ששיחקתם לאחרונה). מעבר לכך, אין צורך באמצעי הזדהות כלשהו. אתם יכולים גם לבחור בעצמכם כינוי
                  .שיאפשר לכם לזהות את עצמכם בטבלת השחקנים המצטיינים
                  <br/><br/>
                  <u>:אנו מתחייבים</u>
                  <br/>
                  <ul style="direction: RTL; text-align: right;">
                    <li>לעדכן אתכם לגבי ההישג שלכם במשחק עם סיום תקופת המשחק.
                    </li>
                    <li>כל הנתונים על המשחק יישמרו על מחשב מאובטח וישמשו אך ורק לניתוחים סטטיסטיים.
                      <br/>
                      בשום אופן לא יפורסמו נתונים אישיים לגביכם.
                    </li>
                  </ul>
                  <br/>
                   אני מסכים/ה להשתתף במשחק העדפת התמונות בהתאם לתנאים שפורטו לעיל
                    
                  <!-- <b-button class="buttonb" size="lg" @click="close()">
                    מאשר/ת הסכמה 
                  </b-button> -->
   <br/>   
   <br/>
<b-row>
  <b-col ></b-col>
  <b-col lg="6" class="pb-2"><b-button block @click="close()">מאשר/ת הסכמה</b-button></b-col>
  <b-col></b-col>
</b-row>
                </p>
                </slot>
                    </div>
                </div>
            </transition>
    <br />
  </div>
</div>
  
</template>

<script>
import {
  required,
  email,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  name: "register",
  data() {
    return {
      isVisible: true,
      regis:false,
      form: {
        firstName: "",
        lastName: "",
        gender: null,
        age: "",
        email: "",
        confirmEmail: "",
        submitError: undefined,
      },
      genders: [
        { value: null, text: "", disabled: true },
        { value: "female", text: "female", disabled: false },
        { value: "male", text: "male", disabled: false },
      ],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      confirmEmail: {
        required,
        email,
        sameAsEmail: sameAs("email"),
      },
      gender: {
        required,
      },
      age: {
        required,
      },
    },
  },
  mounted() {
    // console.log("mounted");
    // this.countries.push(...countries)
    // console.log($v);
  },
  methods: {
    open() {
            this.isVisible = true
        },

        close() {
            this.isVisible = false
            this.regis=true
        },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    
    async Register() {
      try {
        const response = await this.axios.post(
          this.$root.store.base_url + "/Registration",
          {
            email: this.form.email,
            firstname: this.form.firstName,
            lastname: this.form.lastName,
            gender: this.form.gender,
            age: this.form.age,
            // password: this.form.password,
          }
        );
        console.log(response);
        this.$router.push("/Login");
      } catch (err) {
        console.log(err.response);
        // this.form.submitError = err.response.data.message
        this.form.submitError = err.response.data;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        email: "",
        firstName: "",
        lastName: "",
        gender: null,
        age: "",
        confirmEmail: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.containerr {
  width: 40%;
}

// @import url(https://fonts.googleapis.com/css?family=Raleway);
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
  font-family: Raleway;
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
  font-family: Raleway;
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
  // padding-left: 25px;
  // padding-right: 25px;
  width: 80%;
  // display: -webkit-box;
  // display: -webkit-flex;
  // display: -ms-flexbox;
  // display: flex;
  // -webkit-flex-flow: column;
  // -ms-flex-flow: column;
  // flex-flow: column;
  z-index: 5;
  margin-top: 0px;
}

.welcome {
  // font-weight: 200;
  // margin-top: 20px;
  text-align: center;
  font-size: 40px;
  font-size: 2.5rem;
  letter-spacing: 0px;
  letter-spacing: 0.05rem;
  color: black;
}

.subtitle {
  font-size: 20px;
  text-align: center;
  line-height: 1em;
  font-weight: 100;
  letter-spacing: 0px;
  letter-spacing: 0.02rem;
  color: rgb(34, 34, 34);
}

.menu {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50%;
}

.window {
  z-index: 100;
  color: rgb(51, 51, 51);
  font-family: Raleway;
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
.buttonb {
    float: center;
    align-items: center;
    width: 170px;
    font-size: 25px;
}

.overlay {
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

.bold-line {
  background: #e7e7e7;
  position: absolute;
  top: 0px;
  bottom: 0px;
  margin: auto;
  //width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
  // background: url("https://pexels.imgix.net/photos/27718/pexels-photo-27718.jpg?fit=crop&w=1280&h=823")
  //   left no-repeat;
  background-size: cover;
}
.container {
  width: 100%;
  height: 100%;
}

  .window {
    width: 100%;
    height: 100%;
  }
  .overlay {
    width: 100%;
    height: 100%;
  }
  .window1 {
    background: #f8dbbad3;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 1000px;
    //max-height: 1500px;
    margin-left: auto;
    margin-right: auto;
    padding: 1.1rem;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border: 1.5px solid;
    text-align: right;
    color: black;
    //window.scrollBy(0,100);
}
  .popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    z-index: 1;

}

</style>
