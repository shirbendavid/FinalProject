<template>
  <div class="d-flex flex-column justify-center align-center">
    <div class="d-flex flex-row justify-center align-center">
      <v-select-image
        class="w-650"
        v-model="selectedItems"
        :items="items"
        :colorSchema="colorSchema"
        uniqueKey="key"
        :maxSelectable="maxSelectable"
        @maxSelectionError="maxSelected()"
      />
    </div>
  </div>
</template>

<script>
import VSelectImage from "../components/VSelectImage.vue";
export default {
  name: "App",
  components: { VSelectImage },
  methods: {
    maxSelected() {
      alert("You cant select more than " + this.maxSelectable);
    },
  },
  data() {
    return {
      maxSelectable: 2,
      selectedItems: [],
      items: [],
      colorSchema: "#8B8B8B",
    };
  },
  watch: {
    maxSelectable(newVal, oldVal) {
      if (newVal < this.selectedItems.length) {
        this.maxSelectable = oldVal;
      }
      if (this.items.length < newVal) {
        this.maxSelectable = oldVal;
      }
    },
  },
  async created() {
      if(this.$root.store.email){
        if(this.$root.store.numberOfImagesRating < this.$root.store.minImagesRating){
          alert("You did not rate enough photos, continue to rate...");
          this.$router.push("/ranking");
        }
        else{
            let paramsOfGame;
            try {
                paramsOfGame = await this.axios.get(
                this.$root.store.base_url +
                    "/users/getAllParams"
                );
                console.log(paramsOfGame);
                if (paramsOfGame.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.paramsOfGame.status", error.paramsOfGame.status);
                this.$router.replace("/NotFound");
                return;
            }
            // const limit = paramsOfGame.data[0].images_selectes_in_game;
            // console.log(limit);
            // this.maxSelectable = limit;
            // console.log(this.maxSelectable);
            this.numberOfImages = paramsOfGame.data[0].images_in_game;
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/users/getImagesForGame/amount/"+this.numberOfImages
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }

            const images = response.data;
            for(let num in images){
              const data = {key : images[num].image_id,
                            backgroundImage: images[num].image,
                            selectable: true};
              this.items.push(data);
            }
        }
        }
        else{
            this.$router.push("/login");
        }
    },
};
</script>

<style lang="scss" scoped>
.d-flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.justify-center {
  justify-content: center;
}
.align-center {
  align-items: center;
}
.w-650 {
  max-width: 650px;
}
.mt-20 {
  margin-top: 20px;
}
.mt-25 {
  margin-top: 20px;
}
pre {
  counter-reset: line-numbering;
  background: #2c3e50;
  padding: 12px 0px 14px 0;
  width: 600px;
  color: #ecf0f1;
  line-height: 100%;
}
pre code .line::before {
  content: counter(line-numbering);
  counter-increment: line-numbering;
  padding-right: 1em;
  /* space after numbers */
  padding-left: 8px;
  width: 1.5em;
  text-align: right;
  opacity: 0.5;
  color: white;
}
</style>
