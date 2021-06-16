<template>
  <div class="experiment_container">
    <h3 class="p-3 text-center">List of the participants in the experiment</h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>

           <th class="sortedColumn" @click="handleSort('dateOfRegistration', !sortMethod.order)">
                Date of registration
            <span v-if="sortMethod.name=='dateOfRegistration' && sortMethod.isSorted && sortMethod.order">
                 ▲</span>
            <span v-if="sortMethod.name=='dateOfRegistration' && sortMethod.isSorted && !sortMethod.order">
            ▼</span>
          </th>

          <th>Status</th>

          <th class="sortedColumn" @click="handleSort('lastLogin', !sortMethod.order)">
                Last login
            <span v-if="sortMethod.name=='lastLogin' && sortMethod.isSorted && sortMethod.order">
                 ▲</span>
            <span v-if="sortMethod.name=='lastLogin' && sortMethod.isSorted && !sortMethod.order">
            ▼</span>
          </th>

            <th class="sortedColumn" @click="handleSort('numOfRates', !sortMethod.order)">
                No. images rated
            <span v-if="sortMethod.name=='numOfRates' && sortMethod.isSorted && sortMethod.order">
                 ▲</span>
            <span v-if="sortMethod.name=='numOfRates' && sortMethod.isSorted && !sortMethod.order">
            ▼</span>
          </th>


           <th class="sortedColumn" @click="handleSort('numOfGames', !sortMethod.order)">
                No. games
            <span v-if="sortMethod.name=='numOfGames' && sortMethod.isSorted && sortMethod.order">
                 ▲</span>
            <span v-if="sortMethod.name=='numOfGames' && sortMethod.isSorted && !sortMethod.order">
            ▼</span>
          </th>

           <th class="sortedColumn" @click="handleSort('gameTime', !sortMethod.order)">
                Last time in the game
            <span v-if="sortMethod.name=='gameTime' && sortMethod.isSorted && sortMethod.order">
                 ▲</span>
            <span v-if="sortMethod.name=='gameTime' && sortMethod.isSorted && !sortMethod.order">
            ▼</span>
          </th>

          <th>Advanced game</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedItems" :key="user.id">
          <td>{{ user.firstname }} {{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ format_date(user.dateOfRegistration) }}</td>
          <td>
            {{ user.status }}
            <br />
            <b-button
              size="sm"
              variant="outline-info"
              @click="change(user.email)"
            >
              <b-icon icon="pencil"></b-icon>
            </b-button>
          </td>
          <td>{{ format_date(user.lastLogin) }}</td>
          <td>{{ user.numOfRates }}</td>
          <td>{{ user.numOfGames }}</td>
          <td>{{ format_date(user.gameTime) }}</td>
          <td v-if="user.playAdvancedGame">
            allowed
            <br />
            <b-button
              size="sm"
              variant="outline-info"
              @click="changePlayAdvanced(user.email)"
            >
              <b-icon icon="pencil"></b-icon>
            </b-button>
          </td>
          <td v-else>
            not allowed
            <br />
            <b-button
              size="sm"
              variant="outline-info"
              @click="changePlayAdvanced(user.email)"
            >
              <b-icon icon="pencil"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex">
      <button
        class="btn-down"
        style="width: 28%;"
        type="submit"
        v-on:click="deactiveAllUsers"
      >
        Deactive Status for all users
      </button>
      <button
        class="btn-down"
        style="width: 28%;"
        type="submit"
        v-on:click="activeAllUsers"
      >
        Active Status for all users
      </button>
    </div>
  </div>
</template>

<script>
    /*eslint-disable*/ 

  import moment from 'moment';
export default {
    
    data() {
        return {
            users: [],

            sortMethod: {
                name: '',
                order: false,
                isSorted: false,
            },
        };
    },

    computed: {
        sortedItems () {

            // all dates columns
            if (this.sortMethod.name == 'dateOfRegistration' ||
                this.sortMethod.name == 'gameTime' ||
                this.sortMethod.name == 'lastLogin') {

                return this.users.sort((a, b) => {

                    if (this.sortMethod.order){
                        return new Date(a[this.sortMethod.name]) - new Date(b[this.sortMethod.name]);
                    }
                    return new Date(b[this.sortMethod.name]) - new Date(a[this.sortMethod.name]);
                })
            }

            // sorting numbers
            else if (this.sortMethod.name == 'numOfRates' ||
                    this.sortMethod.name == 'numOfGames'){
                 return this.users.sort((a, b) => {

                    if (this.sortMethod.order){
                        return (a[this.sortMethod.name]) - (b[this.sortMethod.name]);
                    }
                    return (b[this.sortMethod.name]) - (a[this.sortMethod.name]);
                })
            }
            return this.users;
        }
    },

    async created() {
        if(localStorage.getItem("emailAdmin")){
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/admins/getUsers"
                );
                if (response.status === 401) this.$router.replace("/loginManagement");
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }

            this.users = response.data;
         }
        else{
            this.$router.push("/loginManagement");
        }
    },
    methods: {
        handleSort(name, order) {
            this.sortMethod.name = name;
            this.sortMethod.order = order;
            this.sortMethod.isSorted = true;
        }, 
       
        async change(email){
            let response;
            try {
                response = await this.axios.put(
                this.$root.store.base_url +
                    "/admins/changeStatus/" + email
                );
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
@import url(https://fonts.googleapis.com/css?family=Raleway);

th {
  border-top: 2px solid black !important;
  font-family: Raleway !important;
  
  
}
.sortedColumn {
  cursor: pointer;
}

table {
  font-family: Raleway !important;
}

.text-center {
  font-family: Raleway !important;
}

.btn-down {
  background: #fc995788;
  border: 1.5px solid black;
  border-radius: 5px;
  color: rgba(10, 10, 10, 0.719);
  font-size: 19px;
  line-height: 2em;
  font-family: Raleway !important;
  margin-right: 50px;
  margin-bottom: 30px;
  margin-top: 5px;
}

.btn-down:hover {
  background: #ff9f5f8a;
  color: rgba(10, 10, 10, 0.774);
  font-weight: bold;
  transition: all 0.4s ease;
}

.modal {
  display: block !important;
}
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  height: 250px;
  overflow-y: auto;
}

</style>


