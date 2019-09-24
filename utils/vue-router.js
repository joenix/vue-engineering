export default (Router, routes, configure = {}) => {
  const $router = new Router({
    routes,
    ...configure
  });

  $router.update = (routes, configure = { mode: `history` }) => {
    $router.matcher = new Router({
      routes,
      ...configure,
      scrollBehavior: () => ({ y: 0 })
    });
  };

  return $router;
};
