
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
            <img :src="image1" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image2" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image3" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image4" class="center" width="246"/>
        </b-col>
        </b-row>
        <br/>
        <b-row>
        <b-col class="pa-3">
            <img :src="image5" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image6" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image7" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image8" class="center" width="246"/>
        </b-col>
        </b-row>
        <br/>
        <b-row>
        <b-col class="pa-3">
            <img :src="image9" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image10" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image11" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image12" class="center" width="246"/>
        </b-col>
        </b-row>
        <br/>
        <b-row>
        <b-col class="pa-3">
            <img :src="image13" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image14" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image15" class="center" width="246"/>
        </b-col>
        <b-col class="pa-3">
            <img :src="image16" class="center" width="246"/>
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
        /*if(this.$root.store.email){
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/images/getImagesToObser"
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }

            const images = response.data;
            console.log(images);
            this.image1 = images[0][0].image
            this.image2 = images[1][0].image;
            this.image3 = images[2][0].image;
            this.image4 = images[3][0].image;
            this.image5 = images[4][0].image;
            this.image6 = images[5][0].image;
            this.image7 = images[6][0].image;
            this.image8 = images[7][0].image;
            this.image9 = images[8][0].image;
         }
        else{
            this.$router.push("/login");
        }
        */
            this.image1 = require('../assets/image1.jpg');
            this.image2 = require('../assets/image2.jpg');
            this.image3 = require('../assets/image3.jpg');
            this.image4 = require('../assets/image4.jpg');
            this.image5 = require('../assets/image5.jpg');
            this.image6 = require('../assets/image6.jpg');
            this.image7 = require('../assets/image7.jpg');
            this.image8 = require('../assets/image8.jpg');
            this.image9 = require('../assets/image9.jpg');
            this.image10 = require('../assets/image10.jpg');
            this.image11 = require('../assets/image11.jpg');
            this.image12 = require('../assets/image12.jpg');
            this.image13 = require('../assets/image13.jpg');
            this.image14 = require('../assets/image14.jpg');
            this.image15 = require('../assets/image15.jpg');
            this.image16 = require('../assets/image16.jpg');
    },
}
</script>
<style lang="scss" scoped>
.button{
float: right;
    margin-right:10px;
}

</style>




