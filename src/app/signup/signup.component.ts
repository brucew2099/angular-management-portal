import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  hide: boolean = true;
  hidec:boolean = true;
  errorMessage: string = 'Error Message';
  hasError: boolean = false;

  title:string = 'Password Help';
  header:string = 'Password should follow these rules:';
  content:string = `  (a) Contains at least 8 characters and at most 25 characters

  (b) Contains at least one digit

  (c) Contains at least one upper case alphabet

  (d) Contains at least one lower case alphabet

  (e) Contains at least one special character which includes !@#$%&*()-+=^

  (f) Does NOT contain any white space`;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.signupForm = this.fb.group({
      Email: ['',[Validators.required, Validators.email]],
      Password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(25),
            Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$')]],
      Confirmed: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(25),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$'),
        ValidationService.ConfirmedValidator]],
      FirstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      LastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    },
    {
      validator: ValidationService.ConfirmedValidator('Password', 'Confirmed')
    }
  )};

  ngOnInit(): void {
  }

  get Email() {
    return this.signupForm.value.Email;
  }

  get Password() {
    return this.signupForm.value.Password
  }

  get Confirmed() {
    return this.signupForm.value.Confirmed;
  }

  get FirstName() {
    return this.signupForm.value.FirstName;
  }

  get LastName() {
    return this.signupForm.value.LastName;
  }

  get f() {
    return this.signupForm.controls;
  }

  public submit(): void {
    // TODO call the auth service
    const {Email, Password} = this.signupForm.value;
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

  getConfirmedErrorMessage() {
    if(this.f.Confirmed.hasError('required')) {
      return 'Confirmed Password is required';
    }
    else if(this.f.Confirmed.hasError('mustMatch')) {
      return 'Passwords do not match'
    }
    return this.f.Confirmed.hasError('password') ?
      'Confirmed Password is not valid. For more information, click on' : '';
  }

  getFirstNameErrorMessage() {
    if(this.f.FirstName.hasError('required')) {
      return 'First Name is required';
    }
    return this.f.FirstName.hasError('pattern') ? 'First Name is not valid' : '';
  }

  getLastNameErrorMessage() {
    if(this.f.LastName.hasError('required')) {
      return 'Last Name is required';
    }
    return this.f.LastName.hasError('pattern') ? 'Last Name is not valid' : '';
  }

}
