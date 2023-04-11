<template>
    <div>
        <h3 class="pa-0 mt-1">Loan Vendor Portal</h3>
        <div class="titleText mt-1 ">Verify OTP</div>
        <div class="contain-text mt-1">
            We have sent you a 4 digit OTP on your Mobile <br />No.
            {{ get_number }}
             <span
                class="primary--text pointer edit-number pl-3 mt-2"
                @click="$router.push({ name: 'login' })"
                >Edit</span>
        </div>
        <v-form lazy-validation ref="otpForm" class="mt-1">
            <v-row no-gutters justify="center">
                <v-col cols="6 mx-2 mt-4">
                    <v-otp-input
                        v-model="otp"
                        length="4"
                        @finish="verifyNumber"
                        :disabled="loading"
                        type="number"
                    ></v-otp-input>
                    <v-row no-gutters justify="center">
                        <v-col cols="6" class="text-center pa-1">
                            <div v-if="!resendBtn">
                                <v-btn
                                    text
                                    class="text-capitalize"
                                    @click="resendOTP"
                                    :loading="resendOTPLoading"
                                >
                                    <span  class="text-center mt-1" style="color:#187bcd">Resend</span>
                                </v-btn>
                            </div>
                            <div v-else>
                                <v-btn text class="text-capitalize text-center">
                                    <span class="resend-otp-style pa-2">
                                        Resend in {{ timer }}s</span
                                    >
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="9" class="pa-2 mt-1">
                    <v-btn
                        dark
                        block
                        class="primary buttonClass text-capitalize"
                        height="45px"
                        :loading="loading"
                        @click="test"
                        font-family="roboto"
                        font-size="28px"
                    >
                        <span>Submit</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>
<script>
import RULES from "@/common/fieldRules";
import { mapActions, mapMutations, mapState } from "vuex";
import authToken from "../../common/authToken";

export default {
    name: "verifyOtp",
    data() {
        return {
            rules: RULES,
            otp: "",
            resendBtn: false,
            number: "",
            timer: 10,
            newbtn: false,
            loading: false,
            resendOTPLoading: false,
            // email:null,
        };
    },
    computed: {
        ...mapState({
            get_number: (state) => state.app.login_number,
            // get_email: (state) => state.app.login_email,
        }),
    },
    mounted() {
        this.sendedLink();
        if (!this.get_number) this.$router.push({ name: "login" });
        // if (!this.get_email) this.$router.push({ name: "login" });
    },

    methods: {
        ...mapActions({
            showSnackbar: "snackBar/showSnackbar",
        }),
        ...mapMutations({
            setNumber: "app/SET_LOGIN_NUMBER",
            // setEmail: "app/SET_LOGIN_EMAIL",
        }),
        resendOTP() {
            this.resendOTPLoading = true;
            let formData = {};
            const successHandler = (res) => {
                this.resendOTPLoading = false;
                this.sendedLink();
                this.showSnackbar({
                    text: res.data.message,
                });
            };
            const failHandler = () => {
                this.resendOTPLoading = false;
            };
            formData["phone"] = this.get_number;
            // formData["email"] = this.get_email;
            return this.$request(
                this.$keys.POST,
                this.$urls.auth.send_otp,
                {
                    data: formData,
                    onSuccess: successHandler,
                    onFinally: failHandler,
                    isTokenRequired: false,
                }
                // onFailure: failHandler,
            );
        },
        sendedLink() {
            this.timer = 10;
            this.resendBtn = true;
            this.newbtn = true;
            this.setIntervalTime();
        },
        setIntervalTime() {
            setInterval(() => {
                if (this.timer > 0) {
                    this.timer = this.timer - 1;
                    if (this.timer === 0) {
                        this.resendBtn = false;
                    }
                }
            }, 1150);
        },
        // verifyEmail() {
        //     if(this.$refs.otpForm.validate()) {
        //         this.loading = true;
        //         const successHandler = (res) => {
        //             authToken.setToken(
        //                 res.data.access_token,
        //                 res.data.refresh_token
        //             );
        //             this.loading = false;
        //             this.showSnackbar({
        //                 text:"login Successful",
        //             });
        //             this.setEmail(this.email);
        //             this.$router.push({name: "dashboard"});
        //         };
        //         const finallyHandler = () => {
        //             this.loading = false;
        //         };
        //         let formData = {};
        //         formData["email"] = this.mobile;
        //         formData["otp"] = this.otp;
        //         return this.$request(
        //             this.$keys.POST,
        //             this.$urls.auth.verify_otp,
        //             { 
        //                 data:formData,
        //                 onSuccess: successHandler,
        //                 onFinally: finallyHandler,
        //                 isTokenRequired: false,
        //             }
        //         );
        //     }
        // },
        verifyNumber() {
            if (this.$refs.otpForm.validate()) {
                this.loading = true;
                const successHandler = (res) => {
                    authToken.setToken(
                        res.data.access_token,
                        res.data.refresh_token
                    );
                    this.loading = false;
                    this.showSnackbar({
                        text: "Login Successful",
                    });
                    this.setNumber();
                    this.$router.push({ name: "dashboard" });
                };
                const finallyHandler = () => {
                    this.loading = false;
                };
                let formData = {};
                formData["phone"] = this.get_number;
                // formData["email"] = this.get_email;
                 formData["otp"] = this.otp;
                return this.$request(
                    this.$keys.POST,
                    this.$urls.auth.verify_otp,
                    {
                        data: formData,
                        onSuccess: successHandler,
                        onFinally: finallyHandler,
                        isTokenRequired: false
                    }
                );
            }
        },
    }
}
</script>
<style scoped>
.buttonClass {
    width: 50px;
    border-radius: 6px;
}
.forgetpassword {
    font-weight: 380;
    font-size: 15px;
    line-height: 45px;
}
.titleText {
    font-weight: 600;
    font-family:'roboto';
    font-size:18px;

}
.contain-text {
    font-size: 14px;
    line-height: 19px;
    color:#333333;
    font-style: normal;
}
/* .edit-number:hover {
    text-decoration: underline; */
.resend-otp-style {
    font-weight: 350;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    text-decoration-line: underline;
    color: rgba(51, 51, 51, 0.74);
}
</style>
