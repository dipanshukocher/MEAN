import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private router: Router, private storage: StorageService) {
  }

  // postAlarm(alarmData: Object) {
  //   return this.http.post<any>(this.postAlarmUrl, alarmData);
  // }

  // httpOptions =  {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': this.storage.getToken(),
  //   })
  // };

  loginUser(loginData) {
    return this.http.post('http://localhost:3200/user/login', loginData).pipe(
      map(res => {
        // console.log(res);
          return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  logOutUser() {
    const logoutData = {};
    return this.http.post('http://localhost:3200/user/logout', logoutData).pipe(
      map(res => {
        // console.log(res);
          return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  signUpNewUser(signUpNewUserData) {
    return this.http.post('http://localhost:3200/user/signup', signUpNewUserData).pipe(
      map(res => {
        return res;
        // console.log(res);
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  postAlarms(data): Observable<any> {
    // console.log(absUrl);
    return this.http.post('http://localhost:3200/api/alarms', data).pipe(
      map(res => {
        // console.log(res);
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  getAlarms(): Observable<any> {
    return this.http.get('http://localhost:3200/api/alarms').pipe(
      map( response => {
        return response;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  getAlarmDetail(id: number): Observable<any> {
    const getAlarmDetailUrl = `http://localhost:3200/api/alarm/${id}`;
    return this.http.get(getAlarmDetailUrl).pipe(
      map( res => {
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  updateAlarm(alarmData: Object): Observable<any> {
    const getAlarmDetailUrl = 'http://localhost:3200/api/alarms';
    return this.http.put(getAlarmDetailUrl, alarmData).pipe(
      map( res => {
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  deleteAlarm(id: number): Observable<any> {
    const getAlarmDeleteUrl = `http://localhost:3200/api/alarms/${id}`;
    return this.http.delete(getAlarmDeleteUrl).pipe(
      map( res => {
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  handleError(error: HttpErrorResponse | any) {
    console.log(error);
    if (error.status === 401 || error.status === 0) {
      this.storage.clearUser();
      this.router.navigate(['login']);
    } else if (error.status === 400) {
      return error;
    } else if (error.status === 403) {

    } else {}

    return error;
  }
}
