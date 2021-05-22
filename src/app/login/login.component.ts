import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean = true;
  errorMessage: string = 'Error Message';
  hasError:boolean = false;

  title:string = 'Password Help';
  header:string = 'Password should follow these rules:';
  content:string = `  (a) Contains at least 8 characters and at most 25 characters

  (b) Contains at least one digit

  (c) Contains at least one upper case alphabet

  (d) Contains at least one lower case alphabet

  (e) Contains at least one special character which includes !@#$%&*()-+=^

  (f) Does NOT contain any white space`;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      Email: ['',[Validators.required, Validators.email]],
      Password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(25),
            Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$')]]
    });
  }

  ngOnInit(): void {
  }

  get Email() {
    return this.loginForm.value.Email;
  }

  get Password() {
    return this.loginForm.value.Password;
  }

  get f() {
    return this.loginForm.controls;
  }

  public submit(): void {
    // TODO call the auth service
    const {Email, Password} = this.loginForm.value;
    console.log(`Email: ${Email}, Password: ${Password}`);
  }

  openDialog():void {
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      width: '550px',
      data: {title: this.title, header: this.header, content: this.content}
    });
  }

  getEmailErrorMessage() {
    if(this.f.Email.hasError('required')) {
      return 'Email is required';
    }
    return this.f.Email.hasError('email') ? 'Email is not valid' : '';
  }

  getPasswordErrorMessage() {
    if(this.f.Password.hasError('required')) {
      return 'Password is required';
    }
    return this.f.Password.hasError('pattern') ?
      'Password is not valid. For more information, click on' : '';
  }

}
