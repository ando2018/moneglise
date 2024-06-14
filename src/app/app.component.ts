import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DataGlobal } from './data-global';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  isShow: boolean = true;
  constructor(private http: HttpClient, private route: Router) {
    route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url)
        this.isShow = event.url != '/accueil';
      }
    });
  }

  ngOnInit() {
  }

  title = 'FPMA Melun';
  dayNames = DataGlobal.dayNames;
  monthNames = DataGlobal.monthNames;

  getLongMonthName(date: Date) {
    return this.monthNames[date.getMonth()];
  }
  getLongDayName(date: Date) {
    return this.dayNames[date.getDay() - 1];
  }
  data = { date: this.getLongDayName(new Date()) + ', ' + new Date().getDate().toString() + ' ' + this.getLongMonthName(new Date()) + ' ' + new Date().getFullYear().toString() };

  getActiveRoute(url: string) {
    return this.route.url == url ?  'nav-active' : '';
  }
}
