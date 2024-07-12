// epics/createEmployeeEpic.ts

import { ofType, Epic } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import { CREATE_EMPLOYEE, createEmployeeSuccess, createEmployeeFailure } from '../actions';
import { Employee } from '../../types/Employee';
import { BASE_URL } from '../../constants/constants';

const createEmployeeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(CREATE_EMPLOYEE),
    switchMap(action =>
        from(axios.post(BASE_URL, action.payload)).pipe(
        map((response) => {
            console.log('response =--------------',response)
            return createEmployeeSuccess(response.data as Employee)
        }),
        catchError((error) => of(createEmployeeFailure(error.response?.data?.message || error.message))),
      ),
    ),
  );

export default createEmployeeEpic;
