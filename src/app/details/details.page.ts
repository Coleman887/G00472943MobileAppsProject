import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonIcon, IonToolbar, IonCard, IonCardContent, IonButton, IonButtons, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home, moon, sunny } from 'ionicons/icons';
import { MyHttpService } from '../services/my-http';
import { DataService } from '../services/data';
import { ViewWillEnter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonIcon, IonItem, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonButton, IonButtons]
})
export class DetailsPage implements ViewWillEnter {
  personDetails: any = "";
  personMovieCredits: any[] = [];

  constructor(public router: Router, private myhttp: MyHttpService, public data: DataService) { 
      addIcons({ heart, home, moon, sunny })
  }
// Added this method to both details.ts and movie-details.ts, was trying to make clicking on the
// filmography to bring you to that particular movie's movie details, but this code in ngOnInit was making it keep the
// previous movies cast and character names, moving this logic to IonViewWillEnter will ensure that this data is collected
// every time the page is loaded, not just the first time, fixing the issue...
  ionViewWillEnter() {
    let id = this.data.selectedPersonId;
    this.getPersonDetails(id);
    this.getPersonMovieCredits(id);
  }

// Fills the personDetails variable with the results of the getPersonDetails API call, using their ID to locate the data.
  getPersonDetails(id: number) {
    this.myhttp.getPersonDetails(id).subscribe((data: any) => {
      this.personDetails = data;
    })
  }

// Fills the personMovieCredits array with the results of the getPersonMovieCredits API call, used in the for loop to display the filmography for the
// selected person on the .html page.
  getPersonMovieCredits(id: number) {
    this.myhttp.getPersonMovieCredits(id).subscribe((data: any) => {
      this.personMovieCredits = data.cast;
    })
  }
 // Called when a movie is clicked on in the filmography section, stores its details and navigates to the movie-details page.
  showMovieDetails(movie: any) {
  this.data.selectedMovieId = movie.id;
  this.data.selectedMovieTitle = movie.title;
  this.data.selectedMovieOverview = movie.overview;
  this.data.selectedMoviePoster = movie.poster_path;
  this.router.navigate(['movie-details']);
  }

}
