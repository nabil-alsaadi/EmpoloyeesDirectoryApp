import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const epicMiddleware = createEpicMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = __DEV__ ? composeWithDevTools : compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(rootEpic);

const persistor = persistStore(store);

export {store, persistor};
