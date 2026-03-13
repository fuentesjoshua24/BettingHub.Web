import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;       // optional if you don’t want to expose it
  createdDate?: string;    // ISO string from backend
}


@Injectable({
  providedIn: 'root',
})
export class ApiService {
   private apiUrl = 'http://localhost:8080/api/users'; // matches your API
  

  constructor(private http: HttpClient) {}

  // getStores(): Observable<Store[]> {
  //   return this.http.get<Store[]>(this.apiUrl);
  // }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API error:', error);
        return throwError(() => error);
      })
    );
  }

 

}
