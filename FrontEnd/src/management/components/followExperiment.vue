<template>
    <div class="container">
        <h3 class="p-3 text-center">List of participants in the experiment</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
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
                    <td>{{user.status}}</td>
                    <td>{{user.lastLogin}}</td>
                    <td>{{user.numOfRates}}</td>
                    <td>{{user.gameTime}}</td>
                </tr>
            </tbody>
        </table>
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
};
</script>