# vue-engineering

> engineering on vue-cli 3

```sh
npm i vue-engineering
# or
yarn add vue-engineering
```

```js
import Vue from "vue";
import Vuex from "vuex";
import Router from "vue-route";
import {
  vueConfigure,
  vueRegister,
  vueStore,
  vueRoute, // todo
  vueComponent,
  vueRunner // todo
} from "vue-engineering";

import App from "./app.vue";

Vue.use(Vuex);
Vue.use(Router);

Vue.use(vueConfigure, {
  stores: {
    context: require.context(
      `../../src/store/`,
      true,
      /.js$/
    ),
    expect: pkg => pkg,
    inject: {
      /* Injects */
      say: `hello world`
    }
  },
  components: {
    context: require.context(
      `../../src/components/`,
      true,
      /.vue$/
    ),
    expect: pkg => pkg
  },
});

Vue.use(vueRegister, {
  /* Registries */
});

const store = vueStore(Vuex);

const router = vueRoute(Router);

Vue.use(vueComponent(`x`));

Vue.use(vueRunner, App {store, router});
```
