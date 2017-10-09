import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import {Routing} from './app.routing';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {TestService} from './services/test.service.client';
import { LoginComponent } from './components/user/src/app/components/user/login/login.component';
import { ProfileComponent } from './components/user/src/app/components/user/profile/profile.component';
import { RegisterComponent } from './components/user/src/app/components/user/register/register.component';
import { WebsiteNewComponent } from './components/website/src/app/components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/src/app/components/website/website-edit/website-edit.component';
import { WebsiteListComponent } from './components/website/src/app/components/website/website-list/website-list.component';
import { PageNewComponent } from './components/page/src/app/components/page/page-new/page-new.component';
import { PageEditComponent } from './components/page/src/app/components/page/page-edit/page-edit.component';
import { PageListComponent } from './components/page/src/app/components/page/page-list/page-list.component';
import { WidgetChooserComponent } from './components/widget/src/app/components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/src/app/components/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './components/widget/src/app/components/widget/widget-list/widget-list.component';
import { WidgetHeaderComponent } from './components/widget-edit/src/app/components/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './components/widget-edit/src/app/components/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './components/widget-edit/src/app/components/widget-edit/widget-youtube/widget-youtube.component';

@NgModule({
  // Declare components here
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WebsiteListComponent,
    PageNewComponent,
    PageEditComponent,
    PageListComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing
  ],
  // Client Side services here
  providers: [ TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
