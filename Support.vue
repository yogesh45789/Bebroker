<template>
  <div>
    <div>
      <v-row no-gutters>
        <v-col cols="7" md="3">
          <v-text-field
            v-model="search"
            clearable
            solo
            flat
            label="Search"
            prepend-inner-icon="mdi-magnify"
            color="primary"
          >
          </v-text-field>
        </v-col>
        <v-spacer />
        <div class="btn">
          <v-btn
            class="d-flex"
            color="primary"
            width="175"
            @click="getDetails()"
            >Send Query
          </v-btn>
        </div>
      </v-row>
    </div>
    <h2 class="text--bold">Frequently asked questions.</h2>
    <br />
    <div>
      <v-expansion-panels>
        <query @reload-list="getDetails()" />
        <v-expansion-panel
          v-model="getDetails.show"
          v-for="(faq, index) in faqs"
          :key="index"
        >
          <v-expansion-panel-header>
            {{ faq.question }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="grey--text">
            {{ faq.answer }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
 <script>
import { mapMutations } from "vuex";
import RULES from "../../../common/fieldRules";
import Query from "../dashboard/modal/Query.vue";
// import Query from '../dashboard/modal/Query.vue';
export default {
  components: { Query },
  // components: Query,
  name: "Support",
  data() {
    return {
      rules: RULES,
      loading: false,
      faqs: [],
      search: "",
    };
  },
  computed: {},
  watch: {
    search(){
      this.getVendorFaqs();
    },
    // show(v) {
    //   if (v) this.openModal();
    //   else this.closeModal();
    // },
  },
  mounted() {
    this.getVendorFaqs();
  },
  methods: {
    ...mapMutations({
      queryModal: "modal/SET_QUERY",
    }),
    getDetails() {
      this.queryModal({ show: true });
    },
    getVendorFaqs() {
      this.loading = true;
      const successHandler = (res) => {
        this.faqs = res.data;
        console.log("faqs", this.faqs);

        this.loading = false;
      };
      const finallyHandler = () => {
        this.loading = false;
      };
       let formData = {};
       if (this.search) formData ["search"] = this.search;
      // formData["faqs"] = this.faqs;
      return this.$request(this.$keys.GET, this.$urls.faqs.get_vendor_faqs, {
        params:formData,
        onSuccess: successHandler,
        onFinally: finallyHandler,
        isTokenRequired: false,
      });
    },
  },
  openModal() {},
  closeModal() {
    this.loading = false;
  },
};
</script>
<style scoped>
.btn {
  display: flex;
  align-content: right;
  justify-content: end;
}
</style>
