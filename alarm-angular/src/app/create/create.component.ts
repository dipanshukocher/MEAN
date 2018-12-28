import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  alarm: Alarm = <Alarm>{};
  constructor(private _httpService: HttpService, private _location: Location) { }

  ngOnInit() {
  }

  onSubmit() {
    this._httpService.postAlarms(this.alarm).subscribe( (res) => {
      if (res) {
        this.backPage();
      }
    }, error => {
      console.log('error', error);
    });
  }

  backPage() {
    this._location.back();
  }


}

export interface Alarm {
  name: string;
  time: any;
  status: boolean;
}
