import { ofType, Epic } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios'; // Import Axios

import { FETCH_EMPLOYEES, fetchEmployeesSuccess, fetchEmployeesFailure } from '../actions';

const employeesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(FETCH_EMPLOYEES),
    switchMap(() =>
      from(axios.get('https://dummy.restapiexample.com/api/v1/employees')).pipe(
        map((response) => fetchEmployeesSuccess(response?.data?.data ?? {})),
        catchError((error) => of(fetchEmployeesFailure(error?.response?.data?.message ?? ""))),
      ),
    ),
  );

export default employeesEpic;
