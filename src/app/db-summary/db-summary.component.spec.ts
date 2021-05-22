import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbSummaryComponent } from './db-summary.component';

describe('DbSummaryComponent', () => {
  let component: DbSummaryComponent;
  let fixture: ComponentFixture<DbSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
