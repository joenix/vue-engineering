export default (Prefix, components) => {
  return {
    install(Vue) {
      Object.keys(components).map(component =>
        Vue.component(`${Prefix}-${component.name}`, component)
      );
    }
  };
};
