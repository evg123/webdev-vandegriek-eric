import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

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
  size: string;

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
    this.name = this.widget.name;
    this.text = this.widget.text;
    this.size = this.widget.size;
  }

  update() {
    this.widget = {};
    this.widget.name = this.loginForm.value.name;
    this.widget.text = this.loginForm.value.text;
    this.widget.size = this.loginForm.value.size;
    this.widgetService.updateWidget(this.widgetId, this.widget);

    this.router.navigate(['user', this.userId, 'website', this.siteId, 'page', this.pageId, 'widget']);
  }

  delete() {
    this.widgetService.deleteWidget(this.widgetId);

    this.router.navigate(['user', this.userId, 'website', this.siteId, 'page', this.pageId, 'widget']);
  }

}
