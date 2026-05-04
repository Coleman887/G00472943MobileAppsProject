import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class MyHttpService {
// Put the apiKey into a variable so that doesn't have to be copy/pasted all over the application.
  apiKey: string = "20227f3ffe578d2206950f3e07386265";

  constructor(private http: HttpClient) {

  }
// This is where all API calls are located. They all return observables for the respective page they are called on to subscribe to.


// This is the API call to get our list of trending movies on the homepage, returns today's list of trending movies.
  getTrending(): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey);

    }

// Takes a search 'query' and returns movies that match the search string.
  searchMovies(query: string): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/search/movie?query=" + query + "&api_key=" + this.apiKey);
  }

// Takes a 'movieId' and returns the cast and crew for the given ID.
  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + this.apiKey);
  }

// Takes a 'personId', then returns all details for the person.
  getPersonDetails(personId: number): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/person/" + personId + "?api_key=" + this.apiKey);
  }
// Takes a 'personId' and returns their filmography for the person's 'details' page.
  getPersonMovieCredits(personId: number): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/person/" + personId + "/movie_credits?api_key=" + this.apiKey);
  }
  }

