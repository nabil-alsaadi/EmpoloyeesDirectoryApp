import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, RefreshControl, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Employee } from '../types/Employee';
import { deleteEmployee, fetchEmployees, resetSucessMessages } from '../redux/actions';
import { RootState } from '../redux/rootReducer';

interface PropsFromState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const EmployeeList: React.FC<any> = ({ employees, loading, error, fetchEmployees, navigation, deleteSuccess,
    deleteError, deleteEmployee, resetSucessMessages }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    useEffect(() => {
        if (deleteError) {
            Alert.alert('Error', deleteError);
            setLoadingId(null);
        }

        if (deleteSuccess) {
            Alert.alert('Success', 'Employee deleted successfully');
            resetSucessMessages();
            setLoadingId(null);
        }
    }, [deleteError, deleteSuccess, resetSucessMessages]);

    useEffect(() => {
        console.log('fetchEmployees(); =======')
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (!loading || error != null) {
            setRefreshing(false);
        }
    }, [loading, error])
    useEffect(() => {
        if (error) {
            showAlert();
        }
    }, [error])

    const handleCreatePress = useCallback(() => {
        navigation.navigate('CreateEmployee')
    }, [navigation]);

    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleCreatePress} style={{ margin: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'black' }}>+</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, handleCreatePress]);


    const filteredEmployees = useMemo(() => {
        return employees?.filter(employee =>
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
        fetchEmployees();
    }, [fetchEmployees]);

    const handleDelete = (id: number) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this employee?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        setLoadingId(id);
                        deleteEmployee(id);
                    }
                },
            ],
            { cancelable: false }
        );
    };
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
                        {loadingId === item.id ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Text style={{ fontSize: 20 }}>⛔︎</Text>
                            </TouchableOpacity>
                        )}
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
        flexDirection: 'row',
        justifyContent: 'space-between'
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

const mapStateToProps = (state: RootState): any => ({
    employees: state.employees.data ?? [],
    loading: state.employees.loading,
    error: state.employees.error,
    deleteSuccess: state.employees.deleteSuccess,
    deleteError: state.employees.deleteError,
});

const mapDispatchToProps: any = {
    fetchEmployees,
    deleteEmployee,
    resetSucessMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
