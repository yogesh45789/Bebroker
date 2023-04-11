<template>
  <div class="text-center ma-3">
    <v-snackbar
      right
      transition="fade-transition"
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="3000"
      :color="snackbar.color"
      :style="`bottom: ${index * 60 + 10}px`"
      class="capitalize"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark icon @click="snackbar.showing = false" v-bind="attrs">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "SnackBar",
  computed: {
    ...mapState("snackBar", ["snackbars"]),
  },
};
</script>