export default (Vuex, baseModule, modules, getters) => {
  // Add Namespace
  Object.values(modules).map(module => (module.namespaced = true));

  // Merge Base Modules to Global
  Object.assign(modules, { global: baseModule || {} });

  // Return
  return new Vuex.Store({
    modules,
    getters
  });
};
