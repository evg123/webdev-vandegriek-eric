import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  siteId: string;
  websites: any;
  website: any;

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

  create() {
    this.website = {};
    this.website.name = this.loginForm.value.name;
    this.website.description = this.loginForm.value.description;
    this.websiteService.createWebsite(this.userId, this.website)
      .subscribe(
        (data: any) => {
          this.router.navigate(['user', this.userId, 'website']);
        },
        (error: any) => {
          this.errorMsg = 'Failed to create new website';
          this.errorFlag = true;
        }
      );
  }
}
