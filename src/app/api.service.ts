import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

export interface Covid {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: Date;
}

export interface Country {
  name: string;
  iso2: string;
  iso3: string;
}

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }
  url = 'https://api.covid19api.com/country/Brazil';
  urlPaises = 'https://covid19.mathdro.id/api/countries';

  getCovid() {
    return this.http.get<Covid[]>(this.url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  getCountries() {
    return this.http.get(this.urlPaises)
      
      
      .pipe(
        retry(3), // retry a failed request up to 3 times
        map(res => res.countries),
        catchError(this.handleError)
      );
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.url, { observe: 'response' });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}