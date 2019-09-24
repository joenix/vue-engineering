import contextual from "vue-cli-context";

import vueConfigure from "./utils/vue-configure.js";
import vueRunner from "./utils/vue-runner.js";
import vueRegister from "./utils/vue-register.js";
import vueStore from "./utils/vue-store.js";
import vueRouter from "./utils/vue-router.js";
import vueComponent from "./utils/vue-component.js";
import vueStyle from "./utils/vue-style.js";
import vueUtils from "./utils/vue-utils.js";
import vueHttp from "./utils/vue-http.js";
import vueApi from "./utils/vue-api.js";

const sniper = {
  stores: {},
  components: {},
  styles: {},
  utils: {}
};

export default {
  vueConfigure: vueConfigure(sniper),
  vueRunner,
  vueRegister,
  vueStore: (Vuex, modules = {}, getters = {}) =>
    vueStore(
      Vuex,
      Object.assign(modules, contextual(sniper.stores, false)),
      getters
    ),
  vueRouter: (Router, routes, configure = {}) => vueRouter(Router, routes, configure),
  vueComponent: Prefix => vueComponent(Prefix, contextual(sniper.components, false)),
  vueStyle: () => vueStyle(contextual(sniper.styles, false)),
  vueUtils: dependencies => vueUtils(dependencies, contextual(sniper.utils, false)),
  vueHttp,
  vueApi
};
