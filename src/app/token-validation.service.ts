import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenValidationService {
  private apiUrl = 'https://scores.chrum.it/check-token';

  constructor(private http: HttpClient) {}

  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 'auth-token': token };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
