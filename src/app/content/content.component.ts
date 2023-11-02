import { Component, OnInit } from '@angular/core';
import { ArtsService } from '../arts.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControlName, FormGroup, FormControl } from '@angular/forms';

// interface IData{
//   id: number,
//   title: string
// }

// interface myArts{
//   pagination: object,
//   data: Array<IData>,
//   info: object,
//   config: object
// }

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  fields: string = "id,artist_display,image_id,title,description,api_link"

  pageEvent: PageEvent = new PageEvent;

  wishlist: Array<number> = []

  constructor(private artServices: ArtsService, private http: HttpClient) { }

  artsArray: Array<any> = []
  ngOnInit(): void {
    this.artServices.getArts(0, 10).subscribe((val: any) => {
      this.artsArray = val?.data
      // console.log(this.artsArray);
    });

  }

  // handlePagintation(pageIndex: Number, pageSize: Number): Observable<any>{
  //   return this.http.get(`https://api.artic.edu/api/v1/artists?page=${pageIndex}&limit=${pageSize}`);
  // }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageEvent = e;
    // const data = this.handlePagintation(this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe((val : any) => {
    //   this.artsArray = []
    //   // console.log(this.artsArray);
    //   this.artsArray = val.data
    //   console.log(this.artsArray);
    // });
    this.artServices.getArts(this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(val => {
      this.artsArray = []
      // console.log(this.artsArray);
      this.artsArray = val.data
      // console.log(this.artsArray);
    })
  }

  searchArt = new FormGroup({
    name: new FormControl('')
  });

  onSubmit() {
    const searchQuery = this.searchArt.controls['name'].value;
    this.http.get(`https://api.artic.edu/api/v1/artworks/search?q=${searchQuery}&fields=${this.fields}`).subscribe((val: any) => {
      this.artsArray = []
      // console.log(this.artsArray);
      this.artsArray = val.data;
      // let ids: string = "";
      // val.data.forEach((art:any) => ids += (art.id + ","))

      // this.http.get(`https://api.artic.edu/api/v1/artworks?ids=${ids}`).subscribe((art: any) => {
      //   this.artsArray = []
      //   this.artsArray = art.data
      // })
    })
    // console.log(this.searchArt.value);
  }

  // isSavedForLater(id: number): boolean {
  //   return !true;
  // }

  // onClick(id: string)
  // {
  //   this.artServices.saveClick(id)
  //   // console.log(id); 
  // }

  
  clickEvent(id: number): void {
    // const CHECK = JSON.parse(localStorage.getItem('wishlist') || '');
    // this.status =  (CHECK.filter((art: any) => art != id))? true : false
    // !this.status
    const index = this.wishlist.findIndex(item_id => item_id == id)
    if(index < 0){
      this.wishlist.push(id);
    } else {
      this.wishlist.splice(index, 1);
    }
    // console.log(this.wishlist);
    localStorage.setItem("wishlist", JSON.stringify(this.wishlist))
    // this.checkLocalStorage(id)
    // this.status = !this.status;
  }
  
  showProduct(id: string) {
    window.location.href = "./view?id=" + id;
    //this.artServices.view(id)
  }
  
  status(id:number) : boolean{
    if(this.wishlist.findIndex(item_id => item_id == id) < 0){
      return false;
    } else return true;
  }

  // status: boolean = false;
  checkLocalStorage(id: string) {
    const CHECK = JSON.parse(localStorage.getItem('wishlist') || '');
    // this.status =  (CHECK.filter((art: any) => art != id))? true : false
    // if (hello) {
    //   console.log(1);
      
    //   return !this.status
    // }
    // else {
    //   console.log(2);
      
    //   return !this.status
    // }
  }

}

//WE can reduce the api call by simpoly passing 