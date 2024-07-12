import { ofType, Epic } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import axios from 'axios';

import {
  UPDATE_EMPLOYEE,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  fetchEmployees, 
} from '../actions';
import { BASE_URL } from '../../constants/constants';

const updateEmployeeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(UPDATE_EMPLOYEE),
    switchMap((action) =>

      from(axios.put(`${BASE_URL}/${action.payload.id}`, action.payload.employeeData))
        .pipe(
          map((response) => {
            console.log('updateEmployeeEpic',response?.data ?? {})

            return updateEmployeeSuccess(response?.data ?? {});
          }),
          catchError((error) => {

            console.error('Error updating employee:', error);
            return of(updateEmployeeFailure(error?.response?.data?.message ?? 'Unknown error'));
          })
        )
    )
  );

export default updateEmployeeEpic;
