<template>
  <div class="rank-container">
    <transition name="fade">
      <div class="rank-popup-modal" v-if="isVisible">
        <div class="rank-window" style="max-width: 700px; max-height: 300px;">
          <slot>
            <h1
              class="titlerat"
              style="text-align: center; direction: RTL; font-size: 30px;"
            >
              הגעתם לשלב הדירוג!
            </h1>

            <p class="textrat" style="direction: RTL;">
              כעת, עליכם לתת לכל אחת מהתמונות ציון המשקף עד כמה אתם אוהבים אותן.
              <br />
              אנחנו ממליצים שתנסו להשתמש בכל סולם הציונים- מהגבוהים, עבור תמונות
              שאתם אוהבים מאוד ועד הנמוכים, עבור תמונות שאתם פחות אוהבים.
            </p>
            <b-row>
              <b-col></b-col>
              <b-col lg="4" class="pb-2"
                ><b-button class="b-obs" block @click="closeStart()"
                  >התחל</b-button
                ></b-col
              >
              <b-col></b-col>
            </b-row>
          </slot>
        </div>
      </div>
    </transition>

    <div class="flex-container-rate" v-if="rate">
      <div class="flex-item-rate">
        <div class="my_space"></div>
        <b-row>
          <b-col>
            <div class="image-container">
              <b-img v-bind="mainProps" :src="image" class="center-rate" />
            </div>
          </b-col>
        </b-row>

        <div class="scale">
          <b-row>
            <b-col class="foreword">
              <div class="label1">Not at all</div>
            </b-col>

            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="1"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio1">1</label>
            </b-col>

            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="2"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio2">2</label>
            </b-col>
            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="3"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio3">3</label>
            </b-col>
            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio4"
                value="4"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio4">4</label>
            </b-col>
            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio5"
                value="5"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio5">5</label>
            </b-col>
            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio6"
                value="6"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio6">6</label>
            </b-col>
            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio7"
                value="7"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio7">7</label>
            </b-col>
            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio8"
                value="8"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio8">8</label>
            </b-col>
            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio9"
                value="9"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio9">9</label>
            </b-col>
            <b-col class="foreword">
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio10"
                value="10"
                aria-label="..."
                v-model="value"
              />
              <br />
              <label for="inlineRadio10">10</label>
            </b-col>
            <b-col class="foreword">
              <div class="label2">Very much</div>
            </b-col>
          </b-row>
        </div>
        <b-row>
          <b-col>
            <div v-if="!lessThanMinimum" class="rating-status">
              Image {{ this.$root.store.numberOfImagesRating }}
            </div>
            <div v-if="lessThanMinimum" class="rating-status">
              Image {{ this.$root.store.numberOfImagesRating }} /
              {{ this.$root.store.minImagesRating }}
            </div>
          </b-col>
          <b-col lg="6" class="pb-2">
            <b-button class="b-obs next-btn" block @click="saveImageRate()">
              NEXT
            </b-button>
          </b-col>
          <b-col></b-col>
          <b-col class="pb-8" v-if="!lessThanMinimum">
            <b-button class="b-obs game-btn" @click="StartPlay()">Game</b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="rank-container">
      <transition name="fade">
        <div class="popup-modal" v-if="enoughImages">
          <div class="rank-window" style="max-width: 900px;">
            <slot>
              <p class="textrat">
                .יפה מאוד, נתת ציונים ל-{{
                  this.$root.store.minImagesRating
                }}
                תמונות, שזה המינימום הנדרש להשתתפות במשחק
                <br />
                ככל שיהיו לנו יותר תמונות עם הציונים שלך, כך ישתפרו סיכוייך
                להצליח במשחק
                <br />
                .אנא בחר את העדפתך
                <br />
              </p>
              <h3 class="titlerat">!בהצלחה</h3>
              <br />
              <b-row>
                <b-col>
                  <b-button @click="close()">
                    המשך בדירוג
                  </b-button>
                </b-col>
                <b-col></b-col>
                <b-col>
                  <b-button @click="StartPlay()">
                    התחל במשחק
                  </b-button>
                </b-col>
              </b-row>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      image: "",
      image_id: "",
      enoughImages: false,
      isVisible: true,
      rate: false,
      lessThanMinimum: true,
    };
  },
  methods: {
    // add rate image to DB for this user
    async saveImageRate() {
      try {
        let response = await this.axios.get(
          this.$root.store.base_url +
            "/users/saveRate/image/" +
            this.image_id +
            "/rate/" +
            this.value
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
        else {
          this.value = "";

          const numberOfImagesRating =
            this.$root.store.numberOfImagesRating + 1;
          this.$root.store.addNumberOfImagesRating(numberOfImagesRating);

          if (
            this.$root.store.numberOfImagesRating ===
            this.$root.store.minImagesRating
          )
            this.enoughImages = true;
          else {
            this.getNextImage();
          }
        }

        if (
        this.$root.store.numberOfImagesRating >=
        this.$root.store.minImagesRating
      ) {
        this.lessThanMinimum = false;
      } else this.lessThanMinimum = true;

      } catch (error) {
        console.log(error);
      }
    },
    async getNextImage() {
      if (
        this.$root.store.numberOfImagesRating ===
        this.$root.store.numberOfImagesInDB
      ) {
        this.$alert(
          "You ranked the maximum amount of images, transferred to the game"
        );
        this.$router.replace("/game");
      }
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.base_url + "/users/getImageToRate"
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        this.$router.replace("/NotFound");
        return;
      }
      this.image_id = response.data.imageID;
      this.image = response.data.image;
    },
    open() {
      this.isVisible = true;
    },

    closeStart() {
      this.isVisible = false;
      this.rate = true;
    },
    close() {
      this.isVisible = false;
      this.rate = true;
      this.enoughImages = false;
      this.getNextImage();
    },
    StartPlay() {
      this.$router.replace("/game");
    },
  },
  async created() {
    //  get image from server
    if (this.$root.store.email) {
      if (
        this.$root.store.numberOfImagesRating ===
        this.$root.store.numberOfImagesInDB
      ) {
        this.$alert(
          "You ranked the maximum amount of images, transferred to the game"
        );
        this.$router.replace("/game");
      }

      if (
        this.$root.store.numberOfImagesRating >=
        this.$root.store.minImagesRating
      ) {
        this.lessThanMinimum = false;
      } else this.lessThanMinimum = true;

      let response;
      try {
        response = await this.axios.get(
          this.$root.store.base_url + "/users/getImageToRate"
        );
        if (response.status === 201) this.$router.replace("/game");
        else if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        this.$router.replace("/NotFound");
        return;
      }
      this.image_id = response.data.imageID;
      this.image = response.data.image;
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss">

.flex-item-rate {
  padding: 1px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}
.rank-container {
  color: black;
  font-size: 16px;
  width: 70%;
  padding-left: 10%;
  padding-right: 10%;
  overflow: hidden;
  margin: auto;
  align-content: center;
  align-self: center;
  justify-content: center;
}

input[type="radio"] {
  border: 1px;
  width: 18px;
  height: 21px;
}

label {
  font-size: 15px;
  font-family: Arial;
  line-height: 8%;
}

.label1 {
  font-size: medium;
  color: black;
  width: 68px;
  margin-right: 6px;
}

.label2 {
  font-size: medium;
  width: 85px;
  color: black;
  margin-left: 6px;
}

.rating-status {
  font-size: medium;
  color: rgba(136, 136, 136, 0.877);
  margin-left: -6px;
  margin-top: 16px;
}

.title {
  color: black;
  font-family: Special Elite;
  width: 80%;
}

.scale {
  width: 100%;
  margin-left: 14px;
}

.center-rate {
  margin-left: 30%;
  margin-top: 0;
  margin-bottom: 0;
  max-width: 115%;
  max-height: 100%;
  border-radius: 5px;
}

.favorite_icon:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.foreword {
  column-count: 1;
  margin: 0 auto;
  padding: 0;
  -moz-column-count: 1;
  -webkit-column-count: 1;
  column-width: 1%;
  margin-top: 8px;
}

b-col {
  column-width: 1%;
}

.forewordimage-rate {
  // column-count: -1;
  // margin: 0 auto;
  // -moz-column-count: 2;
  // -webkit-column-count: 2;
}

.subtitle {
  font-size: 25px;
  color: #7a5699e8;
}

.wrapper {
  display: flex;
}

.wrapped {
  width: 50%;
}

.buttons {
  padding-top: 4px;
}

.next-btn {
  width: 50%;
  height: 80%;
  margin-left: 32%;
  padding: 0px !important;
}

.game-btn {
  width: 90%;
  height: 65%;
  margin-left: 40% !important;
  margin-right: 0 !important;
  background-color: rgba(163, 163, 163, 0.911);
  color: white;
  font-weight: bold;
  border-radius: 5px;
  padding-bottom: 15px !important;
}

.rank-popup-modal {
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

.rank-window {
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: right;
  color: black;
  margin: auto;

  border: 3px solid rgba(143, 241, 216, 0.87);
  border-radius: 2px;
  padding: 1.1rem;
  background-color: rgba(251, 241, 226, 0.897);
}

.button {
  border-radius: 5px;
  font-size: 20px;
  width: 160px;
  margin-left: 40px;
}

.btn {
  margin-top: 8px;
}

.titlerat {
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: black;
  margin-bottom: 20px;
}

.textrat {
  font-size: large;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: right;
  color: black;
}

.btn-x {
  width: 7%;
  margin-top: 1%;
  margin-right: 2%;
  position: absolute;
  top: 0;
  right: 0;
}

.pb-2 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  width: 100px !important;
}

.my_space {
  height: 5px;
}

.inlineRadioOptions {
  margin-bottom: -5px;
}

.image-container {
  width: 500px !important;
  height: 380px !important;
  // align-content: center;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin-left: 2% !important;
}

</style>
