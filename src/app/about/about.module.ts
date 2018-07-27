import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AboutRoutes } from "./about.routing";

import { AboutComponent } from "./about.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AboutRoutes)
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
