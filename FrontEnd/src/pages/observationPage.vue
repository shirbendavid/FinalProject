
<template>
  <div class="container">
    <h1 class="title">Sample images</h1>
    <b-container>
        <h5 class="title">

        Please take a look at the images on the screen. They are representative of the images in our database.
        <br />

        Press the Start Rating button when you are ready to rate how much you like individual images.
        <br />

        A rating of 10 indicates that you like the image very much.
        <br />

        A rating of 1 indicates that you do not like the image at all.
        <br />

        Your liking of most images will likely not be extreme, so use the in-between points on the scale to denote your liking.    
        </h5>
        <h2 class="title">Good Luck!</h2>
        <br />

        <b-row>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image1+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image2+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image3+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image4+'.jpg')" class="center" width="246"/>
        </b-col>
        </b-row>
        <br/>
        <b-row>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image5+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image6+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image7+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image8+'.jpg')" class="center" width="246"/>
        </b-col>
        </b-row>
        <br/>
        <b-row>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image9+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image10+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image11+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image12+'.jpg')" class="center" width="246"/>
        </b-col>
        </b-row>
        <br/>
        <b-row>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image13+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image14+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image15+'.jpg')" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="require('../assets/'+image16+'.jpg')" class="center" width="246"/>
        </b-col>
        </b-row>
        <br/>
        </b-container>
        <router-link  to="/ranking">
        <div>
            <b-button class="button"
              color="primary"
              size="lg"
            >
              Start Rating
            </b-button>
          </div>              
        </router-link>

        <br/><br/>


  </div>
 
</template>
<script>
export default {
    data() {
        return {
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
            image6: '',
            image7: '',
            image8: '',
            image9: '',
            image10: '',
            image11: '',
            image12: '',
            image13: '',
            image14: '',
            image15: '',
            image16: '',
        }
    },
    async created() {
        if(this.$root.store.email){
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/images/getImages/amount/"+16
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }

            const images = response.data;
            this.image1 = images[0];
            this.image2 = images[1];
            this.image3 = images[2];
            this.image4 = images[3];
            this.image5 = images[4];
            this.image6 = images[5];
            this.image7 = images[6];
            this.image8 = images[7];
            this.image9 = images[8];
            this.image10 = images[9];
            this.image11 = images[10];
            this.image12 = images[11];
            this.image13 = images[12];
            this.image14 = images[13];
            this.image15 = images[14];
            this.image16 = images[15];
         }
        else{
            this.$router.push("/login");
        }
    },
}
</script>
<style lang="scss" scoped>
.button{
float: right;
    margin-right:10px;
}

</style>




