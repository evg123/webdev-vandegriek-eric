import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  siteId: string;
  pageId: string;
  widgetId: string;
  widget: any;
  width: string;
  url: string;
  name: string;
  text: string;

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

    this.widgetService.findWidgetById(this.widgetId)
      .subscribe(
        (data: any) => {
          this.widget = data;
          this.name = this.widget.name;
          this.text = this.widget.text;
          this.width = this.widget.width;
          this.url = this.widget.url;
        },
        (error: any) => {
          this.errorMsg = 'Failed to find widget';
          this.errorFlag = true;
        }
      );
  }

  update() {
    this.widget = {};
    this.widget.url = this.loginForm.value.url;
    this.widget.width = this.loginForm.value.width;
    this.widget.name = this.loginForm.value.name;
    this.widget.text = this.loginForm.value.text;
    this.widgetService.updateWidget(this.widgetId, this.widget)
      .subscribe(
        (data: any) => {
          this.router.navigate(['user', this.userId, 'website', this.siteId, 'page', this.pageId, 'widget']);
        },
        (error: any) => {
          this.errorMsg = 'Failed to update widget';
          this.errorFlag = true;
        }
      );
  }

  delete() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe(
        (data: any) => {
          this.router.navigate(['user', this.userId, 'website', this.siteId, 'page', this.pageId, 'widget']);
        },
        (error: any) => {
          this.errorMsg = 'Failed to delete widget';
          this.errorFlag = true;
        }
      );
  }

}
