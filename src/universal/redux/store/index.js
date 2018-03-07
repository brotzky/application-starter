import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'react-router-redux';
import { syncMembers } from '../middleware/syncMembers';
import { errorsCheck } from '../middleware/errorsCheck';
import rootReducer from '../reducer';

const isProd = process.env.NODE_ENV === 'production';

export default function configureStore(history, initialState) {
  const logger = createLogger();
  const router = routerMiddleware(history);
  let middleware;

  if (isProd) {
    middleware = [apiMiddleware, thunk, router, syncMembers, errorsCheck];
  } else {
    middleware = [
      apiMiddleware,
      thunk,
      router,
      logger,
      syncMembers,
      errorsCheck,
    ];
  }

  const enhancer = compose(applyMiddleware(...middleware));

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
