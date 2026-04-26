import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class MyHttpService {

  apiKey: string = "20227f3ffe578d2206950f3e07386265";

  constructor(private http: HttpClient) {

  }

  getTrending(): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey);

    }

  searchMovies(query: string): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/search/movie?query=" + query + "&api_key=" + this.apiKey);
  }

  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + this.apiKey);
  }

  getPersonDetails(personId: number): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/person/" + personId + "?api_key=" + this.apiKey);
  }

  getPersonMovieCredits(personId: number): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/person/" + personId + "/movie_credits?api_key=" + this.apiKey);
  }
  }

