<template>
    <v-app>
        <v-main>
            <snack-bar />
            <!-- <router-view/> -->
            <component :is="this.$route.meta.layout || 'div'">
                <router-view />
            </component>
        </v-main>
    </v-app>
</template>

<script>
import snackBar from "./components/SnackBar/snackBar.vue";
export default {
    components: { snackBar },
    name: "App",

    data: () => ({
        //
    }),
    mounted() {
        // this.$vuetify.theme.dark = true
    },
};
</script>
<style scoped>
/* @import url("./common/css/styles.css"); */
@import url("./common/styles.css");
</style>
