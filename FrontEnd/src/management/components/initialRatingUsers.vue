<template>
  <div>
    <h5 class="text-center">Initial Rating - Users</h5>
    <vue-excel-xlsx class="btnn"
        :data="data"
        :columns="columns"
        :filename="'InitialRating_Users'"
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
                columns : [],
                data : [],
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
                if (response.status === 401) this.$router.replace("/loginManagement");
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
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
            
            let imagesRatedByUsers;
            try {
                imagesRatedByUsers = await this.axios.get(
                this.$root.store.base_url +
                    "/admins/getimagesRatedByUsers"
                );
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

<style lang="scss">
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
