import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, addDoc, collection, setDoc, query, where, getDocs } from "@angular/fire/firestore"
import { Observable } from 'rxjs';
import { Hotel } from 'src/interfaces/hotel.interface';
import { doc } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http'
import { asyncData, asyncError } from 'src/testing/async-observable-helpers.config';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3PI6QuaTLjW7wzhblT7oW5z0TUymyTFU",
  authDomain: "hotel-app-backend.firebaseapp.com",
  projectId: "hotel-app-backend",
  storageBucket: "hotel-app-backend.appspot.com",
  messagingSenderId: "671943706078",
  appId: "1:671943706078:web:35d8f990d13ead2993894f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
@Injectable({
  providedIn: 'root'
})
export class HotelAppService {

  hotelArray: any = [];
  roomsArray: any = [];
  filteredHotels: any = [];
  search: boolean = false
  constructor(public firestore: Firestore,
    public http: HttpClient ) { }

  public async getHotels(hotels: any = 'hotels'): Promise<any>{
    this.hotelArray = []
    const searchQuery = query(collection(this.firestore, hotels), where("show", '==', true))
    const querySnapshot = await getDocs(searchQuery);
    querySnapshot.forEach((hotel: any) => {
      const oneHotel = hotel?.data();
      this.hotelArray.push(oneHotel)
    })
    return this.hotelArray;
  }

  public async getRooms(hotel: string): Promise<any>{
    this.roomsArray = []
    const subcollectionSnapshot = await getDocs(collection(this.firestore, 'hotels'));
    subcollectionSnapshot.forEach((room: any) => {
      const oneRoom = room?.data();
      this.roomsArray.push(oneRoom)
    })
    return this.roomsArray;
  }

  public getUserInfo(user: any): Observable<any>{
    return asyncData({isAdmin: false})
  }

  addHotelBodyGenerator(hotel: Hotel): any {
    const hotelBody = {
      name: hotel.name,
      description: hotel.description,
      location: hotel.location,
      showHotel: hotel.showHotel,
      stars: hotel.stars,
      image: hotel.image
    }
    return hotelBody
  }

  public addHotelandRooms(hotel: Hotel): Promise<any> {
    return setDoc(doc(this.firestore, 'hotels', hotel.name), this.addHotelBodyGenerator(hotel))
      // .then(async (res: any) =>  {
      //   for (let i = 0; i < hotel.rooms.length; i++) {
      //     const room = hotel.rooms
      //     setDoc(doc(this.firestore, `${hotel.name}/rooms`, room[i].name), room)
      //   }
      //   alert('Hotel agregado con éxito')
      //   // this.getHotels()
      // })
      // .catch((err: any) => {
      //   alert('Ha ocurrido un error, intente de nuevo más tarde')
      // });
  }

  public getFilteredHotels(location: any): any {
    if (this.search) {
      this.getHotels()
        .then((res: any) => {
          this.filteredHotels = res?.filter((hotel: any) => hotel.location === location);
        })
        .catch((err: any) => {
          alert(err);
        })
        return this.filteredHotels
      }
  }

  public sendEmail(email: string): void {
    alert('Email enviado con éxito')
  }
}
