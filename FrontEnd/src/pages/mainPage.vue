<template>
  <div class="main-page-container">
    <img src='../assets/new logo.png' class="centerr" style="width: 35%; height:35%;" />
    <br/>
    <div id="example">
      <br/>
      <carousel-3d :controls-visible="true" :controls-prev-html="'❬ '" :controls-next-html="'❭'" :controls-width="30" :height="200" :controls-heigth="50" :clickable="false">
        <slide v-for="(slide, i) in slides" :index="i" v-bind:key="i">
            <figure>
                <img :src="slide.src">
            </figure>
          </slide>
      </carousel-3d>
      <br/>
    </div>
  </div>     
</template>

<script>
 export default {
   data() {
    return {
      isVisible: true,
      slides: [
        { id: 1, src: '' },
        { id: 2, src: '' },
        { id: 3, src: '' },
        { id: 4, src: '' },
        { id: 5, src: '' },
        { id: 6, src: '' },
        { id: 7, src: '' },
        { id: 8, src: '' },
      ],    
    };
  },
  methods: {
        open() {
            this.isVisible = true
        },

        close() {
            this.isVisible = false
        },
    },

  async created() {
    let response;
    try {
      response = await this.axios.get(  //"/coil/images/getImages/amount/"+8);
       this.$root.store.base_url + "/images/getImages/amount/"+8);
      console.log(response);
      if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
        const images = response.data;
        this.slides[0].src = images[0];
        this.slides[1].src = images[1];
        this.slides[2].src = images[2];
        this.slides[3].src = images[3];
        this.slides[4].src = images[4];
        this.slides[5].src = images[5];
        this.slides[6].src = images[6];
        this.slides[7].src = images[7];
  },
};
</script>

<style lang="scss">

.main-page-container {
  width: 100%;
  height: 100%;
}

.title {
  font-family: 'Allura';
  font-size: 120px;
  color: black;
  text-align: center;
}

.sub-title{
  font-family: Special Elite;
  color: black;
  text-align: center;
  font-size: 50px;
  margin-bottom: 0px;
}

html, body {
    height: 100%;
    margin: 0;
    // padding: 0;
}
.centerr {
  margin-left: 30%;
  padding-top: 6px;

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
    background: #f8dbbad3;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 1000px;
    //max-height: 1500px;
    margin-left: auto;
    margin-right: auto;
    padding: 1.1rem;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border: 1.5px solid;
    text-align: right;
    color: black;
    //window.scrollBy(0,100);
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
}
.buttonb {
    float: right;
    margin-right:45%;
    width: 170px;
    font-size: 25px;
}

img.center {
  display: block;
  margin: 0 auto;
}

</style>
