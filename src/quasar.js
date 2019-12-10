import Vue from "vue";

import "./styles/quasar.sass";
import "quasar/dist/quasar.ie.polyfills";
import iconSet from "quasar/icon-set/eva-icons.js";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/eva-icons/eva-icons.css";
import { Quasar } from "quasar";

Vue.use(Quasar, {
  config: {},
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {},
  iconSet: iconSet
});
