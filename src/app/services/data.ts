import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root',
})
export class DataService {

// Importing Storage and initialising it in the constructor, both the Ionic and localStorage are initialised here
  constructor(private storage: Storage) {
    this.init();
    this.initializeTheme();
  }
// Creates an instance of the storage
  async init() {
    this.storage = await this.storage.create();
  }

// These are the properties used to share needed data across the pages of the application
  selectedMovieTitle: string = "";
  selectedMovieId: number = 0;
  selectedPersonId: number = 0;
  favouritesList: any[] = [];
  selectedMovieOverview: string = "";
  selectedMoviePoster: string = "";
  theme: string = 'dark';

// This method will 'push' the selected movie to the favouritesList array and save it to storage.
async addFavourite(movie: any) { 
    this.favouritesList.push(movie);
    await this.storage.set('favourites', this.favouritesList);
  }

// Using this method to cleanly loop through the favouritesList array, and filters the array keeping the movies that don't match the id.
async removeFavourite(movie: any) { 
    this.favouritesList = this.favouritesList.filter(item => item.id !== movie.id); 
    await this.storage.set('favourites', this.favouritesList);
  }

// Method with regular for loop, returning a boolean value depending on if the movie in the favouritesList at the [i]th element matches the movie currenty being displayed.
    isFavourite(movieId: number) {
    for (let i = 0; i < this.favouritesList.length; i++) {
      if (this.favouritesList[i].id == movieId) {
          return true;
      }
    }
    return false;
  }

// Method used to load the favourites from storage at the beginning of the application. Initially caused the program to fail to load anything, but after adding the null check
// it's working as intended.
  async storedFavourites() {
    let stored = await this.storage.get('favourites');
    if (stored != null) {
      this.favouritesList = stored;
    }
  }
// This method fetches the currentTheme from localStorage, if it is null sets it to dark and applies it.
  initializeTheme() {
    let currentTheme = localStorage.getItem('theme');

    if (!currentTheme) {
      currentTheme = 'dark';
      localStorage.setItem('theme', currentTheme);

    }
    this.applyTheme(currentTheme);
  }

// This method gets the currentTheme from storage, defaults to dark if nothing is stored.
// If the theme is dark, newTheme is set to light and vice-versa...
// Then applies the new theme and saves it to storage.  
  toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

// Updates the theme so the icon will change, then toggles the dark mode class on or off depending on what theme is selected.
// This is what the .html pages reads (data.theme) to know which icon to show depending on which mode it's in.
  applyTheme(theme: string) {
    this.theme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.classList.toggle('ion-palette-dark', theme === 'dark');
  }
}










