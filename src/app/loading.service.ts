import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxLoadingXModule } from 'ngx-loading-x';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: Subject<boolean> = new Subject<boolean>();

  constructor(private lm: NgxLoadingXModule) { }
}
