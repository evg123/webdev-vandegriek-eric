import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  siteId: string;
  pageId: string;
  widgetId: string;
  widget: any;
  name: string;
  text: string;
  rows: number;
  placeholder: string;
  formatted: boolean;

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

    this.widget = this.widgetService.findWidgetById(this.widgetId)
      .subscribe(
        (data: any) => {
          this.widget = data;
          this.name = this.widget.name;
          this.text = this.widget.text;
          this.rows = this.widget.rows;
          this.placeholder = this.widget.placeholder;
          this.formatted = this.widget.formatted;
        },
        (error: any) => {
          this.errorMsg = 'Failed to find widget';
          this.errorFlag = true;
        }
      );
  }

  update() {
    this.widget = {};
    this.widget.name = this.loginForm.value.name;
    this.widget.text = this.loginForm.value.text;
    this.widget.rows = this.loginForm.value.rows;
    this.widget.placeholder = this.loginForm.value.placeholder;
    this.widget.formatted = this.loginForm.value.formattedCheck;
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
