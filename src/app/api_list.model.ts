import { GetDate } from './getDate.model';
import { ApiStrings } from './movieString.model';

export class ApiList{


  date = new  GetDate;
  apistrings: ApiStrings;
  movieList: any;
  apiMovies="https://api.themoviedb.org/3/discover/movie?api_key=";
  apiSeries = "https://api.themoviedb.org/3/trending/tv/day?api_key=";
  arrayOfApiCalls :ApiStrings[]
  today = this.date.forApi(14)
  nowDate = this.date.forApi(0)
  twoYearsAgo = this.date.forApi(-730)
  oneYearAgo = this.date.forApi(-360)
  thisYear = ((this.nowDate).split("-"))[0];

  public  getApi() : ApiStrings[]{
    this.arrayOfApiCalls = [
      {name : "Upcoming Movies", begining:this.apiMovies, end:'&primary_release_date.gte='+ this.today},
      {name : "Movies in Theatres",begining:this.apiMovies, end:'&primary_release_date.lte='+this.nowDate},
      {name :"Movies for Kids",begining:this.apiMovies, end:('&sort_by=popularity.desc&certification_country=DE&certification=0&include_adult=false&include_video=false&page=2&primary_release_date.gte=' + this.twoYearsAgo + '&primary_release_date.lte=' + this.today + '&vote_count.gte=6')},
      {name: "Most Voted Movies",begining:this.apiMovies, end:('&language=en&sort_by=popularity.desc&certification_country=US&certification=PG-13&include_adult=false&include_video=false&page=1-3&primary_release_date.gte='+ this.oneYearAgo + '&primary_release_date.lte='  + this.today + '&vote_average.gte=8&vote_count.gte=5&without_genres=99')},
      {name: "The Best Drama this Year", begining:this.apiMovies, end:('&language=en&with_genres=18&primary_release_year='+this.thisYear)},
      {name: "Best Aktion Movies this year", begining:this.apiMovies, end:'&language=en&with_genres=28&primary_release_year='+this.thisYear},
      {name:  "The Best Animated movies this Year", begining:this.apiMovies, end:'&language=en&with_genres=16&primary_release_year='+this.thisYear},
      {name:  "Best Crime Movies this Year",begining:this.apiMovies, end:'&language=en&with_genres=80&primary_release_year='+this.thisYear },
      {name: "Best Documentary Movies this Year", begining:this.apiMovies, end:'&language=en&with_genres=99&primary_release_year='+this.thisYear},
      {name: "Best Fantasy Movies this Year", begining:this.apiMovies, end:'&language=en&with_genres=14&primary_release_year='+this.thisYear},
      {name:  "Best Horror Movies this Year", begining:this.apiMovies, end:'&language=en&with_genres=27&primary_release_year='+this.thisYear},
      {name: "Trending TV-Shows", begining:this.apiSeries, end:''}

   ]

   return this.arrayOfApiCalls;
  }



}
