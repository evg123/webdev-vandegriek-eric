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

    this.website = this.websiteService.findWebsiteById(this.siteId);
    this.name = this.website.name;
    this.description = this.website.description;
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }

  update() {
    this.website = {};
    this.website.name = this.loginForm.value.name;
    this.website.description = this.loginForm.value.description;
    this.websiteService.updateWebsite(this.siteId, this.website);

    this.router.navigate(['user', this.userId, 'website']);
  }

  delete() {
    this.websiteService.deleteWebsite(this.siteId);

    this.router.navigate(['user', this.userId, 'website']);
  }
}
