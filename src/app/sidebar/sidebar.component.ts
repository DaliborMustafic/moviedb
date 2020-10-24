import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { ApiStrings } from '../movieString.model'
import { MovieService } from '../movie.service'
import { GetDate } from '../getDate.model'
import { ApiList } from '../api_list.model'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  date = new GetDate()
  apistrings: ApiStrings
  movieList: any

  @Output() passData = new EventEmitter()
  @Output() headEmitter = new EventEmitter()
  @Output() apiEmitter = new EventEmitter()
  heading: string;
  snapshotParam: string;
  constructor(private readonly route: ActivatedRoute,private _movieList: MovieService) {}
  ngOnInit(): void {
    // this.apiEmitter.emit(this.arrayOfApiCalls)
    this.snapshotParam = this.route.snapshot.paramMap.get('cat')
    this.getUrlNameSetIndex();
  }

  selectedIndex: number;


  arrayOfApiCalls = new ApiList().getApi()
  getUrlNameSetIndex(){
    for(var i = 0 ; i < this.arrayOfApiCalls.length ; i++){
      if(this.arrayOfApiCalls[i].name == this.snapshotParam){
        this.selectedIndex = i
      }
    }
  }
  setApi($event) {
/*      this._movieList
      .getMovies(newApi)
      .subscribe(data => { */
        this.passData.emit($event.target.textContent)
        this.headEmitter.emit($event.target.textContent)
      // })
  }


  public setRow(_index: number) {

    this.selectedIndex = _index

  }
}
