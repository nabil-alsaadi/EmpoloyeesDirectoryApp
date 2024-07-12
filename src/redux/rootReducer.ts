import { combineReducers } from 'redux';
import employeesReducer from './reducers/employeesReducer';


const rootReducer = combineReducers({
  employees: employeesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
