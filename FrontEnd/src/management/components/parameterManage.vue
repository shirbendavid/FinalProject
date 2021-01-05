<template>
  <b-container fluid>
    <b-row class="my-1">
      <b-col sm="6">
        <label>Number of images in game :</label>
      </b-col>
      <b-col sm="3">
        <b-form-input id="numOfImages" type="text"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="6">
        <label>Number of images selectes in game :</label>
      </b-col>
      <b-col sm="3">
        <b-form-input id="numOfSelected" type="text"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="6">
        <label>Minimum images in the rating process :</label>
      </b-col>
      <b-col sm="3">
        <b-form-input id="imagesInRate" type="text"></b-form-input>
      </b-col>
    </b-row> 
    <b-row class="my-1">
      <b-col sm="6">
        <label>Delay period :</label>
      </b-col>
      <b-col sm="3">
        <b-form-input id="delayTime" type="text"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
    <button sm="4" type="submit" v-on:click="updated">Update</button>
    </b-row>

  </b-container>
</template>

<script>
export default {
data() {
    return {
        numOfImages: '', 
        numOfSelected: '',
        imagesInRate: '',
        delayTime: ''
    }
},
methods:{
    updated() {
        console.log(this.numOfImages);
    },
}
}
</script>

<style>

</style>