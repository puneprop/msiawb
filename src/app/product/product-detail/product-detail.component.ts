import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";
import { AuthService } from "../../shared/services/auth.service";
import { NgForm } from "@angular/forms";
import {Location} from '@angular/common';

import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from "ng2-toasty";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private _location: Location
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"]; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string) {
    this.spinnerService.show();
    const x = this.productService.getProductById(id);
    x.snapshotChanges().subscribe(product => {
      this.spinnerService.hide();
      const y = product.payload.toJSON() as Product;

      y["$key"] = id;
      this.product = y;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  modifyItem(productForm: NgForm) {
    console.log("here");
    const toastOptions: ToastOptions = {
      title: "Product Modification",
      msg:
        "product " + productForm.value["productName"] + " updated successfully",
      showClose: true,
      timeout: 5000,
      theme: "default"
    };

    // if (productForm.value["productImageUrl"] === undefined) {
    //   productForm.value["productImageUrl"] =
    //     "http://via.placeholder.com/640x360/007bff/ffffff";
    // }

    this.product.productName = productForm.value["productName"];
    //const date = productForm.value["productAdded"];

    this.productService.updateItem(this.product);

    //this.product = productForm.value;

    this.toastyService.success(toastOptions);
  }

  backClicked() {
    this._location.back();
}

}
