// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import Reactotron from '../../reactotronConfig';

const epicMiddleware = createEpicMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = __DEV__
  ? compose(applyMiddleware(epicMiddleware), Reactotron.createEnhancer())
  : applyMiddleware(epicMiddleware);

const store = createStore(
  persistedReducer,
  composeEnhancers,
);


epicMiddleware.run(rootEpic);

const persistor = persistStore(store);

export { store, persistor };
