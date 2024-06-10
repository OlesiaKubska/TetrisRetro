import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenValidationResponse } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class TokenValidationService {
  private apiUrl = 'https://scores.chrum.it/check-token';

  constructor(private http: HttpClient) {}

  validateToken(token: string): Observable<TokenValidationResponse> {
    const myHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { 'auth-token': token };
    console.log('Sending request to validate token:', body);
    return this.http.post<TokenValidationResponse>(this.apiUrl, body, {
      headers: myHeaders,
    });
  }
}
