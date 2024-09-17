import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { WeatherServerData } from '../interfaces/WeatherServerData';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherByCity(cityName: string): Observable<WeatherServerData> {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${environment.weatherapi.API_key}&q=${cityName}&days=1`;
    return this.http.get<WeatherServerData>(url);
  }
}
