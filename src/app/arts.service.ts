import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

// interface IData {
//   id: number,
//   title: string
// }
// interface MyArts {
//   pagination: object,
//   data: Array<IData>,
//   info: object,
//   config: object
// }

@Injectable({
  providedIn: 'root'
})

export class ArtsService {
  wishlist: Array<any> = []

  fields: string = "id,artist_display,image_id,title,description,api_link"

  constructor(private http: HttpClient) { }

  getArts(pageIndex: Number, pageSize: Number): Observable<any> {
    return this.http.get(`https://api.artic.edu/api/v1/artworks?page=${pageIndex}&limit=${pageSize}&fields=${this.fields}`);
  }
  
  saveClick(id: string){
    this.wishlist.push(id)
    localStorage.setItem("wishlist", JSON.stringify(this.wishlist))   
  }

  view(id: string)
  {
    let viewId = id
    // console.log(viewId);
    //return this.http.get(`https://api.artic.edu/api/v1/artworks/${viewId}&fields=${this.fields}`);
    return this.http.get<any>(`https://api.artic.edu/api/v1/artworks/${viewId}`);
  }
}

// return this.http.get<any>("https://api.artic.edu/api/v1/artworks")