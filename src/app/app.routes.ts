import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Homepage } from './homepage/homepage';
import { Login } from './login/login';
import { Authguard } from './service/authguard';
import { Register } from './register/register';
import { Forgotpassword } from './forgotpassword/forgotpassword';
import { Resetpassword } from './resetpassword/resetpassword';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: Forgotpassword },
  { path: 'reset-password', component: Resetpassword },
  {
    path: '',
    component: Home, // ✅ Home is the parent
    canActivate: [Authguard],
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: Homepage },


    //   { path: 'mobiles', component: Mobiles },
    //   { path: 'desktop', component: Desktop },
    //   { path: 'monitor', component: Monitor}
    ]
  }
];