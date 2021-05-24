import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-chatroom-windows',
  templateUrl: './chat-chatroom-windows.component.html',
  styleUrls: ['./chat-chatroom-windows.component.scss']
})
export class ChatChatroomWindowsComponent implements OnInit {
  // TODO replace with Firebase data
  public dummyData = [
    {
      Message: 'Sed enim velit, condimentum nec tincidunt non, elementum sed nisi.',
      CreatedAt: new Date(),
      Sender: {
        FirstName: 'Steve',
        LastName: 'Smith',
        PhotoUrl: 'http://via.placeholder.com/50x50'
      }
    },
    {
      Message: 'Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero.',
      CreatedAt: new Date(),
      Sender: {
        FirstName: 'Bob',
        LastName: 'Anderson',
        PhotoUrl: 'http://via.placeholder.com/50x50'
      }
    },
    {
      Message: 'Ut eu elit sodales leo ultricies pulvinar. Fusce iaculis magna gravida tempus congue. Ut sit amet nulla sed nisi cursus mattis quis at lacus. Proin commodo, justo in elementum scelerisque, sem urna vulputate enim, ac posuere purus diam ac velit. Sed enim velit, condimentum nec tincidunt non, elementum sed nisi. Cras pharetra dui eu scelerisque pharetra. Curabitur auctor feugiat nibh eget molestie. Duis scelerisque auctor mi, sit amet efficitur magna vulputate quis. Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero. Praesent eu tristique felis. Nunc vestibulum enim et justo dignissim lacinia nec et diam.',
      CreatedAt: new Date(),
      Sender: {
        FirstName: 'Sally',
        LastName: 'Jones',
        PhotoUrl: 'http://via.placeholder.com/50x50'
      }
    },
    {
      Message: 'Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero.',
      CreatedAt: new Date(),
      Sender: {
        FirstName: 'Sally',
        LastName: 'Jones',
        PhotoUrl: 'http://via.placeholder.com/50x50'
      }
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
