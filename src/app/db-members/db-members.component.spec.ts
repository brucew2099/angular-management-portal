import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbMembersComponent } from './db-members.component';

describe('DbMembersComponent', () => {
  let component: DbMembersComponent;
  let fixture: ComponentFixture<DbMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
