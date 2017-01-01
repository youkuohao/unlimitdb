import { createStore, applyMiddleware, combineReducers } from 'redux'
import {routerMiddleware} from 'react-router-redux'
import { routerReducer as routing } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

const logger = store => next => action  => {
  console.log(action);
  return next(action)
};

const reducers = require('./reducers');

const rootReducer = combineReducers({
  routing,
  ...reducers
});

const configure = function (history, initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  /**
   * 生成router的中间件, 便于使用 `dispatch(push('/path'))`
   */
  const historyMiddleware = routerMiddleware(history)

  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger,
    historyMiddleware
  )(create);

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./reducers.js', () => {
      const nextReducer = require('./reducers.js')
      store.replaceReducer(nextReducer)
    })
  }

  return store
};


export default configure