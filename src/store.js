/**
 * src/store.js
 *
 */

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

// For use with Development
// const middleware = applyMiddleware( promise(), thunk, createLogger({
  // predicate: (getState, action) => action.type !== 'DECREMENT_TIME'
// }) )

// For use with Production
const middleware = applyMiddleware( promise(), thunk )

// export default createStore(
//   reducer,
//   middleware
// );

export default createStore(
  reducer,
  composeWithDevTools(middleware)
);
