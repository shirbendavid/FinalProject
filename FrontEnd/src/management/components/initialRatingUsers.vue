<template>
  <div>
    <h6>Initial Rating - Users</h6>
    <vue-excel-xlsx
        :data="data"
        :columns="columns"
        :filename="'filename'"
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
                    // {
                    //     label: "Product",
                    //     field: "product",
                    // },
                    // {
                    //     label: "Price",
                    //     field: "price",
                    //     dataFormat: this.priceFormat
                    // },
                    // {
                    //     label: "Quantity",
                    //     field: "quantity",
                    // },
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
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/admins/getImagesId"
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }

            this.columns.push({
                        label: "User",
                        field: "email",
                    })
            for(let i in response.data){
                this.columns.push({
                        label: "image "+response.data[i].imageID,
                        field: response.data[i].imageID,
                    })
            }
            console.log(this.columns);
            
            let imagesRatedByUsers;
            try {
                imagesRatedByUsers = await this.axios.get(
                this.$root.store.base_url +
                    "/admins/getimagesRatedByUsers"
                );
                console.log(imagesRatedByUsers);
                if (imagesRatedByUsers.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.imagesRatedByUsers.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }
            this.data = imagesRatedByUsers.data;
         }
        else{
            this.$router.push("/loginManagement");
        }
        },
}
</script>

<style lang="scss" scoped></style>
