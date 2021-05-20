import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  get Email() {
    return this.signupForm.value.Email;
  }

  get Password() {
    return this.signupForm.value.Password
  }

  get f() {
    return this.signupForm.controls;
  }

  public submit(): void {
    // TODO call the auth service
    const {Email, Password} = this.signupForm.value;
    console.log(`Email: ${Email}, Password: ${Password}`);
  }

}
