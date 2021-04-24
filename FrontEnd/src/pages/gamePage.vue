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
    Check your selection
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
        for(let index in this.selectedItems){
          if(this.selectedItems[index].target == true)
            scoreScreen++; 
        }
        this.score = this.score + scoreScreen;
        console.log(this.score);
        let saveScore;
        try {
          saveScore = await this.axios.get(
          this.$root.store.base_url +
              "/users/saveScoreScreen/gameID/"+this.gameID+
              "/numOfScreen/"+this.screenNum+"/score/"+scoreScreen
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
            alert('finish game!');
          }
          else{
            this.screenNum++;
            this.$children[0].clear();
            this.items =[];
            for(let num in this.allImages[this.screenNum-1].imagesScreen){
              const data = {key: this.allImages[this.screenNum-1].imagesScreen[num].image_id,
                            backgroundImage: this.allImages[this.screenNum-1].imagesScreen[num].image,
                            target: this.allImages[this.screenNum-1].imagesScreen[num].target,
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
          //if play today!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            let paramsOfGame;
            try {
                paramsOfGame = await this.axios.get(
                this.$root.store.base_url +
                    "/users/getAllParams"
                );
                console.log(paramsOfGame);
                if (paramsOfGame.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.paramsOfGame.status", error.paramsOfGame.status);
                this.$router.replace("/NotFound");
                return;
            }
            // this.maxSelectable = limit;
            // console.log(this.maxSelectable);
            const numberOfImages = paramsOfGame.data[0].images_in_game;
            const numberOfScreens = paramsOfGame.data[0].screens_in_game;
            this.screens = numberOfScreens;
            const limit = paramsOfGame.data[0].images_selectes_in_game;
            this.maxSelectable = limit;
            // this.$emit('maxSelectable', 3);
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/users/getImagesForGame/amount/"+numberOfImages+"/numOfScreens/"+
                    numberOfScreens+"/numOfSelected/"+limit
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
            console.log(this.items);
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
