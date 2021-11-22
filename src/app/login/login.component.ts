import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = ''
  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['', [Validators.required]],
      password:['',[Validators.required]]
    })
  }

  logMeIn() {
    console.log(this.loginForm)
    localStorage.setItem('token', '12345')
    if(this.authService.lastURL) this.router.navigate([this.authService.lastURL])
    else this.router.navigate(['home'])
  }
}
