import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonCardContent, IonSearchbar, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../services/data';
import { MyHttpService } from '../services/my-http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, logoApple, settingsSharp, star, home } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonItem, IonToolbar, IonTitle, IonSearchbar, IonContent, IonButton, IonButtons, IonCard, IonCardContent, IonIcon, FormsModule, CommonModule, IonSearchbar, IonItem],
})
export class HomePage implements OnInit {
  movies: any[] = [];
  key: string = "";

  constructor(public router : Router, private myhttp: MyHttpService, public data: DataService) {
addIcons({ heart, logoApple, settingsSharp, star, home });
  }


  // This is how the results from the myHttpService call gets stored, into the previously empty array movies defined above.
  getTrending() {
    this.myhttp.getTrending().subscribe((data: any) => {
      this.movies = data.results;
  });
}

// This sends the search query to the API, then whatever is found is returned to this.movies.
searchMovies() {
  this.myhttp.searchMovies(this.key).subscribe((data: any) => {
    this.movies = data.results;
  })
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


sortByRating() {
  this.movies.sort((movieA, movieB) => movieB.vote_average - movieA.vote_average);
}

  // Implementing this method from the OnInit interface to run the getTrending method as soon as the page begins loading.
  ngOnInit() {
    this.getTrending();
}

}
