import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-management-portal';
  appId = 'theme1';

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

  constructor(private fb:FormBuilder) {
    this.navForm = this.fb.group({
      Search: ['',[]]
    });

    this.filteredAuthors = this.f.Search.valueChanges.pipe(
      startWith(''),
      map((author: string) => this._filter(author))
    );
  }

  ngOnInit(): void {
    for(let index in this.allAuthors) {
      this.authors.push(this.allAuthors[index].name);
    }
  }

  get Search() {
    return this.navForm.value.Search;
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
    alert(this.Search);
  }

  switchTheme(appId: string) {
    this.appId = appId;
  }
}
