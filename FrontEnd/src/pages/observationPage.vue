
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
            <!-- <RandomRecipePreviewList class="RandomRecipes center" /> -->
        <img src='https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768' class="center" width="300" height="300" />
        </b-col>
        <b-col>
            <img src='https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768' class="center" width="300" height="300" />
            <!-- <login-page></login-page> -->
        </b-col>
        <b-col>
            <img src='https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768' class="center" width="300" height="300" />
        </b-col>
        </b-row>
        <br/>
        <b-row>
        <b-col>
            <!-- <RandomRecipePreviewList class="RandomRecipes center" /> -->
        <img src='https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768' class="center" width="300" height="300" />
        </b-col>
        <b-col>
            <img src='https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768' class="center" width="300" height="300" />
            <!-- <login-page></login-page> -->
        </b-col>
        <b-col>
            <img src='https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768' class="center" width="300" height="300" />
        </b-col>
        </b-row>
        <br/>

        <b-row>
        <b-col>
            <!-- <RandomRecipePreviewList class="RandomRecipes center" /> -->
        <img src='https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768' class="center" width="300" height="300" />
        </b-col>
        <b-col>
            <img :src="image" class="center" width="300" height="300" />
            <!-- <login-page></login-page> -->
        </b-col>
        <b-col>
            <img src='https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768' class="center" width="300" height="300" />
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
            image: ''
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

            const images = response.data;
            console.log(images);
            this.image = images[0];
            console.log(this.image);
            // this.image = "https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768";
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



