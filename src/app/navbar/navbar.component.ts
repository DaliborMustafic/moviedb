import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ApiList } from '../api_list.model'
import { MovieService } from '../movie.service'
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  arrayOfApiCalls = new ApiList().getApi()
  @Output() passData = new EventEmitter()
  @Output() passSearch = new EventEmitter()
  @Output() headEmitter = new EventEmitter()
  movieList: any
  selectedIndex: any
  myInput:any;
  current_page: any;
  snapshotParam: string;
  constructor(private router: Router) {}
  ngOnInit(): void {


    window.onkeypress = (key) =>{
      if(key.keyCode == 13 && this.myInput != undefined){
        console.log(this.myInput + " key Pressed")
        this.router.navigate(["search/movies/" + this.myInput + "/1"])
        this.passSearch.emit(this.myInput)
      }
    }


  }

  callSearch(text){

  }
  setApi($event) {

    this.passData.emit($event.target.innerText)
    this.headEmitter.emit($event.target.innerText)
    this.router.navigate([$event.target.innerText + '/1'])

  }




  public setRow(_index: number) {
    this.selectedIndex = _index
  }

}
