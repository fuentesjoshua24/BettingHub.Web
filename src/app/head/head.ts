import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Wallet, WalletService } from '../service/wallet.service';

@Component({
  selector: 'app-head',
  imports: [],
  templateUrl: './head.html',
  styleUrl: './head.scss',
})
export class Head {
  constructor(private authService: AuthService, 
              private walletService: WalletService
  ) {}

  balance: number | null = null;
  currency: string | null = null;
  
  onLogout(): void {
    this.authService.logout();
  }


  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    console.log('UserId from localStorage:', userId);
    if (userId) {
      this.walletService.getWalletByUserId(userId).subscribe({
        next: (wallet) => {
          console.log('Wallet data:', wallet);
          this.balance = wallet.balance;
          this.currency = wallet.currency;
        },
        error: (err) => {
          console.error('Error loading wallet:', err);
          this.balance = null;
          this.currency = null;
        }
      });
    }
      //   const userId = Number(localStorage.getItem('userId'));
      //   console.log('UserId from localStorage:', userId);
      //     this.walletService.getWalletByUserId(userId).subscribe((data) => {

      // });
  }

}



