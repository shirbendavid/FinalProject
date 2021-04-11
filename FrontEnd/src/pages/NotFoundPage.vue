<template>
  <div class="container">
    <img src='../assets/404page.jpg' class="center" />
    <br/>
    <router-link to="/" exact class="text">Go back to home page</router-link>
  </div>
</template>


<style lang="scss" scoped>
.container {
  padding: 10px;
  vertical-align: middle;
}

.center {
  margin-left: 180px;
  padding-top: 6px;
  height: 460px;
  width: 780px;
}

.text {
  color: #eb983bd7;
  font-weight: bold;
  font-size: 20px;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  padding-top: 8px;
}

</style>