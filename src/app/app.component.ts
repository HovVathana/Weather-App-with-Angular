import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = '<the weather />';
  cityName: string = "Phnom Penh"
  weatherData?: WeatherData;
  timeofDay: string = "";
  conditionText: string = "";
  buttonColor: string = "";
  iconCode: string = "";

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityName)
    this.cityName = "";
  }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = "";
  }

  onClick(cityName:string) {
    this.getWeatherData(cityName);
    this.cityName = "";
  }



  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName).subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log(this.weatherData)

        this.timeofDay = (response.current.is_day === 1) ? 'day' : 'night';

        this.iconCode = response.current.condition.icon.substr(-7)


        let code = response.current.condition.code;
        if ( code == 1000 ) {
          this.conditionText = 'clear';
          this.buttonColor = (this.timeofDay == 'night') ? "#181e27" : "#e5ba92";
        } else if (
          code == 1003 ||
          code == 1006 ||
          code == 1009 ||
          code == 1030 ||
          code == 1069 ||
          code == 1087 ||
          code == 1135 ||
          code == 1273 ||
          code == 1276 ||
          code == 1279 ||
          code == 1282 ) {
            this.conditionText = 'cloudy';
            this.buttonColor = (this.timeofDay == 'night') ? "#181e27" : "#fa6d1b";
          } else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
          ) {
            this.conditionText = 'rainy';
            this.buttonColor = (this.timeofDay == 'night') ? "#325c80" : "#647d75";
          } else {
            this.conditionText = 'snowy';
            this.buttonColor = (this.timeofDay == 'night') ? "#1b1b1b" : "#4d72aa";
          }
      }
    })
  }

}
