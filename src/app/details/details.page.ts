import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonIcon, IonToolbar, IonCard } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home, logoApple, settingsSharp, star} from 'ionicons/icons';
import { MyHttpService } from '../services/my-http';
import { DataService } from '../services/data';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard]
})
export class DetailsPage implements OnInit {

  personDetails: any = "";
  personMovieCredits: any[] = [];

  constructor(public router: Router, private myhttp: MyHttpService, public data: DataService) { 

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



  ngOnInit() {
    let id = this.data.selectedPersonId;
    this.getPersonDetails(id);
    this.getPersonMovieCredits(id);
  }

}
