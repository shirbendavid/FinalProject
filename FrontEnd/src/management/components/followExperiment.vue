<template>
    <div class="container">
        <h3 class="p-3 text-center">List of the participants in the experiment</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date of registration</th>
                    <th>Status</th>
                    <th>Last login</th>
                    <th>No. images rated</th>
                    <th>Last time in the game</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.firstname}} {{user.lastname}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.dateOfRegistration}}</td>
                    <td>{{user.status}}
                        <br/>
                        <b-button size="sm" variant="outline-info"  @click="change(user.email)">
                            <b-icon icon="pencil"></b-icon>
                        </b-button>

                    </td>
                    <td>{{user.lastLogin}}</td>
                    <td>{{user.numOfRates}}</td>
                    <td>{{user.gameTime}}</td>
                </tr>
            </tbody>
        </table>

    <b-row>
      <button sm="2" type="submit" v-on:click="deactiveAllUsers">Deactive Status for all users</button>
    </b-row>
    <b-row>
      <button sm="2" type="submit" v-on:click="activeAllUsers">Active Status for all users</button>
    </b-row>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            users: []
        };
    },
    async created() {
        if(localStorage.getItem("emailAdmin")){
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/admins/getUsers"
                );
                console.log(response);
                if (response.status === 401) this.$router.replace("/loginManagement");
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }

            console.log(response.data);
            this.users = response.data;
         }
        else{
            this.$router.push("/loginManagement");
        }
    },
    methods: {
        async change(email){
            let response;
            try {
                response = await this.axios.put(
                this.$root.store.base_url +
                    "/admins/changeStatus/" + email
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }
            this.users = response.data;
        },
        async deactiveAllUsers(){
            let response;
            try {
                response = await this.axios.put(
                this.$root.store.base_url +
                    "/admins/allUsersInDeactiveStatus"
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }
            this.users = response.data;
        },
        async activeAllUsers(){
            let response;
            try {
                response = await this.axios.put(
                this.$root.store.base_url +
                    "/admins/allUsersInActiveStatus"
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }
            this.users = response.data;
        },
    },
};
</script>

<style lang="scss" scoped>

.th {
  border-top: 2px solid black !important;
}

</style>