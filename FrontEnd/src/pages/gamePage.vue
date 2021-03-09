<template>
  <b-container class="container">
    <div id="app" class="VueSelectImage">
      <br />
      <h1 class="title">Game Time</h1>
      
        <!-- <h4 class="title">Let's see if you can recognition your favorite images </h4> -->
        <!-- <br /> -->


        <div class="grid__row content centered">
            <vue-select-image :dataImages="dataImages"
                :is-multiple="true"
                :selectedImages="imageMultipleSelected"
                @onselectmultipleimage="onSelectMultipleImage"
                @onreachlimit="onReachLimit"
                :limit="limit" 
                :w="246"
                ref="multi-select-image"
                :activeClass="'--active'">
            </vue-select-image>
         <br/>
          <!-- <div>
          <h5>Mutiple Image Selected :
            <span v-for="(imgSelected, index) in imageMultipleSelected" :key="index">
              <span>id = {{ imgSelected.id }}, </span>
            </span>
          </h5>
        </div> 
          <br /> -->

          <b-row>
            <b-col>
              <b-button
                style="border-radius: 5px; font-family: Special Elite; width: 75%; font-size: 24px; 
                 background-color: #ff751a;"
                @click="onUnselectImages">
                Reset Selection
              </b-button>
            </b-col>

            <b-col>
              <b-button
                style="border-radius: 5px; font-family: Special Elite; width: 95%; font-size: 24px; 
                 background-color: #ff751a;"
                @click="check">
                Check my answers ;)
              </b-button>
            </b-col>

    <b-col>
        <span v-if="this.currentScreenNum < numOfScreens" >
             <b-button
                style="border-radius: 5px; font-family: Special Elite; font-size: 24px; width: 75%;
                background-color: #ff751a"
                @click="goToNextImages">
                Keep playing !
              </b-button>
        </span>

        <span v-else>
            <b-button
                style="border-radius: 5px; font-family: Special Elite; font-size: 24px; width: 75%;
                background-color: #ff751a"
                @click="onSelectImage">
                Submit
              </b-button>        
        </span>
         </b-col>   
          </b-row>
          <br/>
        </div>
    </div>
  </b-container>
</template>

<script>

import VueSelectImage from "vue-select-image";

// const alertMessage= "You reached the limit of " + this.limit + " images.";

export default {
  name: 'selector',
  components: {
    VueSelectImage,
  },
  data () {
    return {
      title: '✅ Vue Select Image',
      subtitle: 'Vue 2.x component for selecting image from list',
      imageMultipleSelected: [],
      limit: 5,

      numOfScreens: 3, //////////// ################ chhanngeeeee #####
      currentScreenNum: 1,

      dataImages:
      [{
            id: '${images[0].id}',
            src: require('../assets/image1.jpg'),
            alt: 'Alt Image 1'
        },
        {
            id: '2',
            src: require('../assets/image2.jpg'),
            alt: 'Alt Image 2'
        },
        {
            id: '3',
            src: require('../assets/image3.jpg'),
            alt: 'Alt Image 3',
        },
        {
            id: '4',
            src: require('../assets/image4.jpg'),
            alt: 'Alt Image 4',
        },
        {
            id: '5',
            src: require('../assets/image5.jpg'),
            alt: 'Alt Image 5'
        },
        {
            id: '6',
            src: require('../assets/image6.jpg'),
            alt: 'Alt Image 6'
        },
        {
            id: '7',
            src: require('../assets/image7.jpg'),
            alt: 'Alt Image 7',
        },
        {
            id: '8',
            src: require('../assets/image8.jpg'),
            alt: 'Alt Image 8',
        },

    ],
    async created() {
    console.log(this.dataImages[0]);
        /*if(this.$root.store.email){
            let response;
            try {
                response = await this.axios.get(
                this.$root.store.base_url +
                    "/images/getImagesForGame"
                );
                console.log(response);
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }

            const images = response.data;
            console.log(images);
            this.image1 = images[0][0].image
            this.image2 = images[1][0].image;
            this.image3 = images[2][0].image;
            this.image4 = images[3][0].image;
            this.image5 = images[4][0].image;
            this.image6 = images[5][0].image;
            this.image7 = images[6][0].image;
            this.image8 = images[7][0].image;
            this.image9 = images[8][0].image;
         }
        else{
            this.$router.push("/login");
        }
        */
    },
      initialSelected: [],
    //     {
    //       id: '2',
    //       src: 'http://placekitten.com/201/200',
    //       alt: 'Angular'
    //     },
    //     {
    //       id: '3',
    //       src: 'http://placekitten.com/202/200',
    //       alt: 'Vue.js'
    //     }
    //   ],
    }
  },
  methods: {
    onSelectImage: function (data) {
      console.log('fire event onSelectImage: ', data)
      this.imageSelected = data
    },
    onSelectMultipleImage: function (data) {
      console.log('fire event onSelectMultipleImage: ', data)
      this.imageMultipleSelected = data
    },
    onReachLimit: function () {
    //   alert( alertMessage )
    alert( "You reached the limit of XXX images.")
    },

    onUnselectImages: function() {
        console.log('reset multiii');
        // this.imageMultipleSelected = [];
        while ( this.imageMultipleSelected.length > 0 )
            this.imageMultipleSelected.pop();
    },

    check: function () {
        console.log("to checkkk, from DB !!");
        //const numMiss= 0;
        
       /* while ( this.imageMultipleSelected.length > 0 ){
            const currSelected= this.imageMultipleSelected.pop();
            const i=0;
            while(i<images.length){
              if(images[i].id==currSelected.id )
                if(images[i].rate==="low")
                  numMiss++;
                break;
              i++;
            }
        }
        alert(" you have "+ numMiss+" mistakes");
    */
    },

    goToNextImages: function() {
        this.currentScreenNum++;

        console.log('this is next pageee');
        // this.imageMultipleSelected = [];
        while ( this.dataImages.length > 0 ){
            this.dataImages.pop();
            this.imageMultipleSelected.pop();
        }

        this.dataImages.push({
            id: '8',
            src: require('../assets/image9.jpg'),
            alt: 'Alt Image 8',
        });

        this.dataImages.push({
            id: '5',
            src: require('../assets/image10.jpg'),
            alt: 'Alt Image 5'
        });
            
        this.dataImages.push({
            id: '6',
            src: require('../assets/image11.jpg'),
            alt: 'Alt Image 6'
        });

        this.dataImages.push({
            id: '7',
            src: require('../assets/image12.jpg'),
            alt: 'Alt Image 7',
        });
    },
  },

  
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Special+Elite);

.container {
  background-color: rgba(255, 255, 255, 0.89);
  opacity: 95%;
  color: black;
  font-size: 16px;
  /* width: 80%; */
  /* padding-left: 25px;
  padding-right: 25px; */
}
.title {
  color: black;
  font-family: Special Elite;
  width: 80%;
  text-align: center;

}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
small {
  display: block;
  color: #ddd;
  font-size: 16px;
}
.grid__row {
  *zoom: 1;
  margin: 0 auto;
  max-width: 92.308em;
}
.grid__row:before,
.grid__row:after {
  display: table;
  content: " ";
}
.grid__row:after {
  clear: both;
}
.centered {
  text-align: center;
}
.content {
  margin: 0 20px;
}
.ion {
  &:hover {
    color: #4f8ef7;
  }
}
.label-image {
  font-size: 0.7rem;
}
.vue-select-image {
  display: flex;
  justify-content: center;
}
pre,
code {
  text-align: left;
  max-width: 500px;
  margin: auto;
}
table {
  overflow: auto;
  margin: auto;
  margin-top: 0;
  margin-bottom: 16px;
  border-spacing: 0;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.2rem;
}
.VueSelectImage {
  .vue-select-image__thumbnail--active {
    background: #50af2b;
    &:after {
      content: "✅";
      position: absolute;
      color: #50af2b;
      margin-top: -190px;
      margin-left: 70px;
      font-size: 20px;
      border-radius: 3px;
    }
  }
}
.custom-style {
  display: flex;
  justify-content: center;
  &__wrapper {
    overflow: auto;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    padding: 0px;
    margin: 0px;
  }
  &__item {
    margin: 0px 12px 12px 0px;
    float: left;
    @media only screen and (min-width: 1200px) {
      margin-left: 30px;
    }
  }
  &__thumbnail {
    padding: 6px;
    border: 1px solid #dddddd;
    display: block;
    padding: 4px;
    line-height: 20px;
    border: 1px solid #ddd;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    &--selected {
      background: #0088cc;
      .custom-style__img {
        zoom: 1.1;
      }
    }
  }
  &__img {
    -webkit-user-drag: none;
    display: block;
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
}
.adswrapper {
  width: 70%;
  margin: 0 auto;
  text-align: center;
}
</style>
