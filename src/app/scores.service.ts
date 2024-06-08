import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Score } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  private URL = 'https://scores.chrum.it';

  constructor(private _http: HttpClient) {}

  submitScore(name: string, game: string, score: number, authToken: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': authToken,
    });
    const body = { name, game, score };
    return this._http.post(`${this.URL}/scores`, body, { headers });
  }

  public getMyScores(game: string) {
    return this._http.get<Score[]>(`${this.URL}/scores/${game}`);
  }
}
