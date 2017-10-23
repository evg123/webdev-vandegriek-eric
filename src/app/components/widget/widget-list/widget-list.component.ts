import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  siteId: string;
  pageId: string;
  widgets: any;

  constructor(private widgetService: WidgetService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.siteId = params['wid'];
          this.pageId = params['pid'];
        }
      );

    this.widgetService.findWidgetsByPageId(this.pageId)
      .subscribe(
        (data: any) => {
          this.widgets = data;
        },
        (error: any) => {
          this.errorMsg = 'Failed to find widgets';
          this.errorFlag = true;
        }
      );
  }

  formatUrl(url: string) {
    // make this url embed-able
    let idIdx = url.lastIndexOf('=');
    if (idIdx === -1) {
      idIdx = url.lastIndexOf('/');
    }
    const vidId = url.slice(idIdx + 1);
    url = 'https://www.youtube.com/embed/' + vidId;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
