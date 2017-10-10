import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  siteId: string;
  pageId: string;
  page: any;
  name: string;
  title: string;

  constructor(private pageService: PageService,
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

    this.page = this.pageService.findPageById(this.pageId);
    this.name = this.page.name;
    this.title = this.page.title;
  }

  update() {
    this.page = {};
    this.page.name = this.loginForm.value.name;
    this.page.title = this.loginForm.value.title;
    this.pageService.updatePage(this.pageId, this.page);

    this.router.navigate(['user', this.userId, 'website', this.siteId, 'page']);
  }

  delete() {
    this.pageService.deletePage(this.pageId);

    this.router.navigate(['user', this.userId, 'website', this.siteId, 'page']);
  }
}
