
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
        1 - don't like, 10 - very like
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
        <router-link to="/ranking">
            <b-button
              color="primary"
              size="lg"
            >
              Start Rating
            </b-button>
        </router-link>
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
            this.image1 = images[0][0].image;
            this.image2 = images[1][0].image;
            this.image3 = images[2][0].image;
            this.image4 = images[3][0].image;
            this.image5 = images[4][0].image;
            this.image6 = images[5][0].image;
            this.image7 = images[6][0].image;
            this.image8 = images[7][0].image;
            this.image9 = images[8][0].image;
        /* }
        else{
            this.$router.push("/login");
        }*/
            this.image1 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026250/Final_Project/BBX8tmG_h6il1d.jpg"
            this.image2 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026488/Final_Project/BBVAosS_icugql.jpg";
            this.image3 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026249/Final_Project/BBZe1rZ_xwpt1j.jpg";
            this.image4 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026249/Final_Project/BBGLr2l_fbwmz2.jpg";
            this.image5 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026249/Final_Project/BBBLiMK_g38u4w.jpg";
            this.image6 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026249/Final_Project/AAHu3Hd_khok4o.jpg";
            this.image7 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026249/Final_Project/AAHujfr_wjhnnm.jpg";
            this.image8 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026249/Final_Project/AAHuaVF_aix8nx.jpg";
            this.image9 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026249/Final_Project/AAHukvt_lt0dt1.jpg";
            this.image10 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026249/Final_Project/AAHu8zK_dhh5yc.jpg";
            this.image11 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026249/Final_Project/AAHtU6t_imutx2.jpg";
            this.image12 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026248/Final_Project/AAgE7Wg_tncvx0.jpg";
            this.image13 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026248/Final_Project/AABRDtp_x3azka.jpg";
            this.image14 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026248/Final_Project/AABOrwR_wkppga.jpg";
            this.image15 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026248/Final_Project/AAHtU5Z_eutosi.jpg";
            this.image16 = "https://res.cloudinary.com/dfhrbnvty/image/upload/v1610026248/Final_Project/AABRDra_i0kpij.jpg";
    },
}
</script>
<style lang="scss" scoped>





