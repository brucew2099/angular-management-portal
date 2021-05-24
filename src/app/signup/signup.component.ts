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

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
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
    this.loadingService.isLoading.next(true);
    const {Email, Password, Confirmed, FirstName, LastName} = this.signupForm.value;
    console.log(`Email: ${Email}, Password: ${Password}`);
    this._subscriptions.push(
      this.auth.signup(Email, Password, FirstName, LastName).subscribe(success => {
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
