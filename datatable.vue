<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items_list"
      class="elevation-4"
      hide-default-footer
      :loading="loading"
      >
      <!-- :mobile-breakpoint="false"  -->
      <!-- :items-per-page="page_count" -->
      <template v-slot:[`header.clientDetail_split`]="{ header }">
        <div class="my-2">
          <div>{{ header.text_1 }}</div>
          <div>{{ header.text_2 }}</div>
        </div>
      </template>
      <template v-slot:[`header.service_category_split`]="{ header }">
        <div class="my-2">
          <div>{{ header.text_1 }}</div>
          <div>{{ header.text_2 }}</div>
        </div>
      </template>
      <template v-slot:[`item.clientDetail_split`]="{ item }">
        <div class="py-2">
          <div class="name">
            {{ item.client_name }}
          </div>
          <div class="application-number">
            {{ item.client_phone }}
          </div>
          <div v-if="current_tab != 'vendor_assign_complete'">
            {{ item.vendor_assign_date }}
          </div>
        </div>
      </template>
      <template v-slot:[`item.last_updated`]="{ item }">
        <div>{{ item.last_updated_time }}</div>
        <div>{{ item.last_updated_date }}</div> 
        <!-- <v-chip class="capitalize white--text mx-3 px-6 py-2" :color="item.last_updated_status.colour">{{
          item.last_updated_status.status
        }}</v-chip> -->
      </template>
      <template v-slot:[`item.last_updated_status`]="{ item }">
        <div class="my-2">
          <div>{{ item.last_updated_time }}</div>
          <div>{{ item.last_updated_date }}</div>
          <v-chip small :color="item.last_updated_status.bg_colour" 
          :text-color="item.last_updated_status.colour" class="text-capitalize--bold">
          {{
            item.last_updated_status.status
          }}</v-chip>
        </div>
      </template>
      <template v-slot:[`item.service_category_split`]="{ item }">
        <div>{{ item.service_type }}</div>
        <div class="application-number">#BBKAS79<div id="BBKAS79"></div></div>
      </template>
      <template v-slot:[`item.additional_note`]="{ item }">
        <div v-if="item.additional_note">
          {{ item.additional_note }}
        </div>
        <div v-else><v-icon>mdi-minus</v-icon></div>
      </template>
      <template v-slot:[`item.current_status`]= "{ item }" >
          <div class="text-center pt-3" v-for="cmt in item.comments" :key="cmt.id">
             <div> {{ cmt.comment }} </div>
          </div>
        <div class="my-2 mx-7">
          <v-chip v-if="current_tab == 'document_pickup_complete'"  
          color="#FC9234"
          class="white--text px-6 mt-3"
          @click="buttonHandler(item, 'vendor_assign_complete')"
          >Update
          </v-chip>
        </div>
      </template>
      <template v-slot:[`item.comments`]="{ item }">
        <div v-for="(data, index) in item" :key="index">
          {{ vendor_assign_complete }}
          {{ index + 1 }}. {{ data.comment }}
        </div>
        <v-edit-dialog @save="addUpdate">
          <!-- :return-value.sync="props.item.name" -->
          <!-- @close="close" -->
          <!-- @open="open" -->
          <!-- @cancel="cancel" -->
          <div class="fs-14 primary--text align-center">
            <v-icon color="primary" size="16">mdi-plus</v-icon
            ><span class="text-decoration-underline">Add Update</span>
          </div>
          <template v-slot:input>
            <!-- :rules="[max25chars]" -->
            <!-- v-model="props.item.name" -->
            <v-text-field label="Update" single-line counter></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:[`item.rejection_reason`]="{ item }">
        <div v-if="item.rejection_reason">                                            
          {{ item.rejection_reason }}
        </div>
        <div v-else><v-icon>mdi-minus</v-icon></div>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <div class="py-3">
          <div>
            <v-chip
              v-if="current_tab == 'vendor_assign_complete'"
              class="px-3 mt-2 white--text primary fixed-width"
              @click="buttonHandler(item, 'document_pickup_complete')"
              >Document Collected
              <!-- <v-icon color=" #EA7D28"
                >mdi-chevron-right</v-icon -->
            </v-chip>
            <v-chip
              v-else
              class="px-4 mt-4 white--text primary fixed-width"
              @click="buttonHandler(item, 'service_delivery_complete')"
              >Service Delivered
              <!-- <v-icon color="white">mdi-chevron-right</v-icon> -->
            </v-chip>
          </div>
          <div class="pt-2">
            <v-chip
              v-if="current_tab == 'vendor_assign_complete'"
              class=" white--text red fixed-width"
              @click="buttonHandler(item, 'document_pickup_failed')"
              >Reject</v-chip
            >
            <v-chip
              v-else
              class="white--text red fixed-width"
              @click="buttonHandler(item, 'service_delivery_failed')"
              >Reject</v-chip
            >
          </div>
        </div>
      </template>
    </v-data-table>
    <Confirm @reload-list="getServiceList()" />
    <conformation @reload-list="getServiceList()" />
    <RejectApplication @reload-list="getServiceList()" />
    <rejectReason @reload-list="getServiceList()" />
    <UpdateStatus @reload-list="getComments()" />
    <v-row justify="end">
      <div class="pt-4">
        <v-pagination
          v-model="page"
          :length="page_count"
          :total-visible="8"
          color="primary"
        > 
      </v-pagination> 
      </div>
    </v-row>
  </div>
</template>
<script>
import data from "@/common/data/index";
import { mapMutations } from "vuex";
import rejectReason from "./modal/rejectReason.vue";
import RejectApplication from "./modal/RejectApplication.vue";
 import Conformation from "./modal/Conformation.vue";
import Confirm from "./modal/Confirm.vue";
import UpdateStatus from "./modal/UpdateStatus.vue";
export default {
  components:{ rejectReason,RejectApplication,Conformation,Confirm,UpdateStatus},
  name: "datatable",
  props: ["current_tab", "search"],                                                                                                                                                                                                                                                                                                                             
  data() {
    return {
      loading: false,
      items_list: [],
      page: 1,
      page_count: 0,
    };
  },
  computed: {
    headers() {                                                                                                                            
      switch (this.current_tab) {
        case "vendor_assign_complete":
        return data.headers.assign_to_me;
        case "document_Ppickup_complete":
          return data.headers.document_pickup_complete;
        case "service_delivery_complete":
          return data.headers.service_delivery_complete;
        case "failed":
          return data.headers.failed;
        case "":
          return data.headers.all_application;
        default:
          return data.headers.assign_to_me;
      }
    },
  },
  watch: {
    page() {
    this.getServiceList();
    },
    current_tab() {
      this.getServiceList();
    },
    search() {
      this.getServiceList();
    },
  },
  mounted() {
    this.getServiceList();
  },
  methods: {
    ...mapMutations({
      reasonModal: "app/SET_REJECT_REASON",
      rejectModal: "modal/SET_REJECT_APPLICATION",
      confModal: "modal/SET_CONFIRM",
      conformModal: "modal/SET_CONFORMATION",
      updateModal: "modal/SET_UPDATE_STATUS",
   }),
    // test() {
    //   console.log("");
    // },
    getServiceList() {
      console.log("page no",this.page);
      this.items_list = [];
      this.loading = true;
      const successHandler = (res) => {
        this.items_list = res.data.data;
        this.page_count = res.data.page_count;
        this.$emit("updateCount", res.data.count);
        this.loading = false;
      };
      const finallyHandler = () => { 
        this.loading = false;
      };
      let formData = {};
      if (this.current_tab) {
        if (this.current_tab === "failed")
          formData["status"] = this.current_tab; 
        else formData["inquiry_state"] = this.current_tab;

      }
      //  if (this.current_tab) formData["cuurent_tab"]=this.current_tab;
      if (this.search) formData["search"] = this.search;
       if (this.page) formData["page"] = this.page;
      return this.$request(
        this.$keys.GET,
        this.$urls.dashboard.get_service_list,
        {
          params: formData,
          onSuccess: successHandler,
          onFinally: finallyHandler,
          isTokenRequired: true,
          // cancle:true
        }
      );
    },
    addUpdate() {
      console.log("save");
    },
    buttonHandler(item, type) {
      switch (type) {
        case "vendor_assign_complete":
        this.updateModal({show:true, object: item, type: type});
        break;
        case "document_pickup_complete":
         this.conformModal({show: true, object: item, type: type});
           break;
        case "service_delivery_complete":
        this.confModal({show: true, object: item, type: type });
        break;
        case "service_delivery_failed":
        this.reasonModal({ show: true, object: item, type: type});
         break;
        case "document_pickup_failed":
          this.rejectModal({ show: true, object: item, type: type});
        break;
        // case "comments":
        // this.updateModal({show:true, object: item, type: type});
        //   break;
        }
    },
     getService(id, type) {
      this.loading = true;
      const successHandler = () => {
        this.loading = false;
        this.getServiceList();
      };
      const finallyHandler = () => {
        this.loading = false;
      };
      let formData = {};
      formData["inquiry_state"] = type;
      return this.$request(
        this.$keys.PATCH,
        this.$urls.dashboard.update_service_list + id + "/",
        {
          data: formData,
          onSuccess: successHandler,
          onFinally: finallyHandler,
          isTokenRequired: true,
          cancle: false,
        }
      );
    },

  },
};
</script>
<style scoped>
.name {
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  /* line-height: 16px; */
  color: rgba(0, 0, 0, 0.7);
}
.application-number {
  font-weight: 500;
  font-size: 14px;
  /* line-height: 14px; */
  color: #2f80ed;
}
.v-data-table >>> .v-data-table__wrapper > table > thead > tr > th {
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7) !important;
  font-size: 11px;
  background: rgba(47, 128, 237, 0.18);
}
.fixed-width {
  width: 210px;
  justify-content: center;
}
</style>
