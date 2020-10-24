import { Component, OnInit, Input } from '@angular/core'
import { MovieService } from '../movie.service'
import { ApiStrings } from '../movieString.model'
import { GetclipService } from '../getclip.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiList } from '../api_list.model'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movieList: any
  movieDetails: any
  snapshotParam = 'initial value'
  snapID = ''
  clipApi: any
  youtubeLink: any
  head: string
  apistrings: ApiStrings
  show_overlay: boolean
  page: string

  constructor(
    private readonly route: ActivatedRoute,
    private _movieList: MovieService,
    public sanitizer: DomSanitizer,
    private router: Router,
  ) {}
  Link: string
  vid: boolean = false
  text: boolean = false
  id: string
  yt_id: string
  api: any
  total_pages: any //for pagination
  current_page: any = 1 //for pagination
  routerPath: string
  totalPagesArray: any
  name
  search_word:string
  arrayOfApiCalls = new ApiList().getApi()

  page_class = 'page'

  ngOnInit(): void {
    this.snapshotParam = this.route.snapshot.paramMap.get('cat')
    this.snapID = this.route.snapshot.paramMap.get('id')
    this.current_page = this.route.snapshot.paramMap.get('page')
    this.routerPath = this.route.snapshot.routeConfig.path
    this.search_word = this.route.snapshot.paramMap["params"]["word"]
    this.routers()

    this.reciveHead(this.snapshotParam)
    setTimeout(() => {
      this.highlight_current_page(this.current_page)
      if(this.total_pages){
        document.getElementsByClassName('pagination')[0].scrollLeft = 0
      }
    }, 1500)
  }

  scroll_left(){

  }

  scroll_right(){
    document.getElementsByClassName("col-sm-xl-12.col-xl-pull-12")[0].scrollLeft +=40
  }

  setApi(MovieCat: string, page) {
    "Hallo"
    this.arrayOfApiCalls.forEach((element) => {
      if (element.name == MovieCat) {
        this.api = element
      }
    })
    this.api.end = this.api.end + '&page=' + page
    this._movieList.getMovies(this.api).subscribe((data) => {
      this.movieList = data
      this.total_pages = new Array(data['total_pages'])
      window.scroll(0, 0)
    })
  }
  checkIfSeries(someText) {
    this.routerPath = this.route.snapshot.routeConfig.path
    if (someText == 'Trending TV-Shows') {

      this.Link = '../details/series/'
    }if(this.routerPath == 'search/movies/:word/:page'){

      this.Link = '../../../details/movie/'
    }if(someText != 'Trending TV-Shows' && this.routerPath !='search/movies/:word/:page'){
      this.Link = '../details/movie/'
    }
  }
  routers() {
    this.checkIfSeries(this.snapshotParam)
    this.callDetails(this.snapID, this.routerPath)

    if (this.routerPath === ':cat') {
      this.setApi(this.snapshotParam, this.current_page)
      this.router.navigate([this.snapshotParam + '/1'])
    }
    if (this.routerPath === ':cat/:page') {
      this.setApi(this.snapshotParam, this.current_page)
    }
    if (this.routerPath === 'details/movie/:id') {
      this.getClip(this.snapID, '../details/movie/')
    }
    if (this.routerPath ==='details/series/:id') {
      this.getClip(this.snapID, '../details/series/')
    }
    if (this.routerPath == 'search/movies/:word/:page'){
      this.current_page = this.route.snapshot.paramMap["params"]["page"];
      this.callSearch(this.search_word,this.current_page)
    }
  }
  reciveData($event) {
    console.log($event)
    let text = $event.trim()
    this.checkIfSeries(text)
    this.setApi(text, 1)
    setTimeout(() => {
      this.highlight_current_page(1)
      document.getElementsByClassName('pagination')[0].scrollLeft = 0
    }, 1000)
  }

  reciveHead(text) {
    this.head = text
  }
  reciveSearch($event){
    this.callSearch($event,1);
  }

  callSearch(searchWord,number){
    this._movieList.getSearch(searchWord,number).subscribe((data) => {
      this.movieList  = data
      this.total_pages = new Array(data['total_pages'])
    } )
  }

  setPage(page) {
    this.current_page = page
    this.snapshotParam = this.route.snapshot.paramMap.get('cat')
    if (this.routerPath == 'search/movies/:word/:page'){
      this.search_word = this.route.snapshot.paramMap["params"]["word"]
      this.callSearch(this.search_word,this.current_page)
      this.router.navigate(["search/movies/"+ this.search_word +  "/" + this.current_page])
    }else{
      this.setApi(this.snapshotParam, this.current_page)
      this.router.navigate([this.snapshotParam + '/' + this.current_page])
    }
    this.highlight_current_page(this.current_page)
  }

  highlight_current_page(page) {
    if(this.total_pages){
      let pagination_count = document.getElementsByClassName('page')
      for (let i = 0; i < pagination_count.length; i++) {
        pagination_count[i]['style'].background = 'white'
        pagination_count[i]['style'].color = 'black'
      }
      pagination_count[page - 1]['style'].background = 'black'
      pagination_count[page - 1]['style'].color = 'white'
    }

  }

  getClip(id, param) {
    this._movieList.getClip({ id: id, link: param }).subscribe((data) => {
      if (data['results'][0]) {
        var temp =
          'https://www.youtube.com/embed/' +
          data['results'][0].key +
          '?enablejsapi=1&origin=*'
        let ret_val = this.sanitizer.bypassSecurityTrustResourceUrl(temp)
        this.youtubeLink = ret_val
      }
      this.vid = !this.vid
      this.show_overlay = !this.show_overlay
    })
  }

  callDetails(id, path) {
    path = this.routerPath
    this._movieList.getDetails(id, path).subscribe((data) => {
      this.movieDetails = data
    })
  }

  goLeft() {
    document.getElementsByClassName('pagination')[0].scrollLeft -= 40
  }
  goRight() {
    document.getElementsByClassName('pagination')[0].scrollLeft += 40
  }

  showText($event) {
    if (this.text == false) {
      $event.target.className = 'show_text'
      this.text = true
    } else {
      $event.target.className = 'text'
      this.text = false
    }
  }
  destroy() {
    this.vid = false
    this.youtubeLink = ''
  }
}
