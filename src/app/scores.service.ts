import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Score } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  constructor(private _http: HttpClient) {}

  private URL = 'https://scores.chrum.it/scores';

  public getMyScores(
    name: string,
    game: string,
    token: string
  ): Observable<Score[]> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'auth-token': token,
    });

    return this._http
      .get<Score[]>(`${this.URL}?name=${name}&game=${game}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(`Error fetching highscores: ${error.message}`, error);
          return throwError(() => new Error('Failed to fetch highscores'));
        })
      );
  }

  public submitScore(
    name: string,
    game: string,
    score: number,
    token: string
  ): Observable<any> {
    const body = { name, game, score };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': token,
    });

    console.log('Submitting score with token:', token);

    return this._http.post(this.URL, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error submitting score', error);
        return throwError(() => new Error('Failed to submit score'));
      })
    );
  }
}
