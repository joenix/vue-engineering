export default (Prefix, components) => {
  return {
    install(Vue) {
      Object.values(components).map(component =>
        Vue.component(`${Prefix}-${component.name}`, component)
      );
    }
  };
};
