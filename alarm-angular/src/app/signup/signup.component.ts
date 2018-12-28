import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup: Object = {};
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }

  createUser() {
    this.httpService.signUpNewUser(this.signup).subscribe(res => {
      console.log(res);
      if (res['status'] === 201) {
        this.router.navigate(['/login']);
      }
    });
  }

}
