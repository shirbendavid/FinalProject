<template>
  <div class="container">
    <div class="image-header mt-3 mb-4">
      <b-row class="title">
        <h1>Rate this image</h1>
      </b-row>
      <b-row class="title">
        <h5><b>Remember:</b> 0 - less like, 10 - very like</h5>
      </b-row>
    </div>
    <div class="image-body">
      <div class="flex-container">
        <div class="flex-item">
          <b-row>
            <b-col class="foreword">
              <img :src="image" class="center" />
            </b-col>
          </b-row>
           <br />
          <b-row>
            <div class="stars">
              <b-input-group>
                <b-form-rating
                  v-model="value"
                  stars="10"
                  no-border
                  size="lg"
                  color="#ff8800"
                ></b-form-rating>
                <b-input-group-append>
                  <b-input-group-text
                    class="justify-content-center"
                    style="min-width: 3em"
                  >
                    Rate : {{ value }}
                  </b-input-group-text>
                </b-input-group-append>
                <b-input-group-prepend>
                  <b-button @click="value = 0">Clear Rate</b-button>
                </b-input-group-prepend>
              </b-input-group>
            </div>
          </b-row>
          <br />
          <button
            v-on:click="saveImageRate"
            type="submit"
            variant="primary"
            style="width: 10%"
            class="ghost-round full-width"
          >
            NEXT
          </button>
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
      image_id: ""
    };
  },
  methods: {
    async saveImageRate() {
      // add rate image to DB for this user
      try {
        let response = await this.axios.get(
          this.$root.store.base_url +
            "/users/saveRate/image/"+this.image_id+"/rate/" +this.value
        );
        console.log(response);
        if (response.status !== 200) this.$router.replace("/NotFound");
        else {
          this.value =0;
      try {
        response = await this.axios.get(
          this.$root.store.base_url +
            "/users/getImageToRate"
        );
        console.log(response);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      this.image_id = response.data[0].imageID;
      this.image = response.data[0].image;
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
          this.$root.store.base_url +
            "/users/getImageToRate"
        );
        console.log(response);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      this.image_id = response.data[0].imageID;
      this.image = response.data[0].image;
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
  width: 80%;
  padding-left: 25px;
  padding-right: 25px;
}

.title {
  color: black;
  font-family: Special Elite;
  width: 80%;
}

.center {
  border: 1px solid #595b5f;
  border-radius: 25px;
  width: 200%;
}

.stars {
  width: 120%;
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
