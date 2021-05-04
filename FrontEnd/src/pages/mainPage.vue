<template>
  <div class="container">
    
      <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="window" style="overflow-y:scroll; height:550px;">
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

<style lang="scss">

.container {
  width: 100%;
  height: 100%;
}

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
    max-width: 1000px;
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
    font-size: 20px !important;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 15px;
    margin-bottom: 20px;
    color: black;
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
