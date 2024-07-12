// CreateEmployee.tsx

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { createEmployee, resetSucessMessages } from '../redux/actions';
import { AppState } from '../redux/rootReducer';
import { Employee } from '../types/Employee';
import CustomButton from '../components/CustomButton';

interface CreateEmployeeProps {
  createEmployee: (employee: Omit<Employee, 'id'>) => void;
  createLoading: boolean;
  createError: string | null;
}

const CreateEmployee: React.FC<CreateEmployeeProps> = ({ createEmployee, createLoading, createError,createSuccess, navigation,resetSucessMessages }) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (createError) {
      Alert.alert('Error', createError);
    }
    if (createSuccess) {
        Alert.alert('Success', 'Employee created successfully');
        navigation.goBack();
        resetSucessMessages();
      }
  }, [createError,createSuccess]);

  const handleCreateEmployee = () => {
    if (!name || !salary || !age) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Basic validation for salary and age
    if (isNaN(Number(salary)) || isNaN(Number(age))) {
      Alert.alert('Error', 'Salary and age must be valid numbers');
      return;
    }

    const newEmployee = { employee_name: name, employee_salary: salary, employee_age: age } as Omit<Employee, 'id'>;
    createEmployee(newEmployee);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <CustomButton
        title={createLoading ? 'Creating...' : 'Create Employee'}
        onPress={handleCreateEmployee}
        isLoading={createLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

const mapStateToProps = (state: AppState) => ({
  createLoading: state.employees.createLoading,
  createError: state.employees.createError,
  createSuccess: state.employees.createSuccess,
});

const mapDispatchToProps = {
  createEmployee,
  resetSucessMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);
