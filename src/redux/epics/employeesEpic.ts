import { ofType, Epic } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios'; // Import Axios

import { FETCH_EMPLOYEES, fetchEmployeesSuccess, fetchEmployeesFailure } from '../actions';
import { BASE_URL } from '../../constants/constants';

const employeesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(FETCH_EMPLOYEES),
    switchMap(() =>
      from(axios.get(BASE_URL)).pipe(
      map((response) => {
        console.log('response ==================',response?.data)
        return fetchEmployeesSuccess(response?.data ?? [])
      }),
        catchError((error) => of(fetchEmployeesFailure(error?.response?.data?.message ?? ""))),
      ),
    ),
  );

export default employeesEpic;
