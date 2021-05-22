import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbProjectsComponent } from './db-projects.component';

describe('DbProjectsComponent', () => {
  let component: DbProjectsComponent;
  let fixture: ComponentFixture<DbProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
