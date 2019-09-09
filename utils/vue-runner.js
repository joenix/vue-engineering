export default {
  install(Vue, App, registries = {}) {
    return new Vue({
      ...registries,
      render: h => h(App)
    }).$mount(`#app`);
  }
};
