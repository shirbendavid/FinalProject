<template>
  <div class="d-flex flex-column justify-center align-center">
    <transition name="fade">

        <div class="popup-modal" v-if="isVisible">
            <div class="window" style=" max-height:450px; max-width: 680px;">
                <slot>   
                      <!-- <button class="btn-x"  tag="b-nav-item" @click="close()">
                            X
                        </button> -->
                <h2 class="titlegame" >משחק למתקדמים</h2>
               
                <p class="textgame" >
                כעת עליכם לנסות לזהות איזה תמונות משתמש אחר הכי אהב 
                </p>
                <h4 class="titlegame" >!בהצלחה</h4>
                <b-row>
                  <b-col ></b-col>
                    <b-col lg="6" class="pb-2"><b-button class="b-game" block @click="close()" >התחל </b-button></b-col>
                  <b-col></b-col>
                </b-row>
                </slot>
                    </div>
                </div>
            </transition>
            <br>

             <router-link to="/" >
          <b-button color="primary" class="btn-x">
         HOME
          </b-button>
        </router-link> <h3> <b>Page {{ screenNum }} / {{ screens }}</b></h3>
    <div class="d-flex flex-row justify-center align-center">
      <v-select-image ref="VSelectImage"
        class="w-1040"
        v-model="selectedItems"
        :items="items"
        :colorSchema="colorSchema"
        uniqueKey="key"
        :maxSelectable="maxSelectable"
        @maxSelectionError="maxSelected()"
      />
    </div>
    <br>
    <b-button size="lg" class="btn"
              v-on:click="save"
              type="submit" >
    NEXT
    </b-button>
  </div>
</template>


<script>
import VSelectImage from "../components/VSelectImage.vue";
export default {
  name: "App",
  components: {  'v-select-image': VSelectImage },
  methods: {
        open() {
            this.isVisible = true
        },

        close() {
            this.isVisible = false
        },
    maxSelected() {
      this.$alert("You can't select more than " + this.maxSelectable + " images." ,
      "Error", "error");
    },
    async save(){
      if(this.selectedItems.length < this.maxSelectable)
        this.$alert("You need to select " + this.maxSelectable + " images" ,
      "Error", "error");
      else{
        let scoreScreen = 0;
        let imagesSelect = '';
        for(let index in this.selectedItems){
          if(this.selectedItems[index].target == true)
            scoreScreen++;
          imagesSelect = imagesSelect + this.selectedItems[index].key + ','; 
        }
        this.score = this.score + scoreScreen;
        let saveScore;
        
        try {
          saveScore = await this.axios.get(
          this.$root.store.base_url +
              "/users/saveScoreScreenAdvanced/gameID/"+this.gameID+
              "/numOfScreen/"+this.screenNum+"/imagesSelect/"+imagesSelect+
              "/score/" + scoreScreen
          );
          if (saveScore.status !== 200) this.$router.replace("/NotFound");
          } catch (error) {
              console.log("error.saveScore.status", error.saveScore.status);
              this.$router.replace("/NotFound");
              return;
          }
          this.$alert('Your score in this round: ' +scoreScreen + '/' + this.maxSelectable);
          if(this.screenNum == this.screens){
            let saveScoreGame;
            try {
            saveScoreGame = await this.axios.get(
            this.$root.store.base_url +
                "/users/saveScoreAdvancedGame/gameID/"+this.gameID+"/score/"+this.score
            );
            if (saveScoreGame.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.saveScoreGame.status", error.saveScoreGame.status);
                this.$router.replace("/NotFound");
                return;
            }
              this.$alert('The game is over, your score: '+ this.score);
              this.$router.push("/");

          }
          else{
            this.screenNum++;
            this.$refs.VSelectImage.clear();
            this.items =[];
            for(let num in this.allImages[this.index].imagesScreen){
              const data = {key: this.allImages[this.index].imagesScreen[num].image_id,
                            backgroundImage: this.allImages[this.index].imagesScreen[num].image,
                            target: this.allImages[this.index].imagesScreen[num].target,
                            selectable: true};
              this.items.push(data);
            }
            this.index++;
          }
      }
    }
  },
  data() {
    return {
      isVisible:true,
      maxSelectable: 2,
      selectedItems: [],
      items: [],
      colorSchema: "#00cc44",
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
      this.screens = this.$root.store.numberOfScreensInGame;
      // const limit=this.$root.store.limitSelectInGame;
      // this.maxSelectable = limit;
      // this.$emit('maxSelectable', 3);
      let response;
      try {
          response = await this.axios.get(
          this.$root.store.base_url +
              "/users/getImagesForAdvancedGame"
          );
          if(response.status === 201) this.$router.replace("/");
          else if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
      }

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
    }
    else{
      this.$router.push("/login");
    }
  },
  }
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

.item {
  margin: 5px !important;
  height: 220px !important;
  width: 250px !important;
}
.btn-x {
  width:7%;
  margin-top: 1%;
  margin-right: 2%;
  position: absolute;
  top: 0;
  right: 0;
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
    align-items:center;
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
.button {
    border-radius: 5px;
    font-size: 20px;
    width: 160px;
    margin-left: 100px
}

.btn {
  margin-top: 8px;
}
.text {
    font-size: 20px !important;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 15px;
    margin-bottom: 20px;
    //color: black;
}
.title {
    text-align: center;
    font-family: "Merienda", Helvetica, Arial;
    font-size: x-large;
    max-width: 500%;
}
</style>
