import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeList from '../screens/EmployeeList';
import CreateEmployee from '../screens/CreateEmployee';
import BottomTabNavigator from './BottomTabNavigator';
import { Button } from 'react-native';
import UpdateEmployee from '../screens/UpdateEmployee';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EmployeeList" component={BottomTabNavigator} options={({ navigation }) => ({
          headerShown: false,
          title: 'Employee List',
        })} />
      <Stack.Screen name="CreateEmployee" component={CreateEmployee} options={{ title: 'Create Employee' }} />
      <Stack.Screen name="UpdateEmployee" component={UpdateEmployee} options={{ title: 'Update Employee' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
