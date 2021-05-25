import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { LoadingService } from '../loading.service';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  hide: boolean = true;
  hidec:boolean = true;
  errorMessage: string | boolean = 'Error Message';
  hasError: boolean = false;
  private _subscriptions: Subscription[] = [];

  title:string = 'Password Help';
  header:string = 'Password should follow these rules:';
  content:string = `  (a) Contains at least 8 characters and at most 25 characters

  (b) Contains at least one digit

  (c) Contains at least one upper case alphabet

  (d) Contains at least one lower case alphabet

  (e) Contains at least one special character which includes !@#$%&*()-+=^

  (f) Does NOT contain any white space`;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private auth: AuthService,
        private route: ActivatedRoute, private router: Router, private loadingService: LoadingService) {
    this.signupForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(25),
            Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$')]],
      confirmed: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(25),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$'),
        ValidationService.ConfirmedValidator]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    },
    {
      validator: ValidationService.ConfirmedValidator('password', 'confirmed')
    }
  )};

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  get email() {
    return this.signupForm.value.email;
  }

  get password() {
    return this.signupForm.value.password
  }

  get confirmed() {
    return this.signupForm.value.confirmed;
  }

  get firstName() {
    return this.signupForm.value.firstName;
  }

  get lastName() {
    return this.signupForm.value.lastName;
  }

  get f() {
    return this.signupForm.controls;
  }

  public submit(): void {
    this.loadingService.isLoading.next(true);
    const {email, password, confirmed, firstName, lastName} = this.signupForm.value;
    console.log(`Email: ${email}, Password: ${password}`);
    this._subscriptions.push(
      this.auth.signup(email, password, firstName, lastName).subscribe(success => {
        if(typeof(success) === 'boolean' && success) {
          this.router.navigate(['/chat']);
        }
        else {
          this.hasError = true;
          this.errorMessage = success;

          setTimeout(() => {
            this.hasError = true;
            this.errorMessage = '';
          }, 5000);
        }
        this.loadingService.isLoading.next(false);
      })
    )
  }

  openDialog():void {
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      width: '550px',
      data: {title: this.title, header: this.header, content: this.content}
    });
  }

  getEmailErrorMessage() {
    if(this.f.email.hasError('required')) {
      return 'Email is required';
    }
    return this.f.email.hasError('email') ? 'Email is not valid' : '';
  }

  getPasswordErrorMessage() {
    if(this.f.password.hasError('required')) {
      return 'Password is required';
    }
    return this.f.password.hasError('pattern') ?
      'Password is not valid. For more information, click on' : '';
  }

  getConfirmedErrorMessage() {
    if(this.f.confirmed.hasError('required')) {
      return 'Confirmed Password is required';
    }
    else if(this.f.confirmed.hasError('mustMatch')) {
      return 'Passwords do not match'
    }
    return this.f.confirmed.hasError('password') ?
      'Confirmed Password is not valid. For more information, click on' : '';
  }

  getFirstNameErrorMessage() {
    if(this.f.firstName.hasError('required')) {
      return 'First Name is required';
    }
    return this.f.firstName.hasError('pattern') ? 'First Name is not valid' : '';
  }

  getLastNameErrorMessage() {
    if(this.f.lastName.hasError('required')) {
      return 'Last Name is required';
    }
    return this.f.lastName.hasError('pattern') ? 'Last Name is not valid' : '';
  }

}
