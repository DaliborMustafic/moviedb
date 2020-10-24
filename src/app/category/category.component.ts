import { Component, OnInit } from '@angular/core';
import { ApiStrings } from '../movieString.model';
import { MovieService } from '../movie.service';
import { GetclipService } from '../getclip.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  movieList: any;

  clipApi: any;
  link: any;
  head:string;
  apistrings: ApiStrings;
  show_overlay: boolean;


  constructor(private _movieList:MovieService, private movieClip:GetclipService, public sanitizer : DomSanitizer) { }

  vid:boolean = false;
  text: boolean = false;
  id:string;
  yt_id:string;



  ngOnInit(): void {


  }


  reciveData($event){
    this.movieList = $event
  }

  reciveHead($event){
    this.head = $event;
  }

  getClip(id){
    this._movieList
    .getClip({"id" : id})
    .subscribe(data => {

      let temp  = "https://www.youtube.com/embed/" + data["results"][0].key + "?enablejsapi=1&origin=*";
      let ret_val  = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
      this.link = ret_val;
      this.vid = !this.vid;
      this.show_overlay = !this.show_overlay;
    })
  }




  showText($event){
    if(this.text == false){
      $event.target.className = "show_text";
      this.text = true;

    }else{
      $event.target.className = "text";
      this.text= false;
    }

  }
  destroy(){
    this.vid = false
    this.link = "";
  }


}
