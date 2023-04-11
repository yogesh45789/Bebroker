<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <v-row no-gutters>
            <v-col cols="8" md="3">
                <v-text-field
                    v-model="search"
                    clearable
                    solo
                    flat
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    color="primary"
                > </v-text-field>
            </v-col>
        </v-row>
        <v-sheet elevation="3" style="border-radius: 5px">
            <!-- fixed-tabs -->
            <v-tabs
                hide-slider
                height="100px"
                next-icon="mdi-chevron-right-circle"
                prev-icon="mdi-chevron-left-circle"
                v-model="selectedTab"
            >
                <v-tab
                    v-for="(item, id) in all_tabs"
                    :key="id"
                    class="tabs"
                    active-class="active-class"
                >
                    <div>
                        <div>
                            <v-chip label color="#F4F4F4" class="ma-2"
                                ><v-icon small :color="item.color"
                                    >mdi-circle</v-icon
                                ></v-chip
                            >
                        </div>
                        <div class="tab-label">
                            {{ item.label }}
                        </div>
                        <div class="tab-count py-2">
                            {{ item.value }}
                        </div>
                    </div>
                </v-tab>
            </v-tabs>
        </v-sheet>
        <data-table
            :current_tab="tab"
            :search="search"
            @updateCount="updateCount($event)"
        />
    </div>
</template>
<script>
import dataTable from "./datatable.vue";
export default {
    name: "dashboard",
    components: { dataTable },
    data() {
        return {
            search: "",
            total_assigned_to_me: 0,
            total_document_collected: 0,
            total_service_delivered: 0,
            total_service_rejected: 0,
            total_applications: 0,
            tab: "vendor_assign_complete",
            selectedTab: 0,
        };
    },
    watch: {
        selectedTab() {
            this.tab = this.all_tabs[this.selectedTab].key;
        },
    },
    computed: {
        all_tabs() {
            return [
                {
                    label: "Assigned to me",
                    key: "vendor_assign_complete",
                    value: `${this.total_assigned_to_me}`,
                    color: "#EFB608",
                },
                {
                    label: "Document Collected",
                    key: "document_pickup_complete",
                    color: "#ED8020",
                    value: `${this.total_document_collected}`,
                },
                {
                    label: "Service Delivered",
                    key: "service_delivery_complete",
                    color: "#219653",
                    value: `${this.total_service_delivered}`,
                },
                {
                    label: "Service Rejected",
                    key: "failed",
                    color: "#E22F2F",
                    value: `${this.total_service_rejected}`,
                },
                {
                    label: "All Application",
                    key: "",
                    color: "#2F80ED",
                    value: `${this.total_applications}`,
                },    
            ];
        },
    },
    methods: {
        updateCount(counts) {
            this.total_assigned_to_me = counts.total_assigned_to_me,
            this.total_document_collected = counts.total_document_collected,
            this.total_service_delivered = counts.total_service_delivered,
            this.total_service_rejected = counts.total_service_rejected,
            this.total_applications = counts.total_applications
        }
    },
};
</script>
<style scoped>
.tabs {
    width: 200px;
    border-left: 1px solid #ececec;
    border-right: 1px solid #ececec;
}
.active-class {
    background: #eaf2fd;
}
.tab-label {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    text-transform: none;
}
.tab-count {
    font-weight: 600;
    font-size: 25px;
    line-height: 42px;
    color: #2f80ed;
}
</style>
