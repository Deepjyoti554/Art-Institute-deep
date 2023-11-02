import { Component, OnInit, } from '@angular/core';
import { ArtsService } from '../arts.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  constructor(private artService: ArtsService, private http: HttpClient, private route: ActivatedRoute) { }
  // fields = "id,artist_display,image_id,title,description,api_link";
  viewItem: any = {};
  id: string = "";
  
  ngOnInit(): void {
    // let viewId = this.artService.view
    // console.log(viewId);
    
    // this.http.get(`https://api.artic.edu/api/v1/artworks/${viewId}&fields=${this.fields}`).subscribe(
      //   (val: any) => {
        //     this.viewArray = []
        //     this.viewArray = val.data
        //     console.log(this.viewArray);
        
        //   }
        // )
    this.route.queryParams.subscribe(params => {
      this.id = String(params['id']);
      this.artService.view(this.id).subscribe(
        data => {
          // console.log(data["data"]);
          this.viewItem = data["data"]
          console.log(this.viewItem);
        }
      );
    })

  }
}
