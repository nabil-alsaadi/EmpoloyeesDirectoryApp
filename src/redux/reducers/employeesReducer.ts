import { combineReducers } from 'redux';
import { FETCH_EMPLOYEES, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAILURE, FETCH_EMPLOYEE_DETAILS_SUCCESS, FETCH_EMPLOYEE_DETAILS_FAILURE, FETCH_EMPLOYEE_DETAILS } from '../actions';
import { Employee } from '../../types/employee';

interface EmployeesState {
  loading: boolean;
  data: Employee[];
  error: string | null;
  detailsLoading: boolean;
  detailsError: string | null;
}

const initialEmployeesState: EmployeesState = {
  loading: false,
  data: [],
  error: null,
  detailsLoading: false,
  detailsError: null
};

const employeesReducer = (state = initialEmployeesState, action: any): EmployeesState => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_EMPLOYEE_DETAILS:
        return {
          ...state,
          detailsLoading: true,
          detailsError: null,
        };
    case FETCH_EMPLOYEE_DETAILS_SUCCESS:
      // Update employee details in the list
      const updatedEmployees = state.data.map(employee =>
        employee.id === action.payload.id ? { ...employee, ...action.payload } : employee
      );

      return {
        ...state,
        detailsLoading: false,
        data: updatedEmployees,
      };
    case FETCH_EMPLOYEE_DETAILS_FAILURE:
      return {
        ...state,
        detailsLoading: false,
        detailsError: action.payload,
      };
    default:
      return state;
  }
};


export default employeesReducer