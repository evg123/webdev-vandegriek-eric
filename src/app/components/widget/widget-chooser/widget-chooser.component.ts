import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  siteId: string;
  pageId: string;

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
        }
      );

  }

  newWidget(type: string) {
    const widget: any = {};
    widget.widgetType = type;
    this.widgetService.createWidget(this.pageId, widget)
      .subscribe(
        (data: any) => {
          const newWidget = data;
          this.router.navigate(['user', this.userId, 'website', this.siteId, 'page', this.pageId, 'widget', newWidget._id]);
        },
        (error: any) => {
          this.errorMsg = 'Failed to create new widget';
          this.errorFlag = true;
        }
      );
  }
}
