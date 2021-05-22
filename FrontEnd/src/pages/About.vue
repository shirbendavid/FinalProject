
<template>
  <div class="container">
    <div class="center">
            <div class="my-2">
          <b-button class="button"
                    variant="outline-secondary" 
                    @click="close"
                   >
          X
          </b-button>
        </div>
    <img src='../assets/new logo.png'  style="width:28%; height:28%;" />
    <br/>
    <br/>

    <b-row>
        <b-col>
                <p class="textAbout"> 
       <b>:צוות הפיתוח</b>
<br/>
שיר בן דור
<br/>
לירון בן יעקב
<br/>
ירדן לוי
<br/>
טלי שוורץ
<br/>
ד"ר דניס קלימוב
<br/>
פרופ' נעם טרקטינסקי
    </p>

    </b-col>
    <b-col cols="8">
    <p class="textAbout"> 
         <b>:על המשחק</b>
         <br/>

                        משחק העדפת תמונות פותח במסגרת פרויקט גמר במחלקה
                        <br/>
                        .להנדסת מערכות תוכנה ומידע באוניברסיטת בן-גוריון
                        <br/>
                        המשחק עצמו מסייע לחוקרים במחלקה לחקור נושאים
                        <br/>
                        .הקשורים להעדפות אסתטיות של אנשים
                        <br/>
   
</p>
    </b-col>
    
    </b-row>
    <br>
     <p class="textAbout2">  
              <b>:הטכנולוגיות בהן עשינו שימוש </b></p>

                        <img src="../assets/sqllogo.png" style="width: 7%;"/>
                        <img src="../assets/nodejs.png" style="width: 7%;"/>
                        <img src="../assets/Vue.png" style="width: 6%;"/>
                        <img src="../assets/html logo.jpg" style="width: 7%;"/>
                        <img src="../assets/csslogo.png" style="width: 7%;"/>
                        <img src="../assets/javascript.png" style="width: 6%;"/>



</div>

  </div>
</template>
<script>
export default {
   methods: {

        close() {
            this.isVisible = false
            this.$router.go(-1);
        },
   }    
}
</script>

<style lang="scss">

.center {
  margin: auto;
  width: 80%;
  height: auto;
  border: 3px solid rgba(143, 241, 216, 0.87);
 border-radius: 5px;
  padding: 10px;
  text-align: center;
  background-color: rgba(251, 241, 226, 0.555);
}
.titleAbout{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: black;
}
.textAbout{
    font-size: large;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: right;
    color: black;

}
.button{
    margin-left:90%;
}
.textAbout2{
    font-size: medium;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
    color: black;}
</style>