import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Score {
  name: string;
  game: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  private baseUrl = 'https://scores.chrum.it';

  constructor(private http: HttpClient) {}

  submitScore(
    name: string,
    game: string,
    score: number,
    authToken: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': authToken,
    });
    const body = { name, game, score };
    return this.http.post(`${this.baseUrl}/scores`, body, { headers });
  }

  getMyScores(game: string): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.baseUrl}/scores/${game}`);
  }
}
