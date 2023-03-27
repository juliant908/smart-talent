export interface Hotel {
  id?: number,
  name: string,
  description: string,
  location: string,
  showHotel: boolean,
  stars: number,
  image: string,
  rooms: Array<any>
}
