import { Employee } from "../types/Employee";

// Define your action types here
export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';

// Define your action creators
export const fetchEmployees = () => ({
  type: FETCH_EMPLOYEES,
});

export const fetchEmployeesSuccess = (employees: Employee[]) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const fetchEmployeesFailure = (error: string) => ({
  type: FETCH_EMPLOYEES_FAILURE,
  payload: error,
});

// employee details
export const FETCH_EMPLOYEE_DETAILS = 'FETCH_EMPLOYEE_DETAILS';
export const FETCH_EMPLOYEE_DETAILS_SUCCESS = 'FETCH_EMPLOYEE_DETAILS_SUCCESS';
export const FETCH_EMPLOYEE_DETAILS_FAILURE = 'FETCH_EMPLOYEE_DETAILS_FAILURE';

export const fetchEmployeeDetails = (id: number) => ({
  type: FETCH_EMPLOYEE_DETAILS,
  payload: id,
});

export const fetchEmployeeDetailsSuccess = (employee: Employee) => ({
  type: FETCH_EMPLOYEE_DETAILS_SUCCESS,
  payload: employee,
});

export const fetchEmployeeDetailsFailure = (error: string) => ({
  type: FETCH_EMPLOYEE_DETAILS_FAILURE,
  payload: error,
});