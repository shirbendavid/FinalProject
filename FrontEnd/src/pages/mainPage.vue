<template>
  <b-container class="container">
    <h1 class="title">
      <b>Beautiful Images.</b> 
    </h1>
    <h3 class="sub-title">recognition & preference</h3>
  </b-container>
</template>

<script>
export default {
//   methods : {
//     async dataUrl(){
//       try {
//         const image = await this.axios.get(
//           this.$root.store.base_url + "/images/getImage"
//         );
//         console.log(image);
    
//         return 'data:image/jpeg;base64,' + btoa(
//             new Uint8Array(image.img.toString('base64'))
//             .reduce((data, byte) => data + String.fromCharCode(byte), '')
//         );
//       }
//       catch(err){
//         console.log(err);
//       }
//     }
// }

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
@import url('https://fonts.googleapis.com/css?family=Special+Elite');

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
}

</style>
