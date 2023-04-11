<template>
  <div>
    <v-dialog v-model="getDetails.show" persistent  max-width="535px" scrollable>
      <v-card>
        <v-card-title class="primary">
          <div class="white--text">Reject Application</div>
          <v-spacer />
        </v-card-title>
        <v-card-text class="pa-2 mt-2">
          <div class="font-weight-bold fs-20 black--text text-center">
            Are You Sure,You Want To Reject Loan Application of Applicant.
          </div>
        </v-card-text>
        <br />
        <v-form ref="form" >
        <v-row class="row-text">
          <v-col cols="9" class=" d-flex">
            <span class="pl-16 text-title ">Applicaion No.</span>
            <v-spacer />
            <span class="pr-14 text-value"> #BBKAS79 </span>
          </v-col>
          <v-col cols="9" class=" d-flex ">
            <span class="pl-16 text-title"> Name.</span>
            <v-spacer />
            <span class="pr-14 text-value text-capitalize">
              <div>{{ getDetails.object.client_name }}</div>
            </span>
          </v-col>
          <br />
          <v-col cols="9" class="d-flex">
            <span class="pl-16 text-title "> Contact No.</span>
            <v-spacer />
            <span class="pr-12 text-value">
              <div>{{ getDetails.object.client_phone }}</div>
            </span>
           </v-col>
        </v-row>
       </v-form>
        <br />
        <v-card-actions class="my-3 mx-2">
          <v-row>
            <v-col cols="6" class="d-flex">
              <v-btn
                class="mt-n2"
                block
                color="blue"
                outlined
                @click="getDetails.show = false"
              >
                Cancle</v-btn
              >
            </v-col>
            <v-col cols="6" class="d-flex">
              <v-btn
                class="mt-n2"
                block
                color="primary"
                :loading="loading"
                @click="confirm()"
              >
                Confirm</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import rules from "../../../../common/fieldRules";
// import ConfirmLogout from './ConfirmLogout.vue';
export default {
  name: "RejectApplication",
  // components:ConfirmLogout,
  data() {
    return {
      rules: rules,
     loading: false,
    };
  },
  computed: {
    ...mapState({
      getDetails: (state) => state.modal.reject_application,
    }),
    show: {
      get() {
        if (this.getDetails.show) return this.getDetails.show;
        else return null;
      },
    },
  },
  watch: {
    show(v) {
      if (v) this.openModal();
      else this.closeModal();
    },
  },
  methods: {
    ...mapMutations({
      setDetails: "modal/SET_REJECT_APPLICATION",
    }),
    openModal() {},
    closeModal() {
      this.loading= false;
    },
    confirm() {
          if (this.$refs .form.validate()){
          this.loading= true;
          const successHandler = () => {
                this.loading = false;
                this.setDetails({ show:false});
                this.$emit("reload-list");
            };
            const finallyHandler = () => {
                this.loading = false;
            };
            let formData = {};
            formData["inquiry_state"] = this.getDetails.type;
                return this.$request(
                    this.$keys.PATCH,
                    this.$urls.dashboard.update_service_list+
                        this.getDetails.object.id + "/",
                    {
                         data: formData,
                        onSuccess: successHandler,
                        onFinally: finallyHandler,
                        isTokenRequired: true,
                    }
                );
      //   let formData = {};
      //    return this.$request(
      //   this.$keys.GET,
      //   this.$urls.dashboard.get_service_list,
      //   {
      //     data: formData,
      //     onSuccess: successHandler,
      //     onFinally: finallyHandler,
      //     isTokenRequired: true,
      //     cancel: true,
      //   }
      // );

         }

     },
 }
};
</script>
<style scoped>
.text-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
  justify-content: center;
}
.text-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.8);
  padding-right: 10px;
}
.row.row-text {
  margin: 0px !important;
}
/* .modal {
   justify-content: center;
   align-items: center;
   padding-left: 10px;
   padding-right: 15px;
} */
</style>
<!-- <style>
.row.row-text{
    margin  : 0px !important;
}
</style> -->
