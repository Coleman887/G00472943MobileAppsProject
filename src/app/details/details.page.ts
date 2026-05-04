import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonIcon, IonToolbar, IonCard, IonCardContent, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home, logoApple, settingsSharp, star} from 'ionicons/icons';
import { MyHttpService } from '../services/my-http';
import { DataService } from '../services/data';
import { ViewWillEnter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonButton, IonButtons]
})
export class DetailsPage implements OnInit, ViewWillEnter {
  movies: any[] = []
  personDetails: any = "";
  personMovieCredits: any[] = [];

  constructor(public router: Router, private myhttp: MyHttpService, public data: DataService) { 
      addIcons({ heart, home, logoApple, settingsSharp, star })
  }
// Added this method to both details.ts and movie-details.ts, was trying to make clicking on the
// filmography to bring you to that particular movies movie details, but this code in ngOnInit was making it keep the
// previous movies cast and character names, moving this logic to IonViewWillEnter will ensure that this data is collected
// every time the page is loaded, not just the first time, fixing the issue...
  ionViewWillEnter() {
    let id = this.data.selectedPersonId;
    this.getPersonDetails(id);
    this.getPersonMovieCredits(id);
  }

  getPersonDetails(id: number) {
    this.myhttp.getPersonDetails(id).subscribe((data: any) => {
      this.personDetails = data;
    })
  }

  getPersonMovieCredits(id: number) {
    this.myhttp.getPersonMovieCredits(id).subscribe((data: any) => {
      this.personMovieCredits = data.cast;
    })
  }

  showMovieDetails(movie: any) {
  this.data.selectedMovieId = movie.id;
  this.data.selectedMovieTitle = movie.title;
  this.data.selectedMovieOverview = movie.overview;
  this.data.selectedMoviePoster = movie.poster_path;
  this.router.navigate(['movie-details']);
  }

  ngOnInit() {
   
  }

}
