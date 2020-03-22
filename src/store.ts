import modules, { StoreState } from './modules';
import { createStore, Store, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// 사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware /*other middleware*/),
  /* other store enhancers if any */
);
export default function configureStore(): Store<StoreState> {
  const store = createStore(modules, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
