import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/error-handler.service';
import { RepositoryService } from './../../shared/repository.service';
import { Owner } from './../../_interface/owner.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update',
    'delete'
  ];

  public dataSource = new MatTableDataSource<Owner>();

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.getAllOwners();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllOwners = () => {
    this.repoService.getData('api/owner')
      .subscribe(res => {
        this.dataSource.data = res as Owner[];
      }, (error) => this.errorService.handleError(error)
      )
  }

  public redirectToDetails = (id: string) => {
    let url: string = `/owner/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
  }

  public redirectToDelete = (id: string) => {
  }

}
