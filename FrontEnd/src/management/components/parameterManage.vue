<template>
  <b-container fluid class="param_container">
    <h1>Managment Portal!</h1>
    <br>
    <b-row class="my-1">
      <b-col sm="6">
        <label>Minimum images in the rating process :</label>
      </b-col>
      <b-col>
        {{imagesInRate}}
      </b-col>
      <b-col sm="3">
        <b-form-input id="imagesInRate" type="text" v-model="form.imagesInRate"></b-form-input>
      </b-col>
    </b-row> 
    <b-row class="my-1">
      <b-col sm="6">
        <label>Number of images in game :</label>
      </b-col>
      <b-col>
        {{numOfImages}}
      </b-col>
      <b-col sm="3">
        <b-form-input id="numOfImages" type="text" v-model="form.numOfImages"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="6">
        <label>Number of images selectes in game :</label>
      </b-col>
      <b-col>
        {{numOfSelected}}
      </b-col>
      <b-col sm="3">
        <b-form-input id="numOfSelected" type="text" v-model="form.numOfSelected"></b-form-input>
      </b-col>
    </b-row>
        <b-row class="my-1">
      <b-col sm="6">
        <label>Number of screens in game :</label>
      </b-col>
      <b-col>
        {{numOfScreens}}
      </b-col>
      <b-col sm="3">
        <b-form-input id="numOfScreens" type="text" v-model="form.numOfScreens"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="6">
        <label>Delay period :</label>
      </b-col>
      <b-col>
        {{delayTime}}
      </b-col>
      <b-col sm="3">
        <b-form-input id="delayTime" type="text" v-model="form.delayTime"></b-form-input>
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
        delayTime: '',
        numOfScreens: '',
        lastChange: '',
        form: {
          numOfImages: '', 
          numOfSelected: '',
          imagesInRate: '',
          delayTime: '',
          numOfScreens: '',
          lastChange: '',
        }
    }
},
methods:{
    async updated() {
      if(this.form.numOfImages !== '' || this.form.numOfSelected !== '' || this.form.imagesInRate !== ''
      || this.form.delayTime !== '' || this.form.numOfScreens !== ''){
        if(this.form.numOfImages !== '')
          this.numOfImages = this.form.numOfImages;
        if(this.form.numOfSelected !== '')
          this.numOfSelected = this.form.numOfSelected;
        if(this.form.imagesInRate !== '')
          this.imagesInRate = this.form.imagesInRate;
        if(this.form.delayTime !== '')
          this.delayTime = this.form.delayTime;
        if(this.form.numOfScreens !== '')
          this.numOfScreens = this.form.numOfScreens;
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/admins/updateParams/["+this.numOfImages+","+this.numOfSelected+
                    ","+this.imagesInRate+","+this.delayTime+","+this.numOfScreens+"]"
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
                else alert("The parameters have been updated!")
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }
          this.form = {
          numOfImages: '', 
          numOfSelected: '',
          imagesInRate: '',
          delayTime: '',
          numOfScreens: '',
          lastChange: '',
        }
      }
      else{
        alert("You need to enter at least one parameter to update!")
      }
    },
},
async created() {
          if(localStorage.getItem("emailAdmin") && this.$cookies.get('session')){
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/admins/getParams"
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }

            const params = response.data;
            this.lastChange=params[0].date;
            this.numOfImages=params[0].images_in_game;
            this.numOfSelected=params[0].images_selectes_in_game;
            this.imagesInRate=params[0].minimum_images_rating;
            this.delayTime=params[0].delay;
            this.numOfScreens=params[0].screens_in_game;
            console.log(params)
         }
        else{
            this.$router.push("/loginManagement");
        }
},

}
</script>

<style>
.param_container{
  border: 1.5px solid black;
}
</style>