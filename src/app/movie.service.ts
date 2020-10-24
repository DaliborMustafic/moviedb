import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ApiStrings } from './movieString.model'


@Injectable({
  providedIn: 'root',
})
export class MovieService {
  details: ApiStrings
  movieList: any

  constructor(private _http: HttpClient) {}

  apiUrl: any

  getMovies(apiStr: ApiStrings) {
    return this._http.post('http://localhost:3000/', apiStr)

  }
  getClip(id) {
    return this._http.post('http://localhost:3000/clip', id)
  }

  getDetails(id: string, path: string) {
    if (path == 'details/movie/:id') {
      this.details = {
        name: 'Details',
        begining: `https://api.themoviedb.org/3/movie/${id}?api_key=`,
        end: '&language=en-US',
      }
    }
    if (path == 'details/series/:id') {
      this.details = {
        name: 'Details',
        begining: `https://api.themoviedb.org/3/tv/${id}?api_key=`,
        end: '&language=en-US',
      }
    }
    return this._http.post('http://localhost:3000/details', this.details)
  }

  getSearch(keyword:string, page: any){
    this.details = {
      name:'Search',
      begining:`https://api.themoviedb.org/3/search/movie?api_key=`,
      end: `&language=en-US&query=${keyword}&page=${page}&include_adult=true`,
    }
    return this._http.post('http://localhost:3000/search', this.details)
  }
}

// Mehrere funktionen mit verschiedene Api calls
