<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <h3 class="black--text font-weight-bold font-family-roboto pa-2 mt-3">
      Loan Vendor Portal
    </h3>
    <div class="titleText mt-1">Sign in</div>
    <v-form lazy-validation ref="otpForm" class="pa-1 ml-7">
      <v-row no-gutters>
        <v-col cols="11 mt-1">
          <v-text-field
            outlined
            type="number,email"
            color="blue"
            v-model="number"
            label="Mobile Number or Email"
            :rules="[rules.phone]"
            prepend-inner-icon="mdi-cellphone"
            @keyup.enter="submit()"
            hide-spin-buttons
          ></v-text-field>
          <!-- onkeypress="if (value.length == 10) return false" -->
        </v-col>
        <v-col cols="11">
          <v-btn
            block
            class="primary buttonClass"
            height="50px"
            @click="submit"
            :loading="loading"
          >
           Get OTP
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <div class="grey--text font-weight-bold fs-18 pa-5 mt-1">
      <span class="pointer">support@bebroker.net</span>
    </div>
  </div>
</template>
<script>
import RULES from "@/common/fieldRules";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {
      rules: RULES,
      number:"",
      email: null,
      loading: false,
      Response: true,
      mobile: null,
    };
  },
  computed: {
    ...mapState({
      get_number: (state) => state.app.login_number,
      // get_email: (state) => state.app.login_email,
    }),
  },
  mounted() {
    console.log(this.number)
    if (this.get_number) this.number= this.get_number 
    // console.log(this.get_number, "get num");
    // if (this.get_number * 1 === this.get_number) {
    //   this.number = this.get_number;
    // } else {
    //   this.email = this.get_number;
    // }
    // if (this.get_number) {
    //   this.number = this.get_number;
    // }else{
    //   this.email = this.get_number;
    // }
  },
  methods: {
    ...mapActions({
      showSnackbar: "snackBar/showSnackbar",
    }),
    ...mapMutations({
      setNumber: "app/SET_LOGIN_NUMBER",
      // setEmail:"app/SET_LOGIN_EMAIL",
    }),
    submit() {
       console.log(this.get_number);
      // console.log(this.get_number, "get num");
      if (this.$refs.otpForm.validate()) {
        console.log((this.get_number))
        if (this.number * 1 != this.number ) {
          this.email = this.number;
        } else {
          this.mobile = this.number;
        }
        this.loading = true;
        let formData = {};
        const successHandler = (res) => {
          this.loading = false;
          this.$router.push({ name: "verifyOtp" });
          // this.$router.push({name:"dashboard"})
          this.setNumber(this.number);
          this.showSnackbar({
            text: res.data.message,
          });
        };
        const finallyHandler = () => {
          this.loading = false;
        };
        formData["phone"] = this.number;
        formData["email"] = this.email;
        return this.$request(this.$keys.POST, this.$urls.auth.send_otp,
         {
          data: formData,
          onSuccess: successHandler,
          onFinally: finallyHandler,
          isTokenRequired: false,
        });
      }
    },
  },
};
</script>
<style scoped>
.cardContent {
  width: 250px;
  margin: 3;
  padding: 4px 12px;
  position: absolute;
  top: 45%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 20px !important;
}

.titleText {
  font-weight: 700;
  font-size: 18px;
  font-family: "Roboto";
  font-style: "normal";
}
.buttonClass {
  width: 135px;
  border-radius: 5px;
}
.forgetpassword {
  font-weight: 350;
  font-size: 13px;
  line-height: 45px;
}
.rect {
  width: 200;
  height: 0 !important;
}
</style>