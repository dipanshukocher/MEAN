import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  alarmsList;
  constructor(private apiService: HttpService) {
  }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms() {
    this.apiService.getAlarms().subscribe( res => {
      if (res) {
        this.alarmsList = res;
      }
    });
  }

}
