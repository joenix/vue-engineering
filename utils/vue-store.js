export default (Vuex, modules, getters) => {
  Object.values(modules).map(module => (module.namespaced = true));

  return new Vuex.Store({
    namespaced: true,
    modules,
    getters
  });
};
