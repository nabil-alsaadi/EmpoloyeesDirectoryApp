// reducers/employeesReducer.ts

import { 
  FETCH_EMPLOYEES, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAILURE, 
  FETCH_EMPLOYEE_DETAILS, FETCH_EMPLOYEE_DETAILS_SUCCESS, FETCH_EMPLOYEE_DETAILS_FAILURE, 
  UPDATE_EMPLOYEE, UPDATE_EMPLOYEE_SUCCESS, UPDATE_EMPLOYEE_FAILURE,
  CREATE_EMPLOYEE, CREATE_EMPLOYEE_SUCCESS, CREATE_EMPLOYEE_FAILURE, 
  RESET_SUCCESS_MESSAGES,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE
} from '../actions';
import { Employee } from '../../types/Employee';

interface EmployeesState {
  loading: boolean;
  data: Employee[];
  error: string | null;
  detailsLoading: boolean;
  detailsError: string | null;
  updateLoading: boolean;
  updateError: string | null;
  createLoading: boolean;
  createError: string | null;
  createSuccess: boolean;
  deleteLoading: boolean;
  deleteError: string | null;
  deleteSuccess: boolean;
}

const initialEmployeesState: EmployeesState = {
  loading: false,
  data: [],
  error: null,
  detailsLoading: false,
  detailsError: null,
  updateLoading: false,
  updateError: null,
  createLoading: false,
  createError: null,
  createSuccess: false,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
};

const employeesReducer = (state = initialEmployeesState, action: any): EmployeesState => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return { ...state, loading: true, error: null };
    case FETCH_EMPLOYEES_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_EMPLOYEES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_EMPLOYEE_DETAILS:
      return { ...state, detailsLoading: true, detailsError: null };
    case FETCH_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        detailsLoading: false,
        data: state.data.map(employee =>
          employee.id === action.payload.id ? { ...employee, ...action.payload } : employee
        ),
      };
    case FETCH_EMPLOYEE_DETAILS_FAILURE:
      return { ...state, detailsLoading: false, detailsError: action.payload };
    case UPDATE_EMPLOYEE:
      return { ...state, updateLoading: true, updateError: null };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        data: state.data.map(employee =>
          employee.id === action.payload.id ? action.payload : employee
        ),
      };
    case UPDATE_EMPLOYEE_FAILURE:
      return { ...state, updateLoading: false, updateError: action.payload };
    case CREATE_EMPLOYEE:
      return { ...state, createLoading: true, createError: null,createSuccess: false };
    case CREATE_EMPLOYEE_SUCCESS:
      return { ...state, createLoading: false, data: [...state.data, action.payload],createSuccess: true };
    case CREATE_EMPLOYEE_FAILURE:
      return { ...state, createLoading: false, createError: action.payload,createSuccess: false };
    case DELETE_EMPLOYEE:
      return { ...state, deleteLoading: true, deleteError: null, deleteSuccess: false };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        data: state.data.filter(employee => employee.id !== action.payload),
        deleteSuccess: true,
      };
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload,
        deleteSuccess: false,
      };
    case RESET_SUCCESS_MESSAGES:
      return { ...state, createSuccess: false , deleteSuccess: false};
    default:
      return state;
  }
};

export default employeesReducer;
