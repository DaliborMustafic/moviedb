import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { MovieService } from './movie.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ApiStrings } from './movieString.model';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    routingComponents,
    CategoryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [MovieService,ApiStrings],
  bootstrap: [AppComponent]
})
export class AppModule { }
