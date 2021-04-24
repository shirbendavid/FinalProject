<template>
  <div class="container"  >  
      <div class="image-header ma-2">
      <b-row class="title">
        <h4><b>How much do you like this photo?</b> </h4>
      </b-row>
    </div>
    <div class="image-body">
      <div class="flex-container">
        <div class="flex-item">
          <b-row>
            <b-col class="forewordimage">
              <img :src="image" class="center" />
            </b-col>
          </b-row>
    
<div class="scale">       
  <b-row >
    
 <h3 class="label1">Not at all</h3><h2 class="label2">Very much</h2>
    </b-row>    
<b-row>
  <b-col class="foreword">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" aria-label="..." v-model="value">
  <br>
  <label for="inlineRadio1">1</label>
</b-col>
<b-col class="foreword">
  <input  type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" aria-label="..." v-model="value">
  <br>
  <label  for="inlineRadio2">2</label>
</b-col>
<b-col class="foreword">
  <input  type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3" aria-label="..." v-model="value">
  <br>
  <label  for="inlineRadio3">3</label>
</b-col>
<b-col class="foreword">
  <input  type="radio" name="inlineRadioOptions" id="inlineRadio4" value="4" aria-label="..." v-model="value">
  <br>
  <label  for="inlineRadio4">4</label>
</b-col>
<b-col class="foreword">
  <input  type="radio" name="inlineRadioOptions" id="inlineRadio5" value="5" aria-label="..." v-model="value">
<br>
 <label  for="inlineRadio5">5</label>
</b-col>
<b-col class="foreword">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio6" value="6" aria-label="..." v-model="value">
 <br>
 <label  for="inlineRadio6">6</label>
 </b-col>
<b-col class="foreword"> 
  <input  type="radio" name="inlineRadioOptions" id="inlineRadio7" value="7" aria-label="..." v-model="value">
<br>
<label for="inlineRadio7">7</label>
</b-col>
<b-col class="foreword">
  <input  type="radio" name="inlineRadioOptions" id="inlineRadio8" value="8" aria-label="..." v-model="value">
<br>
<label for="inlineRadio8">8</label>
</b-col>
<b-col class="foreword">
  <input  type="radio" name="inlineRadioOptions" id="inlineRadio9" value="9" aria-label="..." v-model="value">
<br>
<label  for="inlineRadio9">9</label>
</b-col>
<b-col class="foreword">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio10" value="10" aria-label="..." v-model="value">
<br>
<label for="inlineRadio10">10</label>
</b-col>
</b-row>
</div>
          <b-row class="buttons">
            <b-col cols="12" md="10">
              <!-- <br/> -->
              <b-input-group-prepend>
                <b-button class="btn" @click="value = 0">Clear Rating</b-button>
              </b-input-group-prepend>
            </b-col>
            <b-col cols="6" md="2">
              <!-- <br/> -->
              <b-button class="btn"
                v-on:click="saveImageRate"
                type="submit" 
              >
                NEXT
              </b-button>

            </b-col>
          </b-row>
          <br/><br/>
        </div>
      </div>
    </div>
    <div class="container">

      <transition name="fade">
          <div class="popup-modal" v-if="enoughImages">
          <!-- <div class="popup-modal"> -->
              <div class="window">
                  <slot>
                      <p class="text">
                          You've already rated enough images, 
                          <br>
                          you can now start playing or continue rating images.    
                      </p>
                      <h2 class="title">Good Luck!</h2>
                      <br/>
                      <button  class="button" tag="b-nav-item" @click="close()">
                            Continue rating
                      </button>
                      <button  class="button" tag="b-nav-item" @click="StartPlay()">
                        Start Play!
                      </button>
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
      value: 1,
      image: "",
      image_id: "",
      enoughImages:false,
    };
  },
  methods: {
     // add rate image to DB for this user
     async saveImageRate(){
      try {
        let response = await this.axios.get(
          this.$root.store.base_url +
            "/users/saveRate/image/" +
            this.image_id +
            "/rate/" +
            this.value
        );
        console.log(response);
        if (response.status !== 200) this.$router.replace("/NotFound");
        else {
          this.value = 1;

        const numberOfImagesRating = this.$root.store.numberOfImagesRating+1;
        console.log(numberOfImagesRating);
          this.$root.store.addNumberOfImagesRating(numberOfImagesRating);
          if(this.$root.store.numberOfImagesRating === this.$root.store.minImagesRating)
            this.enoughImages=true;
          else
            this.getNextImage();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getNextImage(){
      if (this.$root.store.numberOfImagesRating === this.$root.store.numberOfImagesInDB){
        alert("You rank the maximum amount of images, transferred to the game");
        this.$router.replace("/game");
      }
      let response;
            try {
            response = await this.axios.get(
              this.$root.store.base_url + "/users/getImageToRate"
            );
            console.log(response);
            if (response.status !== 200) this.$router.replace("/NotFound");
          } catch (error) {
            console.log("error.response.status", error.response.status);
            this.$router.replace("/NotFound");
            return;
          }
          this.image_id = response.data.imageID;
          this.image = response.data.image;
    },
   close() {
            this.enoughImages = false;
            this.getNextImage();
        },
   StartPlay(){
           this.$router.replace("/game");     
   }     
  },
  async created() {
    //  get image from server
    if(this.$root.store.email){
      if (this.$root.store.numberOfImagesRating === this.$root.store.numberOfImagesInDB){
        alert("You rank the maximum amount of images, transferred to the game");
        this.$router.replace("/game");
      }
    let response;
    try {
      response = await this.axios.get(
        this.$root.store.base_url + "/users/getImageToRate"
      );
      console.log(response);
      if (response.status === 201) this.$router.replace("/game");
      else if (response.status !== 200) this.$router.replace("/NotFound");
    } catch (error) {
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;
    }
    this.image_id = response.data.imageID;
    this.image = response.data.image;
    }
      else{
        this.$router.push("/login");
      }
  },
};
</script>

<style scoped>
/* @import url(https://fonts.googleapis.com/css?family=Special+Elite); */

.container {
  background-color: rgba(255, 255, 255, 0.89);
  /* border: 5px outset#f3c48ec7;
  border-radius: 25px; */
  opacity: 95%;
  color: black;
  font-size: 16px;
  width:45%;
  padding-left: 20px;
  padding-right: 20px;
  overflow: hidden;
  /* height: 50%; */

}

/* 
input[type=radio]{
  border:1px;
  width: 10px;
  height:13px;
} */

label{
  /* padding: 10px; */
  font-size: smaller;
  line-height: 8%;
}

.label1{
  font-size:medium;
  opacity: 0.5;
  padding-left: 4%;
  margin-top: 10px;
}

.label2{
  font-size:medium;
  opacity: 0.5;
  padding-left: 66%;
  margin-top: 10px;
}

/* .form-check-inline{
  padding-right: 3px;
} */

.title {
  color: black;
  font-family: Special Elite;
  width: 80%;
}

.scale{
    width: 100%;
    border: 1px solid #595b5f;
}

.center {
  border: 1px solid #595b5f;
  width: 208%;
}

.favorite_icon:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.foreword {
  column-count: 1;
  margin: 0 auto;
  -moz-column-count: 1;
  -webkit-column-count: 1;
}

.forewordimage {
  column-count: 2;
  margin: 0 auto;
  -moz-column-count: 2;
  -webkit-column-count: 2;
}

.subtitle {
  font-size: 25px;
  color: #7a5699e8;
}

.flex-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
}

.flex-item {
  padding: 1px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

.wrapper {
  display: flex;
}

.wrapped {
  width: 50%;
}

.buttons{
  padding-top: 4px;
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
    background: #f8dbbad3;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
    padding: 1.1rem;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border: 1.5px solid;
}

.button {
    border-radius: 5px;
    font-size: 20px;
    width: 160px;
    margin-left: 40px
}

.btn {
  margin-top: 8px;
}

.text {
    font-size: 20px;
    text-align: center;
}

.title {
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
