<template>
  <b-container fluid class="param_container">
    <br>
    <b-row class="my-1">
      <b-col sm="6">
        <label class="text">Minimum images in the rating process :</label>
      </b-col>
      <b-col class="numbers">
        {{imagesInRate}}
      </b-col>
      <b-col sm="2" >
        <b-form-input id="imagesInRate" type="text" v-model="form.imagesInRate"></b-form-input>
      </b-col>
    </b-row> 

    <b-row class="my-1">
      <b-col sm="6">
        <label class="text">Number of images in game :</label>
      </b-col>
      <b-col class="numbers">
        {{numOfImages}}
      </b-col>
      <b-col sm="2">
        <b-form-input id="numOfImages" type="text" v-model="form.numOfImages"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="6">
        <label class="text">Number of images selectes in game :</label>
      </b-col>
      <b-col class="numbers">
        {{numOfSelected}}
      </b-col>
      <b-col sm="2">
        <b-form-input id="numOfSelected" type="text" v-model="form.numOfSelected"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="6">
        <label class="text">Number of screens in game :</label>
      </b-col>
      <b-col class="numbers">
        {{numOfScreens}}
      </b-col>
      <b-col sm="2">
        <b-form-input id="numOfScreens" type="text" v-model="form.numOfScreens"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="6">
        <label class="text">Delay period :</label>
      </b-col>
      <b-col class="numbers">
        {{delayTime}}
      </b-col>
      <b-col sm="2">
        <b-form-input id="delayTime" type="text" v-model="form.delayTime"></b-form-input>
      </b-col>
    </b-row>


    <b-row>
      <button class="update-btn" sm="4" type="submit" v-on:click="updated">Save changes</button>
    </b-row>

    <br/>
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
                else{
                  this.$alert('The parameters have been updated!' ,
      "Success",
      "success");
                }
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
        this.$alert('You need to enter at least one parameter to update!' ,
      "Error", "error");
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
    border-radius: 5px;
    padding-right: 30px;
}

.title {
    text-align: center;
    font-family: "Merienda", Helvetica, Arial;
    padding-top: 10px;
    font-weight: bold;
}

.text {
    font-size: 20px;
    font-family: "Merienda", Helvetica, Arial;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
}

.numbers {
    font-size: 20px;
    font-family: "Merienda", Helvetica, Arial;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    text-align: center;
}

.update-btn {
  border-radius: 5px;
  color: rgba(10, 10, 10, 0.774);
  width: 24%;
  font-size: 24px; 
  background-color: #fc995788;
  font-family: "Merienda", Helvetica, Arial;
  margin-left: 13%;
}

.update-btn:hover {
  color:  rgba(10, 10, 10, 0.849);
  font-weight: bold;
  transition: all 0.4s ease;
}

</style>