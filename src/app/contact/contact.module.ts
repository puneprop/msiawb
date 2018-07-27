import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ContactRoutes } from "./contact.routing";

import { ContactComponent } from "./contact.component";
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(ContactRoutes)
  ],
  declarations: [
    ContactComponent
  ]
})
export class ContactModule { }
