<template>
  <div class="after-container">
    <br>
    <div class="center">
    <br/><br/><br/>
    <h1 ><b>Hello {{ $root.store.firstname }}!</b></h1>

    <h3>You rated enough images.</h3>
    <h3>You can choose to continue to rate more images or play the game.</h3>

    <br/><br/><br/>
    <div class="my-2">
        <router-link to="/ranking" >
          <b-button size="lg" class="btn-after"
                    color="primary" 
                   >
          Images Rating
          </b-button>
          
        </router-link>
        </div>
            <div class="my-2">

         <router-link to="/game" >
          <b-button size="lg" class="btn-after"
                    color="primary" 
                   >
         Play Game
          </b-button>
        </router-link >    
           </div>

</div>
  </div>
</template>


<style lang="scss">

.center {
  margin: auto;
  width: 50%;
  border: 3px solid rgb(53, 204, 224);
//   padding: 10px;
  text-align: center;
  max-height: 55%;
}

.btn-after {
    // margin-left: 50%;
    // margin-right: 50%;
    Display: flex;
    flex-direction: column;
    margin: auto;
}

.button {
  margin-left: 10px !important;
}

</style>