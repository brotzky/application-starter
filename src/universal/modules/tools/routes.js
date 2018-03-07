import { routes as TranslatorRoutes } from './translator';

const path = 'tools';

export default (loadRoute, errorLoading) =>
  TranslatorRoutes(path, loadRoute, errorLoading);
