export default packages => {
  Object.keys(packages).map(name => {
    window[name] = packages[name];
  });

  return;
};
