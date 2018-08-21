import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from "ng2-toasty";
import { Component, OnInit, Input, ElementRef, Renderer2 } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";
import { FormGroup, FormControl, Validators, FormBuilder ,ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { FormsModule } from '@angular/forms';

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

  noSuccessValidation: FormControl;


  product: Product = new Product();

  addProductForm: FormGroup;

  constructor(
    private productService: ProductService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
    ,private fb: FormBuilder
    , private _el: ElementRef, private _r: Renderer2
  ) {
    console.log('in constructor');
    this.toastyConfig.theme = "material";
    // this.addProductForm = fb.group({
    //   'productPtype': [null, Validators.required],
    //   'productCategory': [null, Validators.required],
    //   'productName': [null, Validators.minLength(4)],
    //   'productDescription': [null, Validators.minLength(4)],
    // });
    //this.noSuccessValidation = new FormControl('', Validators.required);
  }

  hide(){
    console.log('in hide');
    //this.addProductForm.reset()
        // Each control (input, select, textarea, etc) gets added as a property of the form.
    // The form has other built-in properties as well. However it's easy to filter those out,
    // because the Angular team has chosen to prefix each one with a dollar sign.
    // So, we just avoid those properties that begin with a dollar sign.
    let controlNames = Object.keys(this.addProductForm).filter(key => key.indexOf('$') !== 0);

    // Set each control back to undefined. This is the only way to clear validation messages.
    // Calling `form.$setPristine()` won't do it (even though you wish it would).
    for (let name of controlNames) {
      console.log(name);
        // let control = this.addProductForm[name];
        // control.$setViewValue(undefined);
    }
    this.addProductForm.markAsPristine;
    this.addProductForm.markAsUntouched;
  }

  ngOnInit() {
    this.product = this.productObject;
    console.log('in init');
  }

  submit(form: any) {
    const success = this._el.nativeElement.querySelectorAll('.counter-success');
    const danger = this._el.nativeElement.querySelectorAll('.counter-danger');
    const textSuccess = this._el.nativeElement.querySelectorAll('.text-success');
    const textDanger = this._el.nativeElement.querySelectorAll('.text-danger');
    success.forEach((element: any) => {
        this._r.removeClass(element, 'counter-success');
    });
    danger.forEach((element: any) => {
        this._r.removeClass(element, 'counter-danger');
    });
    textSuccess.forEach((element: any) => {
        this._r.setStyle(element, 'visibility', 'hidden');
    });
    textDanger.forEach((element: any) => {
        this._r.setStyle(element, 'visibility', 'hidden');
    });
    form.reset();
}

  createProductNew(productForm: NgForm,product: Product) {
    console.log("in create  line "+product.$key);
    if (product.$key === undefined) {
      console.log("product.$key "+product.$key);
    }
    if (product.$key === undefined){
      this.createProduct(product);
    }else{
      this.modifyProduct(product);
    }
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
    //if (product.productImageUrl === undefined) {
    if (product.productImageUrl === undefined) {
      product.productImageUrl =
        "../../assets/img/noimage.png";
    } else if(!product.productImageUrl.includes("../../assets/")){
      product.productImageUrl = "../../assets/" + product.productImageUrl ;
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
        "../../assets/img/noimage.png";
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
    //if (product.productImageUrl === undefined) {
    if (product.productImageUrl === undefined) {
      product.productImageUrl =
        "../../assets/img/noimage.png";
    }else if(!product.productImageUrl.includes("../../assets/")){
        product.productImageUrl = "../../assets/" + product.productImageUrl ;
    }

    product.favourite = false;

    const date = product.productAdded;

    this.productService.updateItem(product);

    $("#exampleModalLong").modal("hide");

    this.toastyService.success(toastOptions);
  }
}
