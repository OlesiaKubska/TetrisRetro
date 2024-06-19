import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
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
    // console.log('Sending request to validate token:', body);
    return this.http
      .post<TokenValidationResponse>(this.apiUrl, body, {
        headers: myHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something bad happened; please try again later.');
  }
}
