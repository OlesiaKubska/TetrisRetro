import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Highscore } from './definitions';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  constructor(private _http: HttpClient) {}

  public getHighscores(game: string) {
    const URL = 'https://scores.chrum.it/scores';

    return this._http
      .get<Highscore[]>(`${URL}/${game}`, {
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
