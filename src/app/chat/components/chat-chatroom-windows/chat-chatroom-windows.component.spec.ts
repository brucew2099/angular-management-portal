import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChatroomWindowsComponent } from './chat-chatroom-windows.component';

describe('ChatChatroomWindowsComponent', () => {
  let component: ChatChatroomWindowsComponent;
  let fixture: ComponentFixture<ChatChatroomWindowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatChatroomWindowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChatroomWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
