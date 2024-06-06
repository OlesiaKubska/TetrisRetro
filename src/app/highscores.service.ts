import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Highscore } from './definitions';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  private baseUrl = 'https://scores.chrum.it/scores';

  constructor(private _http: HttpClient) {}

  // public getHighscores(game: string) {
  //   const URL = 'https://scores.chrum.it/scores';

  //   return this._http.get<Array<Highscore>>(`${URL}/${game}`);
  // }

  public getHighscores(game: string): Observable<Highscore[]> {
    return this._http
      .get<Highscore[]>(`${this.baseUrl}/${game}`, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        catchError((error) => {
          console.error(`Error fetching highscores: ${error.message}`, error);
          return throwError(() => new Error('Failed to fetch highscores'));
        })
      );
  }
}
