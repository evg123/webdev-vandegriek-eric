import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  websites: any;

  constructor(private websiteService: WebsiteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

    this.websiteService.findWebsitesByUser(this.userId)
      .subscribe(
        (data: any) => {
          this.websites = data;
        },
        (error: any) => {
          this.errorMsg = 'Failed to find websites';
          this.errorFlag = true;
        }
      );
  }

}
