import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieListComponent} from 'src/app/movie-list/movie-list.component'
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: '', redirectTo: "Upcoming Movies/1", pathMatch: 'full' },
  { path: ':cat',component: MovieListComponent},
  { path: ':cat/:page', component: MovieListComponent},
  { path: 'details/movie/:id', component: MovieListComponent},
  { path: 'details/series/:id', component: MovieListComponent},
  { path: 'search/movies/:word/:page', component: MovieListComponent, pathMatch: "full"},
  { path: 'movie-details/:id', component: MovieDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MovieListComponent,MovieDetailsComponent,CategoryComponent]
