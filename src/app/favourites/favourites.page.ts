import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../services/data';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonCardContent, CommonModule, FormsModule, IonCard]
})

export class FavouritesPage {

  constructor(public router: Router, public data: DataService) { 

  }

// Once the details button is clicked on a favourite movie, uses DataService to stores the movie's info and navigates to it's
// movie-details page
showMovieDetails(movie: any) {
  this.data.selectedMovieId = movie.id;
  this.data.selectedMovieTitle = movie.title;
  this.data.selectedMovieOverview = movie.overview;
  this.data.selectedMoviePoster = movie.poster_path;
  this.router.navigate(['movie-details']);
  }

}
