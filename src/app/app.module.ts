import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { IndexModule } from "./index/index.module";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";
import { SharedModule } from "./shared/shared.module";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutModule } from "./about/about.module";
import { ContactModule } from "./contact/contact.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IndexModule,
    ProductModule,
    UserModule,
    SharedModule,
    AboutModule,
    ContactModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
