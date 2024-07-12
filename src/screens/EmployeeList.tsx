import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import { Employee } from '../types/Employee';
import { fetchEmployees } from '../redux/actions';
import { RootState } from '../redux/rootReducer';
import LoadingIndicator from '../components/LoadingIndicator';

interface PropsFromState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

interface PropsFromDispatch {
  fetchEmployees: typeof fetchEmployees;
}

type Props = PropsFromState & PropsFromDispatch;

const EmployeeList: React.FC<Props> = ({ employees, loading, error, fetchEmployees, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    if (!loading || error != null) {
        setRefreshing(false);
    }
  },[loading, error])
  useEffect(() => {
    if (error) {
        showAlert();
      }
  },[error])

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee =>
      employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employee_age.toString().includes(searchQuery) ||
      employee.employee_salary.toString().includes(searchQuery)
    );
  }, [employees, searchQuery]);
  
  const showAlert = useCallback(() => {
    Alert.alert(
      'Error',
      ` ${error}`,
      [
        {
          text: 'Retry',
          onPress: () => {
            fetchEmployees();
          },
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    );
  }, [error, fetchEmployees]);
  

  const handlePress = useCallback((id: number) => {
    navigation.navigate('EmployeeDetails', { id });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEmployees(); // Fetch employees on refresh
    // setRefreshing(false);
  }, [fetchEmployees]);
  

//   if (loading) {
//     return <LoadingIndicator />;
//   }

  return (
    <View style={styles.container}>
        <TextInput
        style={styles.searchBar}
        placeholder="Search by name, age, salary"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.item} style={styles.item}>
            <Text>{item.employee_name}</Text>
          </TouchableOpacity>
        )}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#F44336']} // Android colors for refresh control
              tintColor={'#F44336'} // iOS color for refresh control
            />
          }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10
  },
});

const mapStateToProps = (state: RootState): PropsFromState => ({
  employees: state.employees.data,
  loading: state.employees.loading,
  error: state.employees.error,
});

const mapDispatchToProps: PropsFromDispatch = {
  fetchEmployees,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
