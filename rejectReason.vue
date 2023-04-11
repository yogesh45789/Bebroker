<template>
    <div>
        <v-dialog
            v-model="getDetails.show"
            persistent
            max-width="582px"
            scrollable
        >
            <v-card>
                <v-card-title class="primary">
                    <div class="white--text">Reject Reason</div>
                    <v-spacer />
                    <v-btn icon @click="setDetails({ show: false })"
                        ><v-icon color="white">mdi-close</v-icon></v-btn
                    >   
                </v-card-title>
                <v-card-text class="py-4">
                    <div class="font-weight-bold fs-20 black--text">
                        Client Details
                    </div>
                    <br />
                    <v-row>
                        <v-col cols="6" class="d-flex">
                            <span class="text-title">Name/Contact :</span>
                            <span class="pl-6 text-value text-capitalize">
                                <div>{{ getDetails.object.client_name }}</div>
                                <div>{{ getDetails.object.client_phone }}</div>
                            </span>
                        </v-col>
                        <v-col cols="6" class="d-flex">
                            <span class="text-title">Application No. :</span>
                            <span class="pl-6 text-value"> #BBKAS79 </span>
                        </v-col>
                    </v-row>
                    <br />
                    <v-form ref="form">
                        <v-textarea
                            v-model="reasons"
                            auto-grow
                            dense
                            outlined
                            label="Write reason..."
                            rows="4"
                            :rules="[rules.required]"
                            >
                            <!-- @keyup.enter="submit()" -->
                        </v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions class="mx-1 mb-3">
                    <v-btn
                        class="mt-n6"
                        block
                        color="primary"
                        :loading="loading"
                        @click="submit()"
                        >Submit</v-btn>
                 </v-card-actions>
                </v-card>
         </v-dialog>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import rules from "../../../../common/fieldRules";
export default {
    name: "rejectReason",
    data() {
        return {
            reasons: "",
            rules: rules,
            loading: false,
        };
    },
    computed: {
        ...mapState({
            getDetails: (state) => state.app.reject_reason,
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
            setDetails: "app/SET_REJECT_REASON",
        }),
        openModal() {},
        closeModal() {
            this.$refs.form.reset();
            this.reasons = "";
        },
        submit() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                const successHandler = () => {
                    this.loading = false;
                    this.setDetails({ show: false });
                    this.$emit("reload-list");
                };
                const finallyHandler = () => {
                    this.loading = false;
                };
                let formData = {};
                formData["inquiry_state"] = this.getDetails.type;
                formData["rejection_reason"] = this.reasons;
                return this.$request(
                    this.$keys.PATCH,
                    this.$urls.dashboard.update_service_list +
                        this.getDetails.object.id+
                        "/",
                    {
                        data: formData,
                        onSuccess: successHandler,
                        onFinally: finallyHandler,
                        isTokenRequired: true,
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
