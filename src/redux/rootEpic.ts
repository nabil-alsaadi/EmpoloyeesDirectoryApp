import { combineEpics } from 'redux-observable';
import employeesEpic from './epics/employeesEpic';
import employeeDetailsEpic from './epics/employeeDetailsEpic';


const rootEpic = combineEpics(
  employeesEpic,employeeDetailsEpic
);

export default rootEpic;
