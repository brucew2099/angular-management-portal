import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Designation: string = '';
  Username: string = '';
  NoOfTeamMembers: number = 0;
  TotalCostOfAllProjects: number = 0.00;
  PendingTasks: number = 0;
  UpcomingProjects: number = 0;
  ProjectCost: number = 0.00;

  CurrentExpenditure: number = 0.00;
  AvaiableFunds: number = 0.00;

  Clients: any[] = [];

  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  ];

  menuHeaders: any = [];
  appItemsNav: any = [];
  appItems: any =  [
    {
      label: 'Dashboard',
      items: [
        {
          label: '',
          link: '',
        }
      ]
    },
    {
      label: 'Login',
      items: [
        {
          label: '',
          link: '',
        }
      ]
    },
    {
      label: 'About',
      items: [
        {
          label: '',
          link: '',
        }
      ]
    },
  ];

  constructor(){}

  ngOnInit(): void {
    this.Designation = "Team Leader";
    this.Username = "John Smith";
    this.NoOfTeamMembers = 67;
    this.TotalCostOfAllProjects = 240;
    this.PendingTasks = 15;
    this.UpcomingProjects = 2;
    this.ProjectCost = 2113507.45;
    this.CurrentExpenditure = 96788.00;
    this.AvaiableFunds = 52536.75;

    this.Clients = [
      {name: 'ABC Infotech Ltd.'},
      {name: 'Def Software Solutions'},
      {name: 'GHI Industries'}
    ]

    this.appItemsNav = this.appItemsNav;
  }

  breadCrumbMain() {
    this.appItemsNav = this.appItems;
    this.menuHeaders = [];
  }

  breadCrumb(menu: any, index: number) {
    console.log('sub breadCrumb');
    this.menuHeaders.splice(index + 1, this.menuHeaders.length - 1);
    if (menu[index] && menu[index].items && menu[index].items.length) {
      this.appItemsNav = menu[index].items;
    }
  }

  menuChange(menuChange: any) {
    if (menuChange.items) {
      this.appItemsNav = menuChange.items;
      this.menuHeaders.push({ label: menuChange.label, icon: 'keyboard_arrow_right', items: menuChange.items });
      // this.menuHeader.push(menuChange);

      console.log('hasMultiMenuLabel');
    }
  }

  // toggleAccordion() {
  //   if(this.accordion.) {
  //     this.accordion.closeAll();
  //   }
  //   else {
  //     this.accordion.openAll();
  //   }
  // }
}
