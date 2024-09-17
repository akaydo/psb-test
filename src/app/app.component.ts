import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentWeather } from './interfaces/CurrentWeather';
import { HourlyForecast } from './interfaces/HourlyForecast';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentWeatherData!: CurrentWeather;
  hourlyWeatherData!: HourlyForecast[];

  city = '';
  displayCity = '';
  selectedParameter = 'temp';

  displayedColumns = ['time', 'temp', 'cloud', 'pressure', 'humidity'];

  constructor(
    private weatherService: WeatherService,
    private snackBar: MatSnackBar
  ) {}

  getWeatherData() {
    if (!this.city) return;

    this.weatherService
      .getWeatherByCity(this.city)
      .pipe(
        tap((data) => {
          this.currentWeatherData = data.current;
          this.hourlyWeatherData = data.forecast.forecastday[0].hour.map(
            (hour: HourlyForecast) => ({
              time: hour.time,
              temp_c: hour.temp_c,
              cloud: hour.cloud,
              pressure_mb: hour.pressure_mb,
              humidity: hour.humidity,
            })
          );
          this.displayCity =
            this.city.charAt(0).toUpperCase() + this.city.slice(1);
        }),
        catchError((err) => {
          this.snackBar.open('Invalid city name', 'Close', {
            duration: 3000,
          });
          return throwError(() => err);
        })
      )
      .subscribe();
  }

  onFilterChange(filter: string) {
    this.selectedParameter = filter;
  }
}
