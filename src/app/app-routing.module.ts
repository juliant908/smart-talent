import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HotelsComponent } from './containers/hotels/hotels.component';
import { HomeComponent } from './containers/home/home.component';
import { HotelFormComponent } from './containers/hotel-form/hotel-form.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: AppComponent
  },
  {
    path: 'hotels/:name',
    component: HotelsComponent,
  },
  {
    path: 'edit',
    component: HotelFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
