import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Employee } from '../types/Employee';
import { RootState } from '../redux/rootReducer';
import { fetchEmployeeDetails } from '../redux/actions';
import LoadingIndicator from '../components/LoadingIndicator';

interface PropsFromState {
  employee?: Employee;
  loading: boolean;
  error: string | null;
}

interface OwnProps {
  route: { params: { id: number } };
}

type Props = PropsFromState & typeof mapDispatchToProps & OwnProps;

const EmployeeDetails: React.FC<Props> = ({ route, employee, loading, error, fetchEmployeeDetails, navigation }) => {
  const { id } = route.params ?? {};

  useEffect(() => {
    console.log(id)
    if (id) {
        // fetchEmployeeDetails disabled for now cause no extra data been fetched
        //fetchEmployeeDetails(id);
    }
    
  }, [fetchEmployeeDetails, id]);

  useEffect(() => {
    if (error) {
        showAlert();
      }
  },[error])

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={styles.headerLeft}>
          <Text style={styles.headerLeftText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleBackPress]);

  

  const showAlert = useCallback(() => {
    Alert.alert(
      'Error',
      `${error}`,
      [
        {
          text: 'Retry',
          onPress: () => {
            if (id) {
              fetchEmployeeDetails(id);
            }
          },
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    );
  }, [error, id, fetchEmployeeDetails]);

  

  

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!employee) {
    return <Text>Employee not found</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {employee.employee_name}</Text>
      <Text style={styles.text}>Salary: {employee.employee_salary}</Text>
      <Text style={styles.text}>Age: {employee.employee_age}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  headerLeft: {
    paddingHorizontal: 10,
  },
  headerLeftText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state: RootState, ownProps: OwnProps): PropsFromState => {
  const { id } = ownProps.route.params || {};
  return {
    employee: state.employees.data.find(emp => emp.id === id),
    loading: state.employees.detailsLoading,
    error: state.employees.detailsError,
  };
};

const mapDispatchToProps = {
  fetchEmployeeDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
