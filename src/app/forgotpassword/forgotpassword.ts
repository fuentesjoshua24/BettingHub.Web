import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgotpassword',
  imports: [CommonModule, 
            FormsModule, 
            ReactiveFormsModule, 
            MatFormFieldModule, 
            MatInputModule, 
            MatButtonModule],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.scss',
})
export class Forgotpassword {
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      const { email } = this.forgotForm.value;
      this.authService.forgotPassword(email);
    }
  }
}
