import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  setToken(payload) {
      const accessToken = `Bearer ${payload['token']}`;
      localStorage.setItem('accessToken', accessToken);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  clearUser() {
    localStorage.removeItem('accessToken');
  }

}
