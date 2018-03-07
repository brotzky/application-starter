export default (path, loadRoute, errorLoading) => ([
  {
    path: `${path}/translator/:env`,
    name: 'Translation Dashboard',
    getComponent(location, cb) {
      import(
        /* webpackChunkName: "translator-dashboard" */ './containers/Translator'
      )
        .then(loadRoute(cb))
        .catch(errorLoading);
    }
  },
  {
    path: `${path}/translator/:env/:lang`,
    name: 'Translation Editor',
    getComponent(location, cb) {
      import(
        /* webpackChunkName: "translator-editor" */ './containers/Translator'
      )
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  }
]);
