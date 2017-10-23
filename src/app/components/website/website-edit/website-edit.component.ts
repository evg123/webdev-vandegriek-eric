import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  siteId: string;
  websites: any;
  website: any;
  name: string;
  description: string;

  constructor(private websiteService: WebsiteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.siteId = params['wid'];
        }
      );

    this.websiteService.findWebsiteById(this.siteId)
      .subscribe(
        (data: any) => {
          this.website = data;
          this.name = this.website.name;
          this.description = this.website.description;
        },
        (error: any) => {
          this.errorMsg = 'Failed to find website';
          this.errorFlag = true;
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

  update() {
    this.website = {};
    this.website.name = this.loginForm.value.name;
    this.website.description = this.loginForm.value.description;
    this.websiteService.updateWebsite(this.siteId, this.website)
      .subscribe(
        (data: any) => {
          this.router.navigate(['user', this.userId, 'website']);
        },
        (error: any) => {
          this.errorMsg = 'Failed to update website';
          this.errorFlag = true;
        }
      );
  }

  delete() {
    this.websiteService.deleteWebsite(this.siteId)
      .subscribe(
        (data: any) => {
          this.router.navigate(['user', this.userId, 'website']);
        },
        (error: any) => {
          this.errorMsg = 'Failed to delete website';
          this.errorFlag = true;
        }
      );
  }
}
