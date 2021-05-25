import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { AuthService } from '../auth.service';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  private _subscriptions: Subscription[] = [];
  private _returnUrl: string = '';
  hide: boolean = true;
  errorMessage: string | boolean = 'Error Message';
  hasError:boolean = false;

  title:string = 'Password Help';
  header:string = 'Password should follow these rules:';
  content:string = `  (a) Contains at least 8 characters and at most 25 characters

  (b) Contains at least one digit

  (c) Contains at least one upper case alphabet

  (d) Contains at least one lower case alphabet

  (e) Contains at least one special character which includes !@#$%&*()-+=^

  (f) Does NOT contain any white space`;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private loadingService: LoadingService,
        private auth:AuthService, private route: ActivatedRoute, private router:Router) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(25),
            Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$')]]
    });
  }

  ngOnInit(): void {
    this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  get email() {
    return this.loginForm.value.email;
  }

  get password() {
    return this.loginForm.value.password;
  }

  get f() {
    return this.loginForm.controls;
  }

  public submit(): void {
    this.loadingService.isLoading.next(true);

    this._subscriptions.push(
      from(this.auth.login(this.email, this.password)).subscribe(success => {
        if(typeof(success) === 'boolean' && success) {
          this.router.navigateByUrl(this._returnUrl);
        }
        else {
          this.hasError = true;
          this.errorMessage = success;
          console.log(success);

          setTimeout(() => {
            this.hasError = true;
            this.errorMessage = ''
          }, 5000);
        }})
    );

    this.loadingService.isLoading.next(false);
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

}
