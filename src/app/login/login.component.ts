import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
      Email: ['',[Validators.required, Validators.email]],
      Password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(25),
            Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$')]]
    });
  }

  ngOnInit(): void {
    this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
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
    this.loadingService.isLoading.next(true);

    this._subscriptions.push(
      this.auth.login(this.Email, this.Password).subscribe(success => {
        if(typeof(success) === 'boolean' && success) {
          this.router.navigateByUrl(this._returnUrl);
        }
        else {
          this.hasError = true;
          this.errorMessage = success;

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
