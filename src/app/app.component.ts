import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-management-portal';
  loading: boolean = false;

  constructor(private fb:FormBuilder, private ls: LoadingService, public auth: AuthService,
        private localService: LocalStorageService) { }

  ngOnInit(): void { }
}
