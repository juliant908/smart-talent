import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelCardComponent } from './containers/hotel-card/hotel-card.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HotelFormComponent } from './containers/hotel-form/hotel-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HotelsComponent } from './containers/hotels/hotels.component';
import { HomeComponent } from './containers/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    HotelCardComponent,
    HotelFormComponent,
    SearchFormComponent,
    NavBarComponent,
    HotelsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientTestingModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [HotelCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
