
<template>
  <div class="container">
        <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="window">
                <slot>   
                <h1 class="title">Sample images</h1>

                <p class="text">
                    Please take a look at the images on the screen. They are representative of the images in our database.
                    <br />

                    Press the Start Rating button when you are ready to rate how much you like individual images.
                    <br /><br />

                    A rating of 10 indicates that you <b>like</b> the image very much.
                    <br />

                    A rating of 1 indicates that you <b>do not like</b> the image at all.
                    <br />

                    Your liking of most images will likely not be extreme, so use the in-between points on the scale to denote your liking.    
                </p>
                <h2 class="title">Good Luck!</h2>
                
                <button class="button" tag="b-nav-item" @click="close()">
                CLOSE
                </button>
                </slot>
                    </div>
                </div>
            </transition>
    <b-container>

        <br />

        <b-row>
        <b-col class="pa-3">
            <b-img :src="image1" class="center" width="246" aspect-ratio="1.4" contain></b-img>
        </b-col>
        <b-col class="pa-3">
            <b-img :src="image2" class="center" width="246" aspect-ratio="1.4" contain></b-img>
        </b-col>
        <b-col class="pa-3">
            <b-img :src="image3" class="center" width="246" aspect-ratio="1.4" contain/>
        </b-col>
        <b-col class="pa-3">
            <b-img :src="image4" class="center" width="246" aspect-ratio="1.4" contain/>
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
        <br><br>
        <br><br>
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
            isVisible: true,

        }
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
    margin-right:45%;
}
/* css class for the transition */
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
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
    padding: 1.1rem;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border: 1.5px solid;
}

.title {
    text-align: center;
    font-family: "Merienda", Helvetica, Arial;
}

// .goodluck {
//     margin-bottom: 0px;
// }

.text {
    font-size: 20px;
    font-family: "Merienda", Helvetica, Arial;
    margin-top: 10px;
    margin-bottom: 10px;;
}

.button {
    border-radius: 5px;
    font-size: 20px;
    width: 120px;
    margin-top: 20px
}
</style>



