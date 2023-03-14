import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { authReducers } from './authReducer/reducers';
import { todosReducers } from './todoReducer/reducers';

const rootReducers = combineReducers({
  auth: authReducers,
  todos: todosReducers,
});

const composeEnhancers = process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunkMiddleware)
  : composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducers, composeEnhancers);
