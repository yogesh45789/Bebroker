<template>
  <div>
    <v-dialog
      v-model="getDetails.show"
      persistent
      max-width="550px"
      scrollable
    >
    <v-card>
      <v-card-title class="primary">
        <div class="white--text">Send Query</div>
        <v-spacer />
        <v-btn icon @click="setDetails({ show: false })"
          ><v-icon color="white">mdi-close</v-icon></v-btn
        >
      </v-card-title> 
      <v-card-text class="mt-2 pt-1">
        <h2 class="font-weight-bold fs-20 black--text text-left pl-2">
          Do you have a query, Write us!
        </h2>
        <br/>
        <v-form ref="form">
          <v-textarea
             class="pa-1"
            v-model="message"
            auto-grow
            dense
            outlined
            label="enter here..."
            rows="4"
            :rules="[rules.required]"
          >
          </v-textarea>
        </v-form>
        <v-card-actions class="my-0 mt-0">
        <v-btn
          class="mx-n1"
          block
          color="primary"
          :loading="loading"
          @click="send()"
          >Send</v-btn
        >
      </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
  </div>
</template>
<script>
import rules from "@/common/fieldRules";
import { mapMutations, mapState } from "vuex";
export default {
  name: "query",
  data() {
    return {
      message: "",
      rules: rules,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      getDetails: (state) => state.modal.query,
    }),
     show:{
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
      setDetails: "modal/SET_QUERY",
    }),
    openModal() {},
    closeModal() {
      this.$refs.form.reset();
      this.message = "";
    },
    send () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const successHandler = () => {
          this.loading = false;
          this.setDetails({ show: false });
        };
        const finallyHandler = () => {
          this.loading = false;
        };
        let formData = {};
        formData["message"] = this.message;
        return this.$request(
          this.$keys.POST, 
          this.$urls.support.post_query, 
          {
          data: formData,
          onSuccess: successHandler,
          onFinally: finallyHandler,
          isTokenRequired: true,
        });
      }
    },
  },
};
</script>
<style scoped>
.text-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.7);
}
.text-value {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.8);
}
</style>
