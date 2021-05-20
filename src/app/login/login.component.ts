import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  get Email() {
    return this.loginForm.value.Email;
  }

  get Password() {
    return this.loginForm.value.Password
  }

  get f() {
    return this.loginForm.controls;
  }

  public submit(): void {
    // TODO call the auth service
    const {Email, Password} = this.loginForm.value;
    console.log(`Email: ${Email}, Password: ${Password}`);
  }

}
