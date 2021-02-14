<template>
  <div class="container">
    <div class="image-header mt-3 mb-4">
      <b-row class="title">
        <h1>Rate this image</h1>
      </b-row>
      <b-row class="title">
        <h5><b>Remember:</b> 1 - don't like, 10 - very like</h5>
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
            <b-col>
              <b-form-radio-group
                v-model="value"
                :options="options"
                class="mb-3"
                value-field="item"
                text-field="name"
                size="20%"
                color="#ff8800"
              ></b-form-radio-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="10">
              <b-input-group-prepend>
                <b-button @click="value = 0">Clear Rate</b-button>
              </b-input-group-prepend>
            </b-col>
            <b-col cols="6" md="2">
              <button
                v-on:click="saveImageRate"
                type="submit"
                variant="primary"
                class="ghost-round full-width"
              >
                NEXT
              </button>
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
      options: [
        { item: "1", name: "1" },
        { item: "2", name: "2" },
        { item: "3", name: "3" },
        { item: "4", name: "4" },
        { item: "5", name: "5" },
        { item: "6", name: "6" },
        { item: "7", name: "7" },
        { item: "8", name: "8" },
        { item: "9", name: "9" },
        { item: "10", name: "10" },
      ],
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
    /*if(this.$root.store.email){
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
    this.image_id = response.data[0].imageID;
    this.image = response.data[0].image;
    }
      else{
        this.$router.push("/login");
      }*/
    this.image =
      "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026248/Final_Project/AABRDtp_x3azka.jpg";
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
