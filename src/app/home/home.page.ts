import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonSearchbar, IonItem, ViewWillEnter } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../services/data';
import { MyHttpService } from '../services/my-http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, home, moon, sunny, arrowBack } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonItem, IonToolbar, IonTitle, IonSearchbar, IonContent, IonButton, IonButtons, IonCard, IonIcon, FormsModule, CommonModule, IonItem],
})
export class HomePage implements ViewWillEnter {
  movies: any[] = [];
  key: string = "";

  constructor(public router : Router, private myhttp: MyHttpService, public data: DataService) {
addIcons({ heart, home, moon, sunny, arrowBack });
  }

// Ran into the same problem as on movie-details and details, if you searched for a movie and then returned to Home, there was no way to display the trending movies again
// without restarting the app, due to the call for getTrending being in ngOnInit, meaning it wouldn't run again on navigating back to the page.
// If the key is empty (nothing in searchbox) it calls getTrending, otherwise it calls searchMovies.

  ionViewWillEnter() {
   this.key == ''
   this.getTrending();
    
  }


  // Calls myhttpservice.getTrending(), stores its results in the empty movie array defined above.
  getTrending() {
    this.myhttp.getTrending().subscribe((data: any) => {
      this.movies = data.results;
  });
}

// This sends the search query to the API, then whatever is found is returned to this.movies.
// Had to be changed to include an if statement, so that if search is clicked with an empty key value it calls getTrending.
searchMovies() {
  if (this.key == '') {
    this.getTrending();
  } else {
  this.myhttp.searchMovies(this.key).subscribe((data: any) => {
    this.movies = data.results;
  })
}
}

// This method gets called from the Home page when the user clicks on a movie poster.
// Stores selected movie's details into the DataService properties then navigates to the Movie Details page.
showMovieDetails(movie: any) {
  this.data.selectedMovieId = movie.id;
  this.data.selectedMovieTitle = movie.title;
  this.data.selectedMovieOverview = movie.overview;
  this.data.selectedMoviePoster = movie.poster_path;
  this.router.navigate(['movie-details']);
}

// Extra Functionality: Allows the user to sort either Today's Trending Movies or their search query by their vote score, which is already
// stored in the movies array and just needs to be called.
sortByRating() {
  this.movies.sort((movieA, movieB) => movieB.vote_average - movieA.vote_average);
}


}
