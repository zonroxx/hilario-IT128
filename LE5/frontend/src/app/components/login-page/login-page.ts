import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { TokenStorage } from '../../services/token-storage';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {
  form: any = {
    username: null,
    password: null
  }

  constructor(
    private authService: Auth,
    private tokenStorage: TokenStorage,
    private http: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit() {
    const {username, password} = this.form;

    console.log('Form submitted:', this.form);

    this.http.post("http://localhost:5246/api/Login/login", { username, password }, {responseType: 'text'}).subscribe({
      next: (token) => {
        console.log('Login successful, token:', token);
        this.tokenStorage.saveToken(token);
        this.authService.isLoggedIn = true;
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    })
  }
}
