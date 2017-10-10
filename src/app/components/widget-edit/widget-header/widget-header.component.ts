import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  siteId: string;
  pageId: string;
  widgetId: string;
  widget: any;

  constructor(private widgetService: WidgetService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.siteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
        }
      );

    this.widget = this.widgetService.findWidgetById(this.widgetId);
  }
/*
  update() {
    this.widget = {};
    this.website.name = this.loginForm.value.name;
    this.website.description = this.loginForm.value.description;
    this.websiteService.updateWebsite(this.siteId, this.website);

    this.router.navigate(['/user/', this.userId, '/website']);
  }
*/
}
