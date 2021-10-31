export default (Router, baseRoutes, routes, configure = {}) => {
  Object.values(routes).map(route => baseRoutes.push(route));
  routes = baseRoutes;

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
