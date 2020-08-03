import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/error-handler.service';
import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_interface/owner.model';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {

  public owner: Owner;
  public showAccounts;

  constructor(
    private repoService: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOwnerDetails();
  }

  private getOwnerDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/owner/${id}/account`;
    this.repoService.getData(apiUrl)
      .subscribe(res => {
        this.owner = res as Owner;
        console.log(this.owner);
        
      },
        (error) => {
          this.errorHandler.handleError(error);
        })
  }

}
