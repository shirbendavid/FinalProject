<template>
  <div class="after-container">
    <br />
    <div class="center">
      <br /><br /><br />
      <h1>
        <b>Hello {{ $root.store.firstname }}!</b>
      </h1>

      <h3>You rated enough images.</h3>
      <h3>You can choose to continue to rate more images or play the game.</h3>

      <br /><br /><br />
      <div class="my-2">
          <b-button size="lg" class="btn-after" color="primary" to="/ranking">
            Images Rating
          </b-button>
      </div>
      <div class="my-2">
          <b-button size="lg" class="btn-after" color="primary" to="/game">
            Play Game
          </b-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.center {
  margin: auto;
  width: 50%;
  border: 3px solid rgb(53, 204, 224);
  text-align: center;
  max-height: 55%;
}

.btn-after {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 50%;
}

.button {
  margin-left: 10px !important;
}

</style>
