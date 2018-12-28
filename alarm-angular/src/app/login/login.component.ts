import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Object = {};
  constructor(private _httpService: HttpService, private router: Router, private storage: StorageService) { }

  ngOnInit() {
  }

  loginUser() {
    this._httpService.loginUser(this.login).subscribe(res => {
      // console.log(res);
      this.storage.setToken(res);
      if (res) {
        // store user & token in local storage to keep user logged in between page refreshes
        this.router.navigate(['/alarms']);
      }
    });
  }

}
