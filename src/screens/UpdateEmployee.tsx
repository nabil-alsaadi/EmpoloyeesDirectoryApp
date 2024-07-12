// // UpdateEmployee.tsx

// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Employee } from '../types/Employee';
// import CustomButton from '../components/CustomButton';
// import { RootState } from '../redux/rootReducer';
// import { updateEmployee } from '../redux/actions';
// import { connect } from 'react-redux';

// type UpdateEmployeeRouteProp = RouteProp<{ UpdateEmployee: { employee: Employee } }, 'UpdateEmployee'>;
// interface Props {
//     updateEmployee: (employee: Employee) => Promise<void>;
// }
// const UpdateEmployee: React.FC<Props> = ({updateEmployee}) => {
//   const navigation = useNavigation();
//   const route = useRoute<UpdateEmployeeRouteProp>();
//   const { employee } = route.params;

//   const [name, setName] = useState(employee.employee_name);
//   const [age, setAge] = useState(employee.employee_age.toString());
//   const [salary, setSalary] = useState(employee.employee_salary.toString());
//   const [isLoading, setIsLoading] = useState(false);

//   const handleUpdate = async () => {
//     setIsLoading(true);
//     // Replace with actual API call to update employee
//     try {
//       const response = await fetch(`https://dummy.restapiexample.com/api/v1/update/${employee.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, salary, age }),
//       });
//       const data = await response.json();
//       console.log('Update response:', data);
//       setIsLoading(false);
//       // Navigate back after successful update
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error updating employee:', error);
//       setIsLoading(false);
//       // Handle error
//     }
//   };

//   return (
//     <View style={styles.container}>
     
//       <TextInput
//         value={name}
//         onChangeText={setName}
//         placeholder="Name"
//         style={styles.input}
//       />
//       <TextInput
//         value={age}
//         onChangeText={setAge}
//         placeholder="Age"
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         value={salary}
//         onChangeText={setSalary}
//         placeholder="Salary"
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <CustomButton
//         title={isLoading ? 'Updating...' : 'Update'}
//         onPress={handleUpdate}
//         isLoading={isLoading}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     // alignItems: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//   },
// });

// // Connect UpdateEmployee component to Redux store
// const mapStateToProps = (state: RootState) => ({
//     // Add any mapped state props here if needed
//   });
  
//   const mapDispatchToProps = {
//     updateEmployee,
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployee);


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Employee } from '../types/Employee';
import CustomButton from '../components/CustomButton';
import { updateEmployee } from '../redux/actions';
import { RootState } from '../redux/rootReducer';


type UpdateEmployeeRouteProp = RouteProp<{ UpdateEmployee: { employee: Employee } }, 'UpdateEmployee'>;

// interface Props {
//   updateEmployee: (employee: Employee) => Promise<void>;
//   updateLoading: boolean;
//   updateError: string | null;
// }

const UpdateEmployee: React.FC = ({ updateEmployee, updateLoading, updateError }) => {
  const navigation = useNavigation();
  const route = useRoute<UpdateEmployeeRouteProp>();
  const { employee } = route.params;

  const [name, setName] = useState(employee.employee_name);
  const [age, setAge] = useState(employee.employee_age.toString());
  const [salary, setSalary] = useState(employee.employee_salary.toString());

  const handleUpdate = async () => {
    const updatedEmployee: Employee = {
      ...employee,
      employee_name: name,
      employee_age: parseInt(age),
      employee_salary: parseInt(salary),
    };
    updateEmployee(employee.id,updatedEmployee)

    // try {
    //   await updateEmployee(employee.id,updatedEmployee);
    //   setIsLoading(false);
    //   navigation.goBack(); // Navigate back after successful update
    // } catch (error) {
    //   setIsLoading(false);
    //   console.error('Error updating employee:', error);
    //   // Handle error
    // }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={salary}
        onChangeText={setSalary}
        placeholder="Salary"
        keyboardType="numeric"
        style={styles.input}
      />
      {updateError && <Text style={styles.errorText}>{updateError}</Text>}
      <CustomButton
        title={'Update'}
        onPress={handleUpdate}
        isLoading={updateLoading}
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

// Connect UpdateEmployee component to Redux store
const mapStateToProps = (state: RootState) => ({
  updateLoading: state.employees.updateLoading, // Replace with actual state path
  updateError: state.employees.updateError, // Replace with actual state path
});

const mapDispatchToProps = {
  updateEmployee,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployee);
