import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChatroomListComponent } from './chat-chatroom-list.component';

describe('ChatChatroomListComponent', () => {
  let component: ChatChatroomListComponent;
  let fixture: ComponentFixture<ChatChatroomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatChatroomListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChatroomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
