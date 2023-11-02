import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MainComponent } from './main/main.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "wishlist",
    component: WishlistComponent
  },
  {
    path: "view",
    component: ViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
