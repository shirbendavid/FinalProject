<template>
  <div class="d-flex flex-column justify-center align-center">
    <transition name="fade">
      <div class="popup-modal" v-if="isVisible">
        <div class="window" style=" height:450px; max-width: 680px;">
          <slot>
            <!-- <button class="btn-x"  tag="b-nav-item" @click="close()">
                            X
                        </button> -->
            <h2 class="titlegame">הגענו לשלב המשחק</h2>

            <p class="textgame" style="color: black; direction: RTL; ">
              כעת נציג לפניכם
              {{ this.$root.store.numberOfScreensInGame }} מסכים. בכל מסך יהיו
              {{ this.$root.store.numberOfImagesInGame }} תמונות מוקטנות אשר
              לקוחות מהתמונות שראיתם בשלב הקודם. מתוך
              {{ this.$root.store.numberOfImagesInGame }} התמונות עליכם יהיה
              לבחור את {{ this.$root.store.limitSelectInGame }} התמונות שאתם הכי
              אוהבים. המטרה בכל מסך היא לבחור את
              {{ this.$root.store.limitSelectInGame }} התמונות שקיבלו את הציונים
              הגבוהים ביותר בשלב דירוג התמונות. <br /><br />
              עבור כל תמונה שבחרתם נכון תקבלו נקודה. כמו כן, ניתן לבטל בחירה של
              תמונה מסוימת על ידי לחיצה נוספת עליה.
            </p>
            <h3 class="titlegame">!בהצלחה</h3>
            <br />
            <b-row>
              <b-col></b-col>
              <b-col
                ><b-button size="lg" class="b-game" block @click="close()"
                  >התחל</b-button
                ></b-col
              >
              <b-col></b-col>
            </b-row>
          </slot>
        </div>
      </div>
    </transition>

    <br />

    <router-link to="/">
      <b-button color="primary" class="btn-x">
        HOME
      </b-button>
    </router-link>
    <h3>
      <b>Page {{ screenNum }} / {{ screens }}</b>
    </h3>
    <div class="d-flex flex-row justify-center align-center">
      <v-select-image
        ref="VSelectImage"
        class="w-1040"
        v-model="selectedItems"
        :items="items"
        :colorSchema="colorSchema"
        :h="100"
        uniqueKey="key"
        :maxSelectable="maxSelectable"
        @maxSelectionError="maxSelected()"
      />
    </div>
    <br />
    <b-button size="lg" class="btn" v-on:click="save" type="submit">
      NEXT
    </b-button>
  </div>
</template>

<script>
import VSelectImage from "../components/VSelectImage.vue";
export default {
  name: "App",
  components: { "v-select-image": VSelectImage },
  methods: {
    open() {
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },
    maxSelected() {
      this.$alert(
        "You can't select more than " + this.maxSelectable + " images.",
        "Error",
        "error"
      );
    },
    async save() {
      if (this.selectedItems.length < this.maxSelectable)
        this.$alert(
          "You need to select " + this.maxSelectable + " images",
          "Error",
          "error"
        );
      else {
        let scoreScreen = 0;
        let imagesSelect = "";
        for (let index in this.selectedItems) {
          if (this.selectedItems[index].target == true) scoreScreen++;
          imagesSelect = imagesSelect + this.selectedItems[index].key + ",";
        }
        this.score = this.score + scoreScreen;
        let saveScore;

        try {
          saveScore = await this.axios.get(
            this.$root.store.base_url +
              "/users/saveScoreScreen/gameID/" +
              this.gameID +
              "/numOfScreen/" +
              this.screenNum +
              "/imagesSelect/" +
              imagesSelect +
              "/score/" +
              scoreScreen
          );
          if (saveScore.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.saveScore.status", error.saveScore.status);
          this.$router.replace("/NotFound");
          return;
        }

        if (this.screenNum == this.screens) {
          let saveScoreGame;

          try {
            saveScoreGame = await this.axios.get(
              this.$root.store.base_url +
                "/users/saveScoreGame/gameID/" +
                this.gameID +
                "/score/" +
                this.score
            );
            if (saveScoreGame.status !== 200) this.$router.replace("/NotFound");

          } catch (error) {
            console.log(
              "error.saveScoreGame.status",
              error.saveScoreGame.status
            );
            this.$router.replace("/NotFound");
            return;
          }
          this.$alert(
            "Game Over! You earned " +
              this.score +
              " points today. See you tommorow!"
          ).then(() => {
            this.$router.push("/");
          });

        } else {
          this.$alert(
          "Your score in this round: " + scoreScreen + "/" + this.maxSelectable)
          .then(() => {           
             this.screenNum++;
            // this.$root.$children[0].clear();
            this.$refs.VSelectImage.clear();
            this.items = [];
            for (let num in this.allImages[this.index].imagesScreen) {
              const data = {
                key: this.allImages[this.index].imagesScreen[num].image_id,
                backgroundImage: this.allImages[this.index].imagesScreen[num]
                  .image,
                target: this.allImages[this.index].imagesScreen[num].target,
                selectable: true,
              };
              this.items.push(data);
            }
            this.index++;});
          // }
        }
        // });
      }
    },
  },
  data() {
    return {
      isVisible: true,

      maxSelectable: 2,
      selectedItems: [],
      items: [],
      colorSchema: "#00cc44",
      screenNum: 1,
      screens: "",
      score: 0,
      gameID: "",
      allImages: [],
      index: "",
    };
  },
  watch: {
    maxSelectable(newVal, oldVal) {
      if (newVal < this.selectedItems.length) {
        this.maxSelectable = oldVal;
      }
      if (this.items.length < newVal) {
        this.maxSelectable = oldVal;
      }
    },
  },
  async created() {
    if (this.$root.store.email) {
      if (
        this.$root.store.numberOfImagesRating < this.$root.store.minImagesRating
      ) {
        this.$alert(
          "You did not rate enough photos, please continue to rate...",
          "Error",
          "error"
        );
        this.$router.push("/ranking");
      } else {
        let playToday;
        try {
          playToday = await this.axios.get(
            this.$root.store.base_url + "/users/checkIfPlayToday"
          );
          if (playToday.status === 201) {
            //not finish to play today
            if (playToday.data[0].scoreGame == null) {
              this.screens = this.$root.store.numberOfScreensInGame;
              let response;
              try {
                response = await this.axios.get(
                  this.$root.store.base_url +
                    "/users/getScreensGame/gameId/" +
                    playToday.data[0].game_id
                );
                if (response.status !== 200) this.$router.replace("/NotFound");
              } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
              }
              this.allImages = response.data;
              this.gameID = playToday.data[0].game_id;
              this.screenNum = this.allImages[0].screen;
              //get score screens
              if (this.screenNum > 1) {
                let scoreScreens;
                try {
                  scoreScreens = await this.axios.get(
                    this.$root.store.base_url +
                      "/users/getScoreScreens/gameId/" +
                      this.gameID
                  );
                  if (scoreScreens.status !== 200)
                    this.$router.replace("/NotFound");
                } catch (error) {
                  console.log(
                    "error.scoreScreens.status",
                    error.scoreScreens.status
                  );
                  this.$router.replace("/NotFound");
                  return;
                }
                this.score = scoreScreens.data[0].score;
              }
              for (let num in this.allImages[0].imagesScreen) {
                const data = {
                  key: this.allImages[0].imagesScreen[num].image_id,
                  backgroundImage: this.allImages[0].imagesScreen[num].image,
                  target: this.allImages[0].imagesScreen[num].target,
                  selectable: true,
                };
                this.items.push(data);
              }
              this.index = 0;
              if (this.index + 1 < this.allImages.length) this.index++;
            } else {
              this.$alert(
                "You already played today, please come back tomorrow!",
                "Error",
                "error"
              );
              this.$router.replace("/");
            }
          } else if (playToday.status !== 200)
            this.$router.replace("/NotFound");
          else {
            //not play today
            const numberOfImages = this.$root.store.numberOfImagesInGame;
            const limit = this.$root.store.limitSelectInGame;
            this.screens = this.$root.store.numberOfScreensInGame;

            // this.maxSelectable = limit;
            // this.$emit('maxSelectable', 3);
            let response;
            try {
              response = await this.axios.get(
                this.$root.store.base_url +
                  "/users/getImagesForGame/amount/" +
                  numberOfImages +
                  "/numOfScreens/" +
                  this.screens +
                  "/numOfSelected/" +
                  limit
              );
              if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
              console.log("error.response.status", error.response.status);
              this.$router.replace("/NotFound");
              return;
            }

            this.allImages = response.data;
            this.gameID = this.allImages[this.screens];
            for (let num in this.allImages[this.screenNum - 1].imagesScreen) {
              const data = {
                key: this.allImages[this.screenNum - 1].imagesScreen[num]
                  .image_id,
                backgroundImage: this.allImages[this.screenNum - 1]
                  .imagesScreen[num].image,
                target: this.allImages[this.screenNum - 1].imagesScreen[num]
                  .target,
                selectable: true,
              };
              this.items.push(data);
            }
            this.index = this.screenNum;
          }
        } catch (error) {
          console.log("error.playToday.status", error.playToday.status);
          this.$router.replace("/NotFound");
          return;
        }
      }
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss">
.d-flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.justify-center {
  justify-content: center;
}
.align-center {
  align-items: center;
}
.w-1040 {
  max-width: 1040px;
}
.mt-20 {
  margin-top: 10px;
}
.mt-25 {
  margin-top: 10px;
}
pre {
  counter-reset: line-numbering;
  background: #2c3e50;
  padding: 12px 0px 14px 0;
  width: 600px;
  color: #ecf0f1;
  line-height: 100%;
}
pre code .line::before {
  content: counter(line-numbering);
  counter-increment: line-numbering;
  padding-right: 1em;
  /* space after numbers */
  padding-left: 8px;
  width: 1.5em;
  text-align: right;
  opacity: 0.5;
  color: white;
}

.item {
  margin: 5px !important;
  height: 220px !important;
  width: 250px !important;
  top: 10px !important;
  left: 10px !important;
}

.item .isSelectedBox {
  top: 10px !important;
  left: 10px !important;
}

.swal2-confirm .swal2-styled .button {
  width: 20px !important;
  height: 30px !important;
}
.container {
  width: 100%;
  height: 100%;
}
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
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  z-index: 1;
}

.window {
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  //max-height: 1500px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: right;
  color: black;
  margin: auto;
  position: relative;
  border: 3px solid rgba(143, 241, 216, 0.87);
  border-radius: 2px;
  padding: 1.1rem;
  background-color: rgba(251, 241, 226, 0.897);
}
.b-game {
  font-size: large;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: black;
}
.button {
  border-radius: 5px;
  font-size: 25px;
  width: 300px;
  margin-left: 100px;
}

.btn {
  margin-top: 8px;
}
.titlegame {
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: black;
}

.textgame {
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
</style>
