// epics/employeesEpic.ts

import { ofType, Epic } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import {
  DELETE_EMPLOYEE, deleteEmployeeSuccess, deleteEmployeeFailure,
} from '../actions';
import { BASE_URL } from '../../constants/constants';

const deleteEmployeeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(DELETE_EMPLOYEE),
    switchMap(action =>
        
      from(axios.delete(`${BASE_URL}/${action.payload}`)).pipe(
        map(() => deleteEmployeeSuccess(action.payload)),
        catchError((error) => of(deleteEmployeeFailure(error?.response?.data?.message ?? ""))),
      )
    ),
  );

export default deleteEmployeeEpic;
