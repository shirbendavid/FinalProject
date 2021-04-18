<template>
  <div>
    <h5 class="text-center">Initial Rating - Images</h5>
    <vue-excel-xlsx class="btnn"
        :data="data"
        :columns="columns"
        :filename="'InitialRating_Images'"
        :sheetname="'sheetname'"
        >
        Download
    </vue-excel-xlsx>
  </div>
</template>

<script>
export default {
          data() {
            return {
                columns : [
                    {
                        label: "Image",
                        field: "imageID",
                    },
                    {
                        label: "Rating 0",
                        field: "0",
                    },
                    {
                        label: "Rating 1",
                        field: "1",
                    },
                    {
                        label: "Rating 2",
                        field: "2",
                    },
                    {
                        label: "Rating 3",
                        field: "3",
                    },
                    {
                        label: "Rating 4",
                        field: "4",
                    },
                    {
                        label: "Rating 5",
                        field: "5",
                    },
                    {
                        label: "Rating 6",
                        field: "6",
                    },
                    {
                        label: "Rating 7",
                        field: "7",
                    },
                    {
                        label: "Rating 8",
                        field: "8",
                    },
                    {
                        label: "Rating 9",
                        field: "9",
                    },
                    {
                        label: "Rating 10",
                        field: "10",
                    },
                ],
                data : [
                    // {
                    //     product: "Beverage",
                    //     price: 10,
                    //     quantity: 2
                    // },
                    // {
                    //     product: "Snack",
                    //     price: 12,
                    //     quantity: 6
                    // },
                    // {
                    //     product: "Beverage",
                    //     price: 10,
                    //     quantity: 5
                    // },
                    // {
                    //     product: "Snack",
                    //     price: 12,
                    //     quantity: 3
                    // }
                ],
            }
        },
        methods: {
            priceFormat(value){
                return '$ ' + value;
            }
        }, 
        async created() {
          if(localStorage.getItem("emailAdmin")){
            let imagesRated;
            try {
                imagesRated = await this.axios.get(
                this.$root.store.base_url +
                    "/admins/getimagesRated"
                );
                console.log(imagesRated);
                if (imagesRated.status === 401) this.$router.replace("/loginManagement");
                if (imagesRated.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.imagesRated.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }
            this.data = imagesRated.data;
         }
        else{
            this.$router.push("/loginManagement");
        }
        },
}
</script>

<style lang="scss" scoped>

.btnn {
  background: rgba(255, 255, 255, 0.233);
  border: 1.4px solid black;
  border-radius: 5px;
  color: rgba(10, 10, 10, 0.65);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5em;
  width: 48%;
  font-family: "Merienda", Helvetica, Arial;
  margin-left: 50px;
  margin-top: 5px;
}

.btnn:hover {
  background: rgba(255, 255, 255, 0.39);
  color:  rgba(10, 10, 10, 0.774);
  font-weight: bold;
  transition: all 0.4s ease;
}
</style>
