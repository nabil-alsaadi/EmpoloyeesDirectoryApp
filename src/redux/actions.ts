import { Employee } from "../types/Employee";


export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';


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

// Update employee
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
export const UPDATE_EMPLOYEE_FAILURE = 'UPDATE_EMPLOYEE_FAILURE';

export const updateEmployee = (id: number, employeeData: String) => ({
  type: UPDATE_EMPLOYEE,
  payload: { id, employeeData },
});

export const updateEmployeeSuccess = (employee: Employee) => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const updateEmployeeFailure = (error: string) => ({
  type: UPDATE_EMPLOYEE_FAILURE,
  payload: error,
});


// Create Employee Actions
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS';
export const CREATE_EMPLOYEE_FAILURE = 'CREATE_EMPLOYEE_FAILURE';

export const createEmployee = (employee: Omit<Employee, 'id'>) => ({
  type: CREATE_EMPLOYEE,
  payload: employee,
});

export const createEmployeeSuccess = (employee: Employee) => ({
  type: CREATE_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const createEmployeeFailure = (error: string) => ({
  type: CREATE_EMPLOYEE_FAILURE,
  payload: error,
});


export const RESET_SUCCESS_MESSAGES = 'RESET_SUCCESS_MESSAGES';

export const resetSucessMessages = () => ({
  type: RESET_SUCCESS_MESSAGES,
});


// actions.js

export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_FAILURE = 'DELETE_EMPLOYEE_FAILURE';

export const deleteEmployee = (id: number) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});

export const deleteEmployeeSuccess = (id: number) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload: id,
});

export const deleteEmployeeFailure = (error: string) => ({
  type: DELETE_EMPLOYEE_FAILURE,
  payload: error,
});

