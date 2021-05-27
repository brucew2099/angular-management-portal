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
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-management-portal';
  appId = 'theme1';
  loading: boolean = false;

  private _subscriptions: Subscription[] = [];

  navForm: FormGroup;
  allAuthors = [
    { id: 101, name: 'Godaan', writer: 'Premchand' },
    { id: 102, name: 'Karmabhoomi', writer: 'Premchand' },
    { id: 103, name: 'Pinjar', writer: 'Amrita Pritam' },
    { id: 104, name: 'Kore Kagaz', writer: 'Amrita Pritam' },
    { id: 105, name: 'Nirmala', writer: 'Premchand' },
    { id: 106, name: 'Seva Sadan', writer: 'Premchand' }
  ];
  filteredAuthors: Observable<string[]>;
  authors:string[] = [];

  constructor(private fb:FormBuilder, private ls: LoadingService, public auth: AuthService,
        private localService: LocalStorageService) {
    this.navForm = this.fb.group({
      search: ['',[]]
    });

    this.filteredAuthors = this.f.search.valueChanges.pipe(
      startWith(''),
      map((author: string) => this._filter(author))
    );
  }

  ngOnInit(): void {
    for(let index in this.allAuthors) {
      this.authors.push(this.allAuthors[index].name);
    }

    this._subscriptions.push(
      this.ls.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    )
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }

  get search() {
    return this.navForm.value.search;
  }

  get f() {
    return this.navForm.controls;
  }

  displayFn(object: any): string {
    console.log(object);
    return object ? object : undefined;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.authors.filter(author => author.toLowerCase().includes(filterValue));
  }

  searchMe() {
    alert(this.search);
  }

  switchTheme(appId: string) {
    this.appId = appId;
  }

  logout(): void {
    this.auth.logout();
  }
}
