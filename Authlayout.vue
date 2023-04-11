<template>
    <div class="AuthLayoutContainer authContent">
        <div class="cardContent text-center pa-5 mt-4">
            <img src="@/assets/image/logo.svg" height="60px" width="165px" class="pa-2 mt-3"/> 
            <div class="grey--text font-weight-bold fs-16 mt-1">Prop Technologies Private Limited</div>
              <br />
            <!-- <h2 class="black--text font-weight-bold font-family-roboto mt-6" v-if="$route.name =='verifyOtp'">Loan Vendor Portal</h2>  -->
             <!-- <h3 class="black--text font-weight-bold font-family-roboto pa-2">Loan Vendor Portal</h3> -->
            <v-card class="elevation-4 pa-2  mt-10 data-card  ">
                <router-view></router-view>
            </v-card>
        </div>  
    </div>
</template>
<script>
export default {
    name: "authlayout",
    data() {
        return {};
    },
};
</script>
<style scoped>
.authContent {
    min-height: 40vh;
    display: flex;
    justify-content: center;
    
}
.AuthLayoutContainer {
    min-height: 50vh;
    background: linear-gradient(
        180deg,
        rgba(44, 89, 167, 0.297) 10%,
        rgba(180, 193, 224, 0.132) 60%,
        rgba(255, 255, 255, 0) 100%
    );
    /* background: linear-gradient(
        180deg,
        rgba(125, 120, 120, 0.297) 20%,
        rgba(66, 68, 74, 0.132) 80%,
        rgba(255, 255, 255, 0) 100%
    ),url(""); */
    mix-blend-mode: normal;
    background-size: cover;
}
.cardContent {
    width: 300px;
    padding: 6px 12px;
    position: absolute;
    top: 47%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
.data-card {
    min-height: 325px;
    max-height: 326px;
    border-radius: 14px !important;
}
</style>
<style>
@media only screen and (min-width: 784px)
{
    .cardContent{
        width: 500px !important; 
         min-height: 400px ! important; 
}  
} 
/* @media only screen and (max-height: 1250px)
{
    .cardcontent{
        width: 500px !important;
    }
} */
</style>