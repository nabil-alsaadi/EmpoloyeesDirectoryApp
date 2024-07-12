import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import EmployeeListStack from './StackNavigator';
import EmployeeDetails from '../screens/EmployeeDetails';
import EmployeeList from '../screens/EmployeeList';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;

          if (route.name === 'EmployeeList') {
            icon = '👥'; // Employees icon
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
      <Tab.Screen name="EmployeeList" component={EmployeeList} />
      <Tab.Screen name="EmployeeDetails" component={EmployeeDetails} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
