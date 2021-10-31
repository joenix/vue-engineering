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
import vueI18N from "./utils/vue-i18n.js";
import vueApi from "./utils/vue-api.js";

const sniper = {
  stores: {},
  components: {},
  routes: {},
  styles: {},
  utils: {},
  i18n: {}
};

export default {
  vueConfigure: vueConfigure(sniper),
  vueRunner,
  vueRegister,
  vueStore: (Vuex, baseModule, configure = {}, modules = {}, getters = {}) =>
    vueStore(
      Vuex,
      baseModule(configure.package),
      Object.assign(modules, contextual(sniper.stores, false)),
      getters
    ),
  vueRouter: (Router, baseRoutes, configure = {}) =>
    vueRouter(Router, baseRoutes, contextual(sniper.routes, false), configure),
  vueComponent: Prefix =>
    vueComponent(Prefix, contextual(sniper.components, false)),
  vueStyle: () => vueStyle(contextual(sniper.styles, false)),
  vueUtils: dependencies =>
    vueUtils(dependencies, contextual(sniper.utils, false)),
  vueHttp,
  vueI18N: (I18N, configure = {}) =>
    vueI18N(I18N, contextual(sniper.i18n, false), configure),
  vueApi
};
