// Core Dependencies
import { RouterModule } from "@angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IndexRoutes } from "./index.routing";

import { ProductModule } from "./../product/product.module";

// Components
import { IndexComponent } from "./index.component";
import { LoginComponent } from "./login/login.component";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  imports: [
    CommonModule,
    ProductModule,
    SharedModule,
    RouterModule.forChild(IndexRoutes)
  ],
  declarations: [
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [NavbarComponent, FooterComponent, HeaderComponent],
  providers: []
})
export class IndexModule {}
