<template>

  <div class="container" scrollable fullscreen hide-overlay>
    <div class="image-header mt-3 mb-4">
      <b-row class="title">
        <h1>Rate this image</h1>
      </b-row>
      <b-row class="title">
        <h4><b>How much do you like this photo?</b> </h4>
      </b-row>
    </div>
    <div class="image-body">
      <div class="flex-container">
        <div class="flex-item">
          <b-row>
            <b-col class="foreword">
              <img :src="require('../assets/'+image+'.jpg')" class="center" />
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <!-- <b-form-radio-group
                v-model="value"
                :options="options"
                class="mb-3"
                value-field="item"
                text-field="name"
                size="20%"
                color="#ff8800"
              ></b-form-radio-group>
              <br/> -->

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" aria-label="..." v-model="value">
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" aria-label="..." v-model="value">
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3" aria-label="..." v-model="value">
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="4" aria-label="..." v-model="value">
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="5" aria-label="..." v-model="value">
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio6" value="6" aria-label="..." v-model="value">
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio7" value="7" aria-label="..." v-model="value">
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio8" value="8" aria-label="..." v-model="value">
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio9" value="9" aria-label="..." v-model="value">
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio10" value="10" aria-label="..." v-model="value">
</div>
<br/>
<label1>Not at all</label1>
<label class="form-check-label" for="inlineRadio1">1</label>
<label class="form-check-label" for="inlineRadio2">2</label>
<label class="form-check-label" for="inlineRadio3">3</label>
<label class="form-check-label" for="inlineRadio4">4</label>
<label class="form-check-label" for="inlineRadio5">5</label>
<label class="form-check-label" for="inlineRadio6">6</label>
<label class="form-check-label" for="inlineRadio7">7</label>
<label class="form-check-label" for="inlineRadio8">8</label>
<label class="form-check-label" for="inlineRadio9">9</label>
<label class="form-check-label" for="inlineRadio10">10</label>
<label1>Very much</label1>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="10">
              <br/>
              <b-input-group-prepend>
                <b-button @click="value = 0">Clear Rating</b-button>
              </b-input-group-prepend>
            </b-col>
            <b-col cols="6" md="2">
              <br/>
              <b-button
                v-on:click="saveImageRate"
                type="submit"
              
              >
                NEXT
              </b-button>
            </b-col>
          </b-row>
          <br />
        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      image: "",
      image_id: "",
    };
  },
  methods: {
    async saveImageRate() {
      // add rate image to DB for this user
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
          this.value = 0;
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
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    //  get image from server
    if(this.$root.store.email){
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
    }
      else{
        this.$router.push("/login");
      }
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Special+Elite);


.container {
  background-color: rgba(255, 255, 255, 0.89);
  border: 5px outset#f3c48ec7;
  border-radius: 25px;
  opacity: 95%;
  color: black;
  font-size: 16px;
  width: 50%;
  padding-left: 20px;
  padding-right: 20px;
  overflow: hidden;
  height: 50%;

}


input[type=radio]{
  border:1px;
  width: 18px;
  height: 18px;
}

label{
  padding: 15px;
  font-size: smaller;
  line-height: 10%;

}
label1{
  font-size:small;
opacity: 0.5;
}
.form-check-inline{
  padding-right: 4.5px;
}

.title {
  color: black;
  font-family: Special Elite;
  width: 80%;
}


.center {
  border: 1px solid #595b5f;
  width: 200%;
}

.favorite_icon:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.foreword {
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
</style>
