import contentAPIRoutes from './content-api';
import getContentCounts from './getContentCounts';

const routes = {
  'content-api': {
    type: 'content-api',
    routes: contentAPIRoutes,
  },
};

export default routes;
