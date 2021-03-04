<template>
<div class="container">
   <router-link to="/" >
  <b-button>Back To Home
      </b-button>
   </router-link>
  
<br/>
<br/>
  <div v-if="!$root.store.emailAdmin && !this.$cookies.get('session')">
      <LoginManage
      />
  </div>
  <div v-else-if="!$root.store.email">
      <ParameterManage/>
  </div>
  </div>
</template>

<script>
import LoginManage from '../components/loginManage'
import ParameterManage from '../components/parameterManage'
export default {
  components: {
    LoginManage,
    ParameterManage,
  },
}
</script>

<style>

</style>