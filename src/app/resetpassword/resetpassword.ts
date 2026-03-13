import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            ReactiveFormsModule, 
            MatFormFieldModule, 
            MatInputModule, 
            MatButtonModule],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.scss',
})
export class Resetpassword {
 resetForm: FormGroup;

  ngOnInit(): void {
    // ✅ Auto-fill from query params
    this.route.queryParams.subscribe(params => {
      if (params['email']) this.resetForm.patchValue({ email: params['email'] });
      if (params['token']) this.resetForm.patchValue({ token: params['token'] });
    });
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const { email, token, newPassword } = this.resetForm.value;
      this.authService.resetPassword(email, token, newPassword);
    }
  }
}
