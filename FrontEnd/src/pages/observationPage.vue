
<template>
  <div class="container">
    <h1 class="title">Initial image rating</h1>
    <b-container class="container">
        <h5 class="title">
        Here are some images to impress
        <br />
        When you are ready press the button and
        <br />
        start rating the photos
        <br />
        0 - do not like, 10 - very like
        </h5>
        <h2 class="title">Good Luck!</h2>
        <br />

        <b-row>
        <b-col>
            <img :src="image1" class="center" width="300" height="300" />
        </b-col>
        <b-col>
            <img :src="image2" class="center" width="300" height="300" />
        </b-col>
        <b-col>
            <img :src="image3" class="center" width="300" height="300" />
        </b-col>
        </b-row>
        <br/>
        <b-row>
        <b-col>
        <img :src="image4" class="center" width="300" height="300" />
        </b-col>
        <b-col>
            <img :src="image5" class="center" width="300" height="300" />
            <!-- <login-page></login-page> -->
        </b-col>
        <b-col>
            <img :src="image6" class="center" width="300" height="300" />
        </b-col>
        </b-row>
        <br/>

        <b-row>
        <b-col>
            <!-- <RandomRecipePreviewList class="RandomRecipes center" /> -->
        <img :src="image7" class="center" width="300" height="300" />
        </b-col>
        <b-col>
            <img :src="image8" class="center" width="300" height="300" />
            <!-- <login-page></login-page> -->
        </b-col>
        <b-col>
            <img :src="image9" class="center" width="300" height="300" />
        </b-col>
        </b-row>
        <br/>
    <div class="mycontainer">
        <router-link to="/ranking" tag="button">Start Rating</router-link>
    </div>
    </b-container>
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
            image9: ''
        }
    },
    async created() {
         if(this.$root.store.email){
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

            const images = response.data[0];
            console.log(images);
            this.image1 = images[0].image;
            this.image2 = images[1].image;
            this.image3 = images[2].image;
            this.image4 = images[3].image;
            this.image5 = images[4].image;
            this.image6 = images[5].image;
            this.image7 = images[6].image;
            this.image8 = images[7].image;
            this.image9 = images[8].image;
            console.log(this.image);
         }
        else{
            this.$router.push("/login");
        }
    },
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}

.mycontainer {
    // align-items: center;
    // align-self: center;
    // text-align: center;
    // display: flex;
    //   margin: 0 auto;
//        display: flex;
  justify-content: center;
  position: relative;
//   top: 50%;
//   display: flex;
//   align-items: center;
}

body,
html {
  margin: 0;
  height: 100%;
}

// input {
//   border: none;
// }

// .button {
// //   outline: none;
// align-content: center;
// align-items: center;
  
// }



