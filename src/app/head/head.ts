import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Wallet, WalletService } from '../service/wallet.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-head',
  imports: [MatIconModule],
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
    this.loadBalance();
      //   const userId = Number(localStorage.getItem('userId'));
      //   console.log('UserId from localStorage:', userId);
      //     this.walletService.getWalletByUserId(userId).subscribe((data) => {

      // });
  }

   loadBalance() {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.walletService.getWalletByUserId(userId).subscribe({
        next: (wallet) => {
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
  }

  refreshBalance() {
    // console.log('Refreshing balance...');
    this.loadBalance(); // just call the same method again
    // console.log('Balance after refresh:', this.balance);
  }
}



