import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface Client {
  name: string;
}

@Component({
  selector: 'app-db-summary',
  templateUrl: './db-summary.component.html',
  styleUrls: ['./db-summary.component.scss']
})
export class DbSummaryComponent implements OnInit {

  summaryForm: FormGroup;
  displayedColumns: string[] = ['Name']; //, 'Item', 'Importance', 'delete'];

  //clients = new MatTableDataSource<Client>([]);
  Clients: Client[] = [];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  Role: string = '';
  Username: string = '';
  NoOfTeamMembers: number = 0;
  TotalCostOfAllProjects: number = 0.00;
  PendingTasks: number = 0;
  UpcomingProjects: number = 0;
  ProjectCost: number = 0.00;

  CurrentExpenditure: number = 0.00;
  AvaiableFunds: number = 0.00;

  constructor(private fb: FormBuilder) {
    this.summaryForm = this.fb.group({
      Role: ['', []],
      Username: ['', []],
      NoOfTeamMembers: ['', []],
      TotalCostOfAllProjects: ['', []],
      PendingTasks: ['', []],
      UpcomingProjects: ['', []],
      ProjectCost: ['', []],
      CurrentExpenditure: ['', []],
      AvailableFunds: ['', []],
    });
  }

  ngOnInit(): void {
    this.Role = "Team Leader";
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
  }

}
