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
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        {/* <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let icon;
    
              if (route.name === 'EmployeeList') {
                icon = '🏠';  // Home icon
              } else if (route.name === 'EmployeeDetails') {
                icon = 'ℹ️'; // Info icon
              }
    
              return (
                <Text style={{ color, fontSize: size }}>
                  {icon}
                </Text>
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen  name="EmployeeList" component={EmployeeList} />
          <Tab.Screen name="EmployeeDetails" component={EmployeeDetails} />
        </Tab.Navigator> */}
        <StackNavigator />
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
