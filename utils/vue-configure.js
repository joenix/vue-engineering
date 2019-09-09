export default Sniper => (configure = {}) => {
  Object.keys(configure).map(key => Object.assign(Sniper[key], configure[key]));
};
