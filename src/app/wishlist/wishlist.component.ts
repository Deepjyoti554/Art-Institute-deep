  import { Component, OnInit} from '@angular/core';
  import { HttpClient} from '@angular/common/http';
  import { ArtsService } from '../arts.service';

  @Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css']
  })
  export class WishlistComponent implements OnInit{
    constructor(private http : HttpClient, private api: ArtsService){}
    myWishlist: Array<any> = []

    ngOnInit(): void{
      let tempArray: any = localStorage.getItem("wishlist");
      
      if(tempArray){
        const wishlistArray = JSON.parse(tempArray)
        wishlistArray.forEach((id: string) => {
          let artItem = this.http.get(`https://api.artic.edu/api/v1/artworks/${id}`).subscribe(
            (val: any) => {
              this.myWishlist.push(val.data)
            }
          )
          
        });
      }
      console.log(this.myWishlist);
    }
    
  }
