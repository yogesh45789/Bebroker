<template>
  <div>
    <v-dialog v-model="getDetails.show" persistent scrollable width="592">
      <v-card height="535">
        <v-card-title class="primary">
          <div class="white--text">Update Status of Application</div>
          <v-spacer />
          <v-btn icon @click="setDetails({ show: false })"
            ><v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="my-2">
          <h3 class="font-weight-bold fs-22 black--text">Current Status</h3>
          <v-row>
            <v-col cols="6" class="d-flex pt-3 mt-2">
              <span class="text-title pl-2"> Client Name/ Contact </span>
              <span class="text-value pr-10">
                <div>{{ getDetails.object.client_name }}</div>
                <div>{{ getDetails.object.client_phone }}</div>
              </span>
            </v-col>
            <v-col cols="6" class="d-flex pt-5 mt-1">
              <span class="text-title pl-8">Application No. :</span>
              <span class="pl-3 text-value">#BBKAS79</span>
            </v-col>
          </v-row>
          <br />
          <v-form ref="form">
            <v-textarea
              v-model="comment"
              auto-grow
              dense
              outlined
              label="processed the application with bank.."
              rows="4"
              :rules="[rules.required]"
            ></v-textarea>
          </v-form>
          <v-card-actions class="pa-0 mt-0">
            <v-btn
              class="mx-n0"
              block
              color="primary"
              :loading="loading"
              dense
              @click="submit()"
              >Submit</v-btn
            >
          </v-card-actions>
          <v-card-text class="pl-0 mt-1">
            <h3 class="font-weight-bold fs-22 black--text">Previous Updates</h3>
              <!-- {{ getDetails.object.comments }} -->
              <div
                class="pl-1 pt-3 d-flex"
                v-for="comment in getDetails.object.comments" :key="comment.id"
              >
              <v-row>
             <v-col cols="12" class="pl-2 d-flex"> 
                <div class="pl-1 d-flex"> {{ comment.created_datetime }}  -</div>
                <div class="d-flex pl-4">{{ comment.comment }}</div>
               </v-col>
               </v-row>
          </div>
        </v-card-text>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import rules from "../../../../common/fieldRules";
export default {
  name: "UpdateStatus",
  data() {
    return {
      comment: "",
      rules: rules,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      getDetails: (state) => state.modal.update_status,
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
  mounted() {
    this.getComments();
  },
  methods: {
    ...mapMutations({
      setDetails: "modal/SET_UPDATE_STATUS",
    }),
    getComments() {
      let formData = {};
      formData["comment"] = this.update_status;
      return this.$request(
        this.$keys.GET,
        this.$urls.dashboard.get_comment_list +
          this.$urls.dashboard.getDetails.object.id +
          "/",
        {
          params: formData,
          isTokenRequired: true,
        }
      );
    },
    openModal() {},
    closeModal() {
      this.$refs.form.reset();
      this.comment = "";
      this.loading = false;
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const successHandler = () => {
          this.loading = false;
          this.setDetails({
            show: false,
          });
          this.$emit("reload-list");
        };
        const finallyHandler = () => {
          this.loading = false;
        };
        let formData = {};
        formData["comment"] = this.comment;
        return this.$request(
          this.$keys.POST,
          this.$urls.dashboard.comment_on_service_inquiry +
            this.getDetails.object.id +
            "/",
          {
            data: formData,
            onSuccess: successHandler,
            onFinally: finallyHandler,
            isTokenRequired: true,
            cancle: false,
          }
        );
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
