import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './api.service';
import { catchError, Observable, throwError } from 'rxjs';

export interface Wallet {
  walletId: number;
  user: User;
  balance: number;
  currency: string;
  updateDate?: string;   // ISO string from backend
}


@Injectable({ providedIn: 'root' })
export class WalletService {
  private apiUrl = 'http://localhost:8080/api/wallet'; // ✅ matches @RequestMapping

  constructor(private http: HttpClient) {}

  getWalletByUserId(userId: number) {
    return this.http.get<Wallet>(`${this.apiUrl}/user/${userId}`);
  }

  // getWalletByUserId(userId: number): Observable<Wallet[]> {
  //   return this.http.get<Wallet[]>(`${this.apiUrl}/user/${userId}`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('API error:', error);
  //       return throwError(() => error);
  //     })
  //   );
  // }

}
