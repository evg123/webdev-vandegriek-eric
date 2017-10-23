import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  siteId: string;

  constructor(private pageService: PageService,
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
  }

  create() {
    const page: any = {};
    page.name = this.loginForm.value.name;
    page.title = this.loginForm.value.title;
    this.pageService.createPage(this.siteId, page)
      .subscribe(
        (data: any) => {
          this.router.navigate(['user', this.userId, 'website', this.siteId, 'page']);
        },
        (error: any) => {
          this.errorMsg = 'Failed to create new page';
          this.errorFlag = true;
        }
      );
  }
}
