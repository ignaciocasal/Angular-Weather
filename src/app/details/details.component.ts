import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {forkJoin, Observable, Subscription} from "rxjs";
import {WeatherService} from "../services/weather.service";
import {UiService} from "../services/ui.service";
import {concatMap} from "rxjs/operators";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  darkMode: boolean;
  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;
  today: string;
  daysForecast: any;
  cityIllustrationPath: string;
  sub1: Subscription;
  sub2: Subscription;
  errorMessage: string;
  tweets$: Observable<any>;

  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService, public ui: UiService) {

  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    this.sub2 = this.activeRouter.paramMap.pipe(concatMap((route: any) => {
        this.city = route.params.city;
        this.cityIllustrationPath = 'https://source.unsplash.com/featured/1530x510/?'+this.city.toLowerCase()
        return forkJoin(this.weather.getWeather(this.city), this.weather.getForecast(this.city));
      })
    ).subscribe((payload: any) => {
      this.state = payload[0].weather[0].main;
      this.temp = Math.ceil(Number(payload[0].main.temp));
      this.hum = payload[0].main.humidity;
      this.wind = Math.round(Math.round(payload[0].wind.speed));
      const dates = {};
      for (const res of payload[1]) {
        const date = new Date(res.dt_txt).toDateString().split(' ')[0];
        if (dates[date]) {
          dates[date].counter += 1;
          dates[date].temp += res.main.temp;
        } else {
          dates[date] = {
            state: res.weather[0].main,
            temp: res.main.temp,
            counter: 1
          };
        }
      }
      Object.keys(dates).forEach((day) => {
        dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
      });
      delete dates[Object.keys(dates)[0]];
      this.daysForecast = dates;
      console.log("DAYS: ", this.daysForecast)
    }, (err) => {
      this.errorMessage = err.error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2500);
    });

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
