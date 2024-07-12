import { combineEpics } from 'redux-observable';
import employeesEpic from './epics/employeesEpic';
import employeeDetailsEpic from './epics/employeeDetailsEpic';
import updateEmployeeEpic from './epics/updateEmployeeEpic';
import createEmployeeEpic from './epics/createEmployeeEpic';
import deleteEmployeeEpic from './epics/deleteEmployeeEpic';


const rootEpic = combineEpics(
  employeesEpic,employeeDetailsEpic,updateEmployeeEpic,createEmployeeEpic,deleteEmployeeEpic
);

export default rootEpic;
