<template>
  <div class="container">
    <transition name="fade">
      <div class="observation-popup-modal" v-if="isVisible">
        <div class="observation-window" style=" height:550px; max-width: 900px;">
          <slot>
            <br />
            <h2 class="titleobs">תמונות להתרשמות</h2>
            <br />
            <p class="textobs">
              בשלב הראשון של המשחק, עליכם לצפות בלפחות
              {{ this.$root.store.minImagesRating }} תמונות, ולתת להן ציון שמשקף
              עד כמה
              <br />
              אתם אוהבים אותן. כאן, יש לכם אפשרות לצפות בחלק מהתמונות כשהן
              מוקטנות, כדי
              <br />
              שתוכלו להתרשם מרמת היופי הכללית של התמונות. אתם יכולים להשתמש בפס
              הגלילה כדי
              <br />
              .start rating לראות את כל התמונות. כשתסיימו להתרשם מאוסף התמונות,
              עליכם ללחוץ על כפתור
              <br /><br />
              כפתור זה יעביר אתכם למצב של הצגת תמונה בודדת בגודל גדול יותר.
              בתחתית המסך עליכם
              <br />
              .Next לסמן עד כמה אתם אוהבים את התמונה. כדי להמשיך לתמונה הבאה, יש
              ללחוץ כל כפתור
              <br />
              .בדרך זו, יתקבלו ציוניכם לכל
              {{ this.$root.store.minImagesRating }} התמונות <br /><br />
              כאשר תסיימו להעריך את
              {{ this.$root.store.minImagesRating }} התמונות תוכלו לבחור בין
              האפשרות לראות עוד תמונות ולתת
              <br />
              .להן ציונים או שתוכלו לבחור לעבור לשלב הבא
            </p>

            <h3 class="titleobs">!בהצלחה</h3>
            <br />

            <b-row>
              <b-col></b-col>
              <b-col lg="7" class="pb-2"
                ><b-button class="titleobs" block @click="close()"
                  >אישור</b-button
                ></b-col
              >
              <b-col></b-col>
            </b-row>
          </slot>
        </div>
      </div>
    </transition>
    <b-container class="sizeAll">
      <br />

      <b-row>
        <b-col class="pa-3">
          <b-img
            :src="image1"
            style="width: 90%; height:90%;"
            aspect-ratio="1.4"
            contain
          ></b-img>
        </b-col>
        <b-col class="pa-3">
          <b-img
            :src="image2"
            style="width: 90%; height:90%;"
            aspect-ratio="1.4"
            contain
          ></b-img>
        </b-col>
        <b-col class="pa-3">
          <b-img
            :src="image3"
            style="width: 90%; height:90%;"
            aspect-ratio="1.4"
            contain
          ></b-img>
        </b-col>
        <b-col class="pa-3">
          <b-img
            :src="image4"
            style="width: 90%; height:90%;"
            aspect-ratio="1.4"
            contain
          ></b-img>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col class="pa-3">
          <img :src="image5" style="width: 90%; height:90%;" />
        </b-col>
        <b-col class="pa-3">
          <img :src="image6" style="width: 90%; height:90%;" />
        </b-col>
        <b-col class="pa-3">
          <img :src="image7" style="width: 90%; height:90%;" />
        </b-col>
        <b-col class="pa-3">
          <img :src="image8" style="width: 90%; height:90%;" />
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col class="pa-3">
          <img :src="image9" style="width: 90%; height:90%;" />
        </b-col>
        <b-col class="pa-3">
          <img :src="image10" style="width: 90%; height:90%;" />
        </b-col>
        <b-col class="pa-3">
          <img :src="image11" style="width: 90%; height:90%;" />
        </b-col>
        <b-col class="pa-3">
          <img :src="image12" style="width: 90%; height:90%;" />
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col class="pa-3">
          <img :src="image13" style="width: 90%; height:90%;" />
        </b-col>
        <b-col class="pa-3">
          <img :src="image14" style="width: 90%; height:90%;" />
        </b-col>
        <b-col class="pa-3">
          <img :src="image15" style="width: 90%; height:90%;" />
        </b-col>
        <b-col class="pa-3">
          <img :src="image16" style="width: 90%; height:90%;" />
        </b-col>
      </b-row>
      <!-- <br/> -->
    </b-container>
    <router-link to="/ranking">
      <div>
        <b-button class="b-rate" size="lg">
          Start Rating
        </b-button>
      </div>
    </router-link>
    <br /><br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
      image6: "",
      image7: "",
      image8: "",
      image9: "",
      image10: "",
      image11: "",
      image12: "",
      image13: "",
      image14: "",
      image15: "",
      image16: "",
      isVisible: true,
    };
  },

  methods: {
    open() {
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },
  },
  async created() {
    if (this.$root.store.email) {
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.base_url + "/images/getImages/amount/" + 16
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      const images = response.data;
      this.image1 = images[0];
      this.image2 = images[1];
      this.image3 = images[2];
      this.image4 = images[3];
      this.image5 = images[4];
      this.image6 = images[5];
      this.image7 = images[6];
      this.image8 = images[7];
      this.image9 = images[8];
      this.image10 = images[9];
      this.image11 = images[10];
      this.image12 = images[11];
      this.image13 = images[12];
      this.image14 = images[13];
      this.image15 = images[14];
      this.image16 = images[15];
    } else {
      this.$router.push("/login");
    }
  },
};
</script>
<style lang="scss">
/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.observation-popup-modal {
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

.observation-window {
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

.titleobs {
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: black;
}

.textobs {
  font-size: large;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: right;
  color: black;
}

.b-rate {
  float: right;
  margin-right: 45%;
  width: 170px;
  font-size: 25px;
  margin-bottom: 20px;
}

.b-obs {
  font-size: large;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: black;
}
.sizeAll {
  width: 100%;
  height: auto;
}
</style>
