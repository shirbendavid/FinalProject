<template>
  <b-container class="container">
    <h1 class="title">
      Hello
    </h1>
    <!-- <img :src="dataUrl"> -->
    <b-row>
      <b-col v-if="!$root.store.email">
        <login-page></login-page>
      </b-col>
      <b-col v-else>
        <h2>connect</h2>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LoginPage from '../pages/loginPage'
export default {
  components: {
    LoginPage,
  },
  methods : {
    async dataUrl(){
      try {
        const image = await this.axios.get(
          this.$root.store.base_url + "/images/getImage"
        );
        console.log(image);
    
        return 'data:image/jpeg;base64,' + btoa(
            new Uint8Array(image.img.toString('base64'))
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }
      catch(err){
        console.log(err);
      }
    }
}

//   async created() {
//     if (this.$root.store.username) {
//     }
//   },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}

@import url('https://fonts.googleapis.com/css?family=Allura');
@import url('https://fonts.googleapis.com/css?family=Raleway');

.title {
  font-family: 'Allura';
  color: black;
  text-align: center;
}

</style>
