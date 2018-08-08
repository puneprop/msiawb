import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from "ng2-toasty";
import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";

declare var $: any;
declare var require: any;
const shortId = require("shortid");
const moment = require("moment");

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {

  @Input() productType: string;
  @Input() productCategory: string;
  @Input() productObject: Product;
  @Input() ptypes: any;
  @Input() brands: any;
  @Input() pharmabrands: any;
  @Input() psesurgicalbrands: any;
  @Input() allbrands: any;

  product: Product = new Product();
  constructor(
    private productService: ProductService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = "material";
  }

  ngOnInit() {
    this.product = this.productObject;
  }

  createProductNew(product: Product) {
    console.log("in create  line "+product.$key);
    // if (product.$key === undefined){
    //   this.createProduct(product);
    // }else{
    //   this.modifyProduct(product);
    // }
  }

  createProduct(product: Product) {
    const toastOptions: ToastOptions = {
      title: "Product Creation",
      msg:
        "product " + product.productName + "is added successfully",
      showClose: true,
      timeout: 5000,
      theme: "default"
    };
    product.productId = "PROD_" + shortId.generate();
    product.productAdded = moment().unix();
    product.ratings = Math.floor(Math.random() * 5 + 1);
    if (product.productImageUrl === undefined) {
      product.productImageUrl =
        "http://via.placeholder.com/640x360/007bff/ffffff";
    }

    product.favourite = false;

    const date = product.productAdded;

    this.productService.createProduct(product);

    this.product = new Product();

    $("#exampleModalLong").modal("hide");

    this.toastyService.success(toastOptions);
    
  }

  createProductOriginal(productForm: NgForm) {
    const toastOptions: ToastOptions = {
      title: "Product Creation",
      msg:
        "product " + productForm.value["productName"] + "is added successfully",
      showClose: true,
      timeout: 5000,
      theme: "default"
    };
    productForm.value["productId"] = "PROD_" + shortId.generate();
    productForm.value["productAdded"] = moment().unix();
    productForm.value["ratings"] = Math.floor(Math.random() * 5 + 1);
    if (productForm.value["productImageUrl"] === undefined) {
      productForm.value["productImageUrl"] =
        "http://via.placeholder.com/640x360/007bff/ffffff";
    }

    productForm.value["favourite"] = false;

    const date = productForm.value["productAdded"];

   // this.productService.createProduct(productForm.value);

    this.product = new Product();

    $("#exampleModalLong").modal("hide");

    this.toastyService.success(toastOptions);
  }

  modifyProduct(product: Product) {
    const toastOptions: ToastOptions = {
      title: "Product Modification",
      msg:
        "product " + product.productName + "is modified successfully",
      showClose: true,
      timeout: 5000,
      theme: "default"
    };
    product.productAdded = moment().unix();
    product.ratings = Math.floor(Math.random() * 5 + 1);
    if (product.productImageUrl === undefined) {
      product.productImageUrl =
        "http://via.placeholder.com/640x360/007bff/ffffff";
    }

    product.favourite = false;

    const date = product.productAdded;

    this.productService.updateItem(product);

    $("#exampleModalLong").modal("hide");

    this.toastyService.success(toastOptions);
  }
}
