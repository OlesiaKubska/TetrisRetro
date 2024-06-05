import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  constructor(private http: HttpClient) {}

  getHighscores(game: string): Observable<any[]> {
    return this.http
      .get<any[]>(`/scores/${game}`)
      .pipe(
        map((response) =>
          response.sort((a, b) => b.score - a.score).slice(0, 10)
        )
      );
  }
}
