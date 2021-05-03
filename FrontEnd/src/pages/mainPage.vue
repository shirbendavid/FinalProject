<template>
  <div class="container">
    
      <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="window" style="overflow-y:scroll; height:600px;">
                <slot>   
                      <button class="button-x" tag="b-nav-item" @click="close()">
                            X
                        </button>
                <p class="text">
                  <b>ברוכים הבאים למשחק העדפת תמונות</b>
                  <br/>
                  .המשחק נערך במסגרת פרויקט גמר במחלקה להנדסת מערכות תוכנה ומידע
                  <br/><br/>
                  <u>:המשחק מחולק לשני שלבים</u>
                  <br/>
                  בשלב הראשון, עליכם לצפות ב-60 תמונות לפחות ולתת להן ציון לפי סולם של 10 דרגות שמבטא עד
                  <br/>
                  כמה אתם אוהבים את התמונה. שלב זה נמשך כ-10 דקות. חשוב שתתנו ציונים המשקפים את העדפותיכם
                  <br/>
                  .כי המשחק תלוי בכך שבהמשך תזהו אילו תמונות אהבתם יותר ואילו פחות
                  <br/><br/>
                  בשלב השני, לאחר דירוג התמונות אתם מוזמנים לשחק במשחק. בכל פעם שתיכנסו למערכת יוצגו בפניכם
                  <br/>
                  ארבעה מסכים שבכל אחד מהם מספר תמונות מתוך אלו שראיתם בשלב הראשון. האתגר הוא לזהות  
                  <br/>
                  .ולבחור בכל אחד מהמסכים את התמונות להן נתתן את הציונים הגבוהים ביותר בשלב הקודם
                  <br/>
                  .על כל בחירה נכונה תזכו בנקודה
                  <!-- <br/><br/>
                  המטרה היא לצבור כמה שיותר נקודות במהלך תקופת המשחק. אנא התאמצו ככל האפשר כדי שתהיה לנו
                  <br/>
                  תחרות מעניינת! אתם מוזמנים לשחק במשחק פעם אחת בכל יום, במהלך כל התקופה בה יהיה המשחק
                  <br/>
                  .זמין. לא ניתן לשחק במשחק יותר מאשר פעם אחת ביום
                  <br/> -->
                  כדי לאפשר משחק בהתאם לכללים, וכדי לאפשר קשר אתכם במהלך תקופת המשחק, נבקשכם לציין כתובת
                  <br/>
                  של דואר אלקטרוני באמצעותה נוכל לשלוח לכם הודעות (למשל, תזכורת במידה ועברו מספר ימים מאז ששיחקתם לאחרונה). מעבר לכך, אין צורך באמצעי הזדהות כלשהו. אתם יכולים גם לבחור בעצמכם כינוי
                  <br/>
                  .שיאפשר לכם לזהות את עצמכם בטבלת השחקנים המצטיינים
                  <br/>
                  <u>:אנו מתחייבים</u>
                  <br/>
                  <ul style="direction: RTL;">
                    <li>לעדכן אתכם לגבי ההישג שלכם במשחק עם סיום תקופת המשחק.
                    </li>
                    <li>כל הנתונים על המשחק יישמרו על מחשב מאובטח וישמשו אך ורק לניתוחים סטטיסטיים.
                      <br/>
                      בשום אופן לא יפורסמו נתונים אישיים לגביכם.
                    </li>
                  </ul>
                  <br/>
                  <label class="checking"> אני אני מסכים/ה להשתתף במשחק העדפת התמונות בהתאם לתנאים שפורטו לעיל.
                    <input type="checkbox" checked="checked" style="direction: RTL;">
                      <span class="checkmark" style="direction: RTL;"></span>
                  </label>
                </p>
                </slot>
                    </div>
                </div>
            </transition>
    
    
    
    <br/>
     
    <!-- <h1 class="title">
      <b>Beautiful Images</b> 
    </h1>
    <h3 class="sub-title">The Game!</h3> -->
    <img src='../assets/main logo.png' class="center" />
    <br/>
    <div id="example">
      <br/>
      <carousel-3d :controls-visible="true" :controls-prev-html="'❬ '" :controls-next-html="'❭'" :controls-width="30" :height="200" :controls-heigth="100" :clickable="false">
        <slide v-for="(slide, i) in slides" :index="i" v-bind:key="i">
            <figure>
                <img :src="slide.src">
            </figure>
          </slide>
      </carousel-3d>
      <br/>
    </div>
  </div>
  <!-- <b-container class="container">
    
  </b-container> -->
        

  
  
</template>

<script>
 export default {
   data() {
    return {
      isVisible: true,
      slides: [
        { id: 1, src: '' },
        { id: 2, src: '' },
        { id: 3, src: '' },
        { id: 4, src: '' },
        { id: 5, src: '' },
        { id: 6, src: '' },
        { id: 7, src: '' },
        { id: 8, src: '' },
      ],
      
      // image: {
      //   backgroundImage: "url(data:image/jpeg;base64,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)"
      // },
    
    };
  },
  methods: {
        open() {
            this.isVisible = true
        },

        close() {
            this.isVisible = false
        },
    },

  async created() {
    let response;
    try {
      response = await this.axios.get(  //"/coil/images/getImages/amount/"+8);
       this.$root.store.base_url + "/images/getImages/amount/"+8);
      console.log(response);
      if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
        const images = response.data;
        this.slides[0].src = images[0];
        this.slides[1].src = images[1];
        this.slides[2].src = images[2];
        this.slides[3].src = images[3];
        this.slides[4].src = images[4];
        this.slides[5].src = images[5];
        this.slides[6].src = images[6];
        this.slides[7].src = images[7];
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}

// @import url('https://fonts.googleapis.com/css?family=Allura');
// @import url('https://fonts.googleapis.com/css?family=Raleway');
// @import url('https://fonts.googleapis.com/css?family=Special+Elite');

.title {
  font-family: 'Allura';
  font-size: 120px;
  color: black;
  text-align: center;
}

.sub-title{
  font-family: Special Elite;
  color: black;
  text-align: center;
  font-size: 50px;
  margin-bottom: 0px;
}

image{
    width: 100%;
    height: 100%;
    max-height: 100%;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-repeat: no-repeat;
}
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}
.center {
  margin-left: 30%;
  padding-top: 6px;

}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    z-index: 1;

}

.window {
    background: #f8dbbad3;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 850px;
    margin-left: auto;
    margin-right: auto;
    padding: 1.1rem;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border: 1.5px solid;
    text-align: right;
    //window.scrollBy(0,100);
}


.text {
    font-size: 20px;
    font-family: "Merienda", Helvetica, Arial;
    margin-top: 15px;
    margin-bottom: 20px;;
}
.title {
    text-align: center;
    font-family: "Merienda", Helvetica, Arial;
}
.buttonb {
    float: right;
    margin-right:45%;
    width: 170px;
    font-size: 25px;
}

.button-x {
  width: 30px;
}
.checking {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-right: 5px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: RTL;
}

/* Hide the browser's default checkbox */
.checking input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checking:hover input ~ .checkmark {
  background-color: #ccc;
  direction: RTL;
}

/* When the checkbox is checked, add a blue background */
.checking input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  background-color: #2196F3;
}

/* Show the checkmark when checked */
.checking input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checking .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}



</style>
