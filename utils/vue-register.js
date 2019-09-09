export default {
  install(Vue, registries = {}) {
    Object.assign(Vue.prototype, registries);
  }
};
