import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  alarm: Object = {};
  alarmId;
  constructor(
    private httpService: HttpService,
    private _location: Location,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.alarmId = this._route.params['_value'].id;
    this.getCurrentAlarm(this.alarmId);
  }

  getCurrentAlarm(id) {
    this.httpService.getAlarmDetail(id).subscribe( (res) => {
      this.alarm = res;
    });
  }

  backPage() {
    this._location.back();
  }

  updateAlarm() {
    this.httpService.updateAlarm(this.alarm).subscribe( (res) => {
      this.backPage();
    });
  }

  deleteAlarm(id) {
    this.httpService.deleteAlarm(id).subscribe( (res) => {
      this.backPage();
    });
  }


}
