import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Highscore {
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  private baseUrl = 'https://scores.chrum.it/scores';

  constructor(private _http: HttpClient) {}

  getHighscores(game: string): Observable<Highscore[]> {
    return this._http
      .get<Highscore[]>(`${this.baseUrl}/${game}`)
      .pipe(
        map((response) =>
          response.sort((a, b) => b.score - a.score).slice(0, 10)
        )
      );
  }
}
