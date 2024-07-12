import { combineReducers } from 'redux';
import employeesReducer from './reducers/employeesReducer';

// Import your reducers here
// import { exampleReducer } from './exampleReducer';

const rootReducer = combineReducers({
  // Add your reducers here
  // example: exampleReducer,
  employees: employeesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
