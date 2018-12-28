import { Component } from '@angular/core';
import { HttpService } from './services/http.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _httpService: HttpService, private router: Router, private storage: StorageService) {}

  logoutUser() {
    this._httpService.logOutUser().subscribe(res => {
      // console.log(res);
      if (res['status'] === 200) {
        this.storage.clearUser();
        this.router.navigate(['/login']);
      }
    });
  }
}
