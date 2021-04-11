<template>
    <!-- <div :style="image"> -->
    <div class="container">
        <div class= "about">
            <b-row>
                <b-col>
                    <h1 class="title">ABOUT</h1>
                    <br/>
                    <div class="txt">
                        <b>About the project:</b>
                        <br/>
                        This is an e2e system that aims to help the researchers conduct their research through
                        a computer game platform based on image recognition and preference.
                        The project includes characterization of the system, collecting data of user performance
                        with the game system and analyzing the results. 
                        <br/>
                        The aim of the research is to examine preferences of beautiful images by users over time.
                        The motivation for conducting the research comes from the information security world. 
                        User identification is a critical step in information security. Recently, identification 
                        methods have been developed based on a user's preference and in this research we are 
                        checking them as well.
                        <br/>
                        <br/>
                        <b>About the Team:</b>
                        <br />
                        We are 4 Software and Information System Engineering students in our 4th year and this 
                        is our final project.
                        <br/>
                        Our advisors: Prof. Noam Tracktinsky and Dr. Denis Kalimov
                        <br/>
                        <img src="../assets/sqlDB.png" style="width: 15%;"/>
                        <img src="../assets/nodejs.png" style="width: 15%;"/>
                        <img src="../assets/Vue.png" style="width: 15%;"/>
                        <img src="../assets/javascript.png" style="width: 15%;"/>
                        <img src="../assets/html5.png" style="width: 15%;"/>
                        <img src="../assets/css3.jpg" style="width: 15%;"/>
                    </div>
                </b-col>
                <b-col>
                    <img src="../assets/image1.jpg" style="width: 80%; border-radius: 15px; opacity: 1;"/>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                     <img src="../assets/image8.jpg" style="width: 80%; border-radius: 15px; opacity: 1;"/>
                </b-col>
                <b-col>
                    <br/>
                    <h2 class="title">ADDITIONAL LINKS:</h2>
                    <div class="txt">
                        <b>Liron's GitHub</b>
                        <br/>
                        <!-- <a href=""></a> -->
                        <b>Shir's GitHub</b>
                        <br/>
                          <!-- <a href=""></a> -->
                        <b>Tali's GitHub</b>
                        <br/>
                          <!-- <a href=""></a> -->
                        <b>Yarden's GitHub</b>
                        <br/>
                          <!-- <a href=""></a> -->
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
    <!-- </div> -->
</template>

<style lang="scss" scoped>
.container {
    max-width:60%;
}
.fa{
    padding:2px;
    font-size:30px;
    text-align: center;
    text-decoration: none;
    color: black;
}
.fa:hover {
    opacity: 0.7;
}
.about {
    margin: 6px;
    padding: 8px;
    background: linear-gradient(#e9c9b5c5, #f3c48ec7);
    //background: rgba(26,26,26,0.74);

    opacity: 0.997;
    width: 100%;

    margin: auto;
    border-radius: 20px;

}
.title {
    color: #fff;
    text-align: center;
}
.txt {
    color: #000;
}
// image{
//     width: 100%;
//     height: 100%;
//     max-height: 100%;
//     margin: 0;
//     padding: 0;
//     background-size:100% 100%;
//     background-repeat: no-repeat;
// }
</style>