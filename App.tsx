import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {persistor, store} from './src/redux/configureStore';
import EmployeeList from './src/screens/EmployeeList';
import EmployeeDetails from './src/screens/EmployeeDetails';
import { Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import CreateEmployee from './src/screens/CreateEmployee';
import TabNavigator from './src/navigation/BottomTabNavigator';
import StackNavigator from './src/navigation/StackNavigator';

// if (__DEV__) {
//   require("./reactotronConfig");
// }
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
