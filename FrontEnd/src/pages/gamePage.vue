<template>
  <div>
    <b-card-img style="max-width: 246px;" :src="require('../assets/'+dataImages[0].image+'.jpg')" alt="Image"></b-card-img>
    <b-icon
            v-if="checkSelected(0)"
            style="width: 30px; height: 30px;"
            icon="check-circle-fill"
            variant="danger"
            v-on:click="updateSelect(0)"
            aria-hidden="true"
            class="favorite_icon"
          ></b-icon>
          <b-icon
          v-else
            icon="check-circle"
            style="width: 35px; height: 30px;"
            v-on:click="updateSelect(0)"
            aria-hidden="true"
            class="favorite_icon"
          ></b-icon>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        dataImages: [], 
        multiSelected: 0, 
        numberOfImages: "",
        limit: "", 

      };
    },
    async created() {
      if(this.$root.store.email){
            let response;
            this.numberOfImages = 9; //need to export this 
            this.limit = 2;
            console.log(this.numberOfImages);
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/users/getImagesForGame/amount/"+this.numberOfImages
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }

            const images = response.data;
            for(let num in images){
              this.dataImages[num] = images[num];
              this.dataImages[num].src = "require('../assets/'"+images[num].image+"'.jpg')";
              this.dataImages[num].select = false;
            }
            console.log(this.dataImages);
            console.log(this.dataImages[0].image);
         }
        else{
            this.$router.push("/login");
        }
    },
    methods: {
      updateSelect(image){
        console.log("update!!!!")
        if(this.dataImages[image].select === false){
          if(this.multiSelected < this.limit){
            this.multiSelected++;
            this.dataImages[image].select = true;
          }
          else{
            alert("Unable to select more images")
          }
        }
        else{
          this.multiSelected--;
          this.dataImages[image].select = false;
        }

        console.log(this.multiSelected);
        console.log(this.dataImages);
      },
      checkSelected(image){
        return this.dataImages[image].select;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>