<template>
    <div>
        <v-app-bar class="white pr-5 pl-2" height="54px" app>
            <v-app-bar-nav-icon
                v-if="$vuetify.breakpoint.xsOnly"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <span
                v-if="
                    $route.matched.length > 1
                        ? $route.matched[0].path == $route.path
                            ? false
                            : true
                        : false
                "
                class="capitalize font-weight-bold"
            >
                <button icon @click="hasHistory()">
                    <v-icon small class="black--text font-weight-bold pa-1"
                        >mdi-arrow-left</v-icon
                    >
                </button>
            </span>
            <v-spacer/>
            <v-avatar
                class="primary white--text capitalize"
                size="30"
                v-if="user_detail.name"
                >{{ user_detail.name.charAt(0) }}</v-avatar
            >
            <span class="ml-2 capitalize">{{ user_detail.name }}</span>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon dark v-bind="attrs" v-on="on">
                        <v-icon class="black--text">mdi-chevron-down</v-icon>
                    </v-btn>
                </template>
                <div class="text-center white- text-capitalize">
                    <div class="pa-5">
                        <v-avatar
                            class="primary white--text mb-2"
                            size="35"
                            v-if="user_detail.name"
                            >{{ user_detail.name.charAt(0) }} </v-avatar
                        ><br />
                        <span class="font-weight-bold capitalize">{{user_detail.name}}</span
                        ><br />
                        <div class="fs-14" v-if="user_detail.email">
                            {{ user_detail.email }}
                        </div>
                        <!-- <br /> --> 
                        <span class="fs-14">{{ user_detail.phone }}</span>
                    </div>
                    <v-divider />
                    <div class="pa-4">
                        <span
                            class="logout-btn pointer px-12 py-2 rounded-pill"
                            @click="logoutHandler"
                            >LOGOUT</span
                        >
                    </div>
                </div>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            :permanent="$vuetify.breakpoint.smAndUp"
            :temporary="$vuetify.breakpoint.xsOnly"
            app
            class="elevation-4 py-4"
            height="100%"
            width="270px"
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-center">
                        <img
                            src="@/assets/image/logo.svg"
                            height="70px"
                            width="180px"
                        />
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list dense nav class="pl-0 pr-0">
                <v-list-item
                    v-for="item in navLinks"
                    :key="item.name"
                    :to="item.to"
                    link
                    nav itemtype="text-rounded"
                    class="active-font rounded-0"
                    active-class="primary white--text rounded-0 elevation-5"
                >
                    <v-list-item-content class="px-8 py-4 rounded-0">
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <router-view
            class="pa-4"
            style="background-color:#edf2f4; min-height: 150vh"
        />
    </div>
</template>
<script>
import authToken from "@/common/authToken";
export default {
    name: "AppLayout",
    data() {
        return {
            url: "",
            drawer: false,
            user_detail: {},
            navLinks: [
                {
                    name: "Dashboard",
                    icon: "mdi-view-dashboard",
                    to: "/",
                },
                {
                    name: "Help & Support",
                    icon: "mdi-cog-outline",
                    to: "/support",
                },
                // {
                //     name:"Logout",
                //     icon:"mdi-view-dashboard",
                //     to:"/confirmlogout",
                // },

            ],
        };
    },
    beforeCreate() {
        const successHandler = (res) => {
            this.user_detail = res.data;
        };
        return this.$request(this.$keys.GET, this.$urls.get_vendor_detail, {
            onSuccess: successHandler,
            isTokenRequired: true,
        });
    },
    methods: {
        logoutHandler() {
            authToken.removeToken();
            this.$router.push({ name: "login" });
        }
    },
};
</script>
<style scoped>
.nav-drawer {
    width: 10px;
}
.active-font {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    border-bottom: 2px solid rgba(85, 85, 85, 0.4);
}

.logout-btn:hover {
    background: #e3e3e3;
}
.color-white {
    color: white;
}
.image-class {
    fill: #ed6866;
}
</style>
