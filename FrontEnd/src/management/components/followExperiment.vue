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
                    <th>No. games</th>
                    <th>Last time in the game</th>
                    <th>Advanced game</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.firstname}} {{user.lastname}}</td>
                    <td>{{user.email}}</td>
                    <td>{{format_date(user.dateOfRegistration)}}</td>
                    <td>{{user.status}}
                        <br/>
                        <b-button size="sm" variant="outline-info"  @click="change(user.email)">
                            <b-icon icon="pencil"></b-icon>
                        </b-button>
                    </td>
                    <td>{{format_date(user.lastLogin)}}</td>
                    <td>{{user.numOfRates}}</td>
                    <td>{{user.numOfGames}}</td>
                    <td>{{user.gameTime}}</td>
                    <td v-if="user.playAdvancedGame">allowed
                        <br/>
                        <b-button size="sm" variant="outline-info"  @click="changePlayAdvanced(user.email)">
                            <b-icon icon="pencil"></b-icon>
                        </b-button>
                    </td>
                    <td v-else>not allowed
                        <br/>
                        <b-button size="sm" variant="outline-info"  @click="changePlayAdvanced(user.email)">
                            <b-icon icon="pencil"></b-icon>
                        </b-button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex">
            <button class="btn-down" style="width: 28%;" type="submit" v-on:click="deactiveAllUsers">Deactive Status for all users</button>
            <button class="btn-down" style="width: 28%;" type="submit" v-on:click="activeAllUsers">Active Status for all users</button>
        </div>
    </div>    
</template>

<script>
  import moment from 'moment';
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
        async changePlayAdvanced(email){
            let response;
            try {
                response = await this.axios.put(
                this.$root.store.base_url +
                    "/admins/changePlayAdvancedGame/" + email
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
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY HH:MM');
            }
      },
    },
};
</script>

<style lang="scss">

.th {
  border-top: 2px solid black !important;
}


.btn-down {
  background: #fc995788;
  border: 1.5px solid black;
  border-radius: 5px;
  color: rgba(10, 10, 10, 0.719);
  font-size: 19px;
  line-height: 2em;
  font-family: "Merienda", Helvetica, Arial;
  margin-right: 50px;
  margin-bottom: 30px;
  margin-top: 5px;
}

.btn-down:hover {
  background: #ff9f5f8a;
  color:  rgba(10, 10, 10, 0.774);
  font-weight: bold;
  transition: all 0.4s ease;
}

.modal{
    display: block !important;
}
.modal-dialog{
      overflow-y: initial !important
}
.modal-body{
  height: 250px;
  overflow-y: auto;
}


</style>