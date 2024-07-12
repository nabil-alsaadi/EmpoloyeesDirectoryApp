import { Epic, ofType } from "redux-observable";
import { FETCH_EMPLOYEE_DETAILS, fetchEmployeeDetailsFailure, fetchEmployeeDetailsSuccess } from "../actions";
import { catchError, from, map, of, switchMap } from "rxjs";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const employeeDetailsEpic: Epic = (action$) =>
    action$.pipe(
      ofType(FETCH_EMPLOYEE_DETAILS),
      switchMap((action) =>
        from(axios.get(`${BASE_URL}/${action.payload}`)).pipe(
          map((response) => {

            return fetchEmployeeDetailsSuccess(response?.data)
        }),
          catchError((error) => {
            return of(fetchEmployeeDetailsFailure(error?.response?.data?.message ?? ""))
        }),
        ),
      ),
    );

export default employeeDetailsEpic;