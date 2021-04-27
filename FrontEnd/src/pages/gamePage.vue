<template>
  <div class="d-flex flex-column justify-center align-center">
    {{ screenNum }} / {{ screens }}
    <div class="d-flex flex-row justify-center align-center">
      <v-select-image
        class="w-650"
        v-model="selectedItems"
        :items="items"
        :colorSchema="colorSchema"
        uniqueKey="key"
        :maxSelectable="maxSelectable"
        @maxSelectionError="maxSelected()"
      />
    </div>
    <b-button class="btn"
              v-on:click="save"
              type="submit" >
    Next
    </b-button>
  </div>
</template>

<script>
import VSelectImage from "../components/VSelectImage.vue";
export default {
  name: "App",
  components: { VSelectImage },
  methods: {
    maxSelected() {
      alert("You cant select more than " + this.maxSelectable);
    },
    async save(){
      if(this.selectedItems.length < this.maxSelectable)
        alert("You need to select " + this.maxSelectable + " images");
      else{
        console.log(this.selectedItems);
        let scoreScreen = 0;
        let imagesSelect = '';
        for(let index in this.selectedItems){
          if(this.selectedItems[index].target == true)
            scoreScreen++;
          imagesSelect = imagesSelect + this.selectedItems[index].key + ','; 
        }
        console.log('images selection:' +imagesSelect);
        this.score = this.score + scoreScreen;
        console.log(this.score);
        let saveScore;
        
        try {
          saveScore = await this.axios.get(
          this.$root.store.base_url +
              "/users/saveScoreScreen/gameID/"+this.gameID+
              "/numOfScreen/"+this.screenNum+"/imagesSelect/"+imagesSelect+
              "/score/" + scoreScreen
          );
          console.log(saveScore);
          if (saveScore.status !== 200) this.$router.replace("/NotFound");
          } catch (error) {
              console.log("error.saveScore.status", error.saveScore.status);
              this.$router.replace("/NotFound");
              return;
          }
          alert('Your score in this round: ' +scoreScreen + '/' + this.maxSelectable);
          if(this.screenNum == this.screens){
            let saveScoreGame;
        try {
          saveScoreGame = await this.axios.get(
          this.$root.store.base_url +
              "/users/saveScoreGame/gameID/"+this.gameID+"/score/"+this.score
          );
          console.log(saveScoreGame);
          if (saveScoreGame.status !== 200) this.$router.replace("/NotFound");
          } catch (error) {
              console.log("error.saveScoreGame.status", error.saveScoreGame.status);
              this.$router.replace("/NotFound");
              return;
          }
            alert('The game is over, your score: '+ this.score);
            this.$router.push("/");

          }
          else{
            this.screenNum++;
            this.$children[0].clear();
            this.items =[];
            for(let num in this.allImages[this.index].imagesScreen){
              const data = {key: this.allImages[this.index].imagesScreen[num].image_id,
                            backgroundImage: this.allImages[this.index].imagesScreen[num].image,
                            target: this.allImages[this.index].imagesScreen[num].target,
                            selectable: true};
              this.items.push(data);
            }
          }
      }
    }
  },
  data() {
    return {
      maxSelectable: 2,
      selectedItems: [],
      items: [],
      colorSchema: "#8B8B8B",
      screenNum: 1,
      screens: '',
      score: 0, 
      gameID: '',
      allImages: [],
      index: ''
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
      if(this.$root.store.email){
        if(this.$root.store.numberOfImagesRating < this.$root.store.minImagesRating){
          alert("You did not rate enough photos, continue to rate...");
          this.$router.push("/ranking");
        }
        else{
            let playToday;
            try {
                playToday = await this.axios.get(
                this.$root.store.base_url +
                    "/users/checkIfPlayToday"
                );
                console.log(playToday);
                if(playToday.status === 201){
                  console.log(playToday);
                  if(playToday.data[0].scoreGame == null){
                    // const numberOfImages=this.$root.store.numberOfImagesInGame;
                    // const limit=this.$root.store.limitSelectInGame;
                    this.screens = this.$root.store.numberOfScreensInGame;
                    let response;
                    try {
                      response = await this.axios.get(
                      this.$root.store.base_url +
                          "/users/getScreensGame/gameId/"+playToday.data[0].game_id
                      );
                      console.log(response);
                      if (response.status !== 200) this.$router.replace("/NotFound");
                  } catch (error) {
                      console.log("error.response.status", error.response.status);
                      this.$router.replace("/NotFound");
                      return;
                  }
                  console.log(response.data);
                  this.allImages = response.data;
                  this.gameID = playToday.data[0].game_id;
                  this.screenNum = this.allImages[0].screen;
                  for(let num in this.allImages[0].imagesScreen){
                    const data = {key: this.allImages[0].imagesScreen[num].image_id,
                                  backgroundImage: this.allImages[0].imagesScreen[num].image,
                                  target: this.allImages[0].imagesScreen[num].target,
                                  selectable: true};
                    this.items.push(data);
                  }
                  this.index =0;
                  if(this.index + 1 < this.allImages.length)
                    this.index++;
                  }
                  else{
                    alert('You already played today, will be back tomorrow!')
                    this.$router.replace("/")
                  }
                }
                else if (playToday.status !== 200) this.$router.replace("/NotFound");
                else{
                  //not play today
                  const numberOfImages=this.$root.store.numberOfImagesInGame;
                  const limit=this.$root.store.limitSelectInGame;
                  this.screens = this.$root.store.numberOfScreensInGame;

                  // this.maxSelectable = limit;
                  // this.$emit('maxSelectable', 3);
                  let response;
                  try {
                      response = await this.axios.get(
                      this.$root.store.base_url +
                          "/users/getImagesForGame/amount/"+numberOfImages+"/numOfScreens/"+
                          this.screens+"/numOfSelected/"+limit
                      );
                      console.log(response);
                      if (response.status !== 200) this.$router.replace("/NotFound");
                  } catch (error) {
                      console.log("error.response.status", error.response.status);
                      this.$router.replace("/NotFound");
                      return;
                  }

                  console.log(response.data);
                  this.allImages = response.data;
                  this.gameID = this.allImages[this.screens];
                  for(let num in this.allImages[this.screenNum-1].imagesScreen){
                    const data = {key: this.allImages[this.screenNum-1].imagesScreen[num].image_id,
                                  backgroundImage: this.allImages[this.screenNum-1].imagesScreen[num].image,
                                  target: this.allImages[this.screenNum-1].imagesScreen[num].target,
                                  selectable: true};
                    this.items.push(data);
                  }
                  this.index = this.screenNum;
                  console.log(this.items);
                }
            } catch (error) {
                console.log("error.playToday.status", error.playToday.status);
                this.$router.replace("/NotFound");
                return;
            }
        }
        }
        else{
            this.$router.push("/login");
        }
    },
};
</script>

<style lang="scss" scoped>
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
.w-650 {
  max-width: 650px;
}
.mt-20 {
  margin-top: 20px;
}
.mt-25 {
  margin-top: 20px;
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
</style>
