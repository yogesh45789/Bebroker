import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: {
                    base: "#2F80ED",
                },
                secondary: "#FF7C1E",
                
            },
        },
    },
});
