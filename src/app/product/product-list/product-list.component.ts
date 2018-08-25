import { Component, OnInit } from "@angular/core";
import { ToastyConfig, ToastOptions, ToastyService } from "ng2-toasty";
import { Product } from "../../shared/models/product";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  productList: Product[];

  productObject: Product = new Product;

  searchProductName = "";
  
  //ptypes = ["All", "Surgicals", "Pharmaceuticals", "PHC Range"];
  ptypes = ["All", "Surgicals", "Allopathic", "Ayurvedic"];

  // tslint:disable-next-line:max-line-length
  brands = ["All", "Anesthesia Products & Equipment", "Rehabilitation Products & Aids", "Surgical Instruments (General)", "Syringe & Needle Destroyer", "Hospital Holloware - Plastic", "Surgical Needles", "Hospital Holloware-Stainles Steel", "Suction Units", "Surgical Rubber Goods", "Hospital & Medical Clothing", "Hospital & Medical Furniture", "Sterilization Equipment & Accessories", "Pathology Lab Items", "Diagnostic Instruments", "Laryngoscopes", "Medical Disposables"];

  // tslint:disable-next-line:max-line-length
  allopathicbrands = ["All", "Tablets", "Capsules", "Softgel", "Injections", "Syrups and Pediatric Range", "Ointment", "Dental", "Protein Power", "Cardion and Diabetic"];
  ayurvedicbrands = ["All", "Digestion", "Immunity", "Men's health", "Women's health", "Medicines", "Sleep & insomnia", "Mind & Emotions", "Children' health", "Brain and memory", "Wellness & anti-aging", "Vitality", "Fever, flu & cough", "Allergy and pollution", "Muscle & Joint", "Detox & clense", "Single herbs", "Food & beverage", "Bath & body", "Youthful skin", "Massage oils"];

  // tslint:disable-next-line:max-line-length
  //allbrands = ["All", "Anesthesia Products & Equipment", "Rehabilitation Products & Aids", "Surgical Instruments (General)", "Syringe & Needle Destroyer", "Hospital Holloware - Plastic", "Surgical Needles", "Hospital Holloware-Stainles Steel", "Suction Units", "Surgical Rubber Goods", "Hospital & Medical Clothing", "Hospital & Medical Furniture", "Sterilization Equipment & Accessories", "Pathology Lab Items", "Diagnostic Instruments", "Laryngoscopes", "Medical Disposables", "Oral Care", "Ayurvedic", "ANESTHESIA", "Hospital Holloware", "Surgical Instruments", "Sterilling Equipment", "Hospital Furniture Instruments", "Diagonestic  Material Instruments", "Hospital Garments Apparels", "Diagonostic Equipment", "Rehabilitation Products", "Cold Chain Equipment", "Disposable"];
  
  allbrands = ["All", "Anesthesia Products & Equipment", "Rehabilitation Products & Aids", "Surgical Instruments (General)", "Syringe & Needle Destroyer", "Hospital Holloware - Plastic", "Surgical Needles", "Hospital Holloware-Stainles Steel", "Suction Units", "Surgical Rubber Goods", "Hospital & Medical Clothing", "Hospital & Medical Furniture", "Sterilization Equipment & Accessories", "Pathology Lab Items", "Diagnostic Instruments", "Laryngoscopes", "Medical Disposables", "Tablets", "Capsules", "Softgel", "Injections", "Syrups and Pediatric Range", "Ointment", "Dental", "Protein Power", "Cardion and Diabetic","Digestion", "Immunity", "Men's health", "Women's health", "Medicines", "Sleep & insomnia", "Mind & Emotions", "Children' health", "Brain and memory", "Wellness & anti-aging", "Vitality", "Fever, flu & cough", "Allergy and pollution", "Muscle & Joint", "Detox & clense", "Single herbs", "Food & beverage", "Bath & body", "Youthful skin", "Massage oils"];

  selectedPtype: "All";

  selectedBrand: "All";

  selectedPharmaBrand: "All";

  psesurgicalbrands = ["All", "ANESTHESIA", "Hospital Holloware", "Surgical Instruments", "Sterilling Equipment", "Hospital Furniture Instruments", "Diagonestic  Material Instruments", "Hospital Garments Apparels", "Diagonostic Equipment", "Rehabilitation Products", "Cold Chain Equipment", "Disposable"];

  psepharmabrands = ["All", "Oral Care"];

  selectedpseSBrand: "All";

  selectedpsePBrand: "All";


  productFilter: any;

  //productType:string = this.selectedPtype;

  page = 1;
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService,
    private toastyConfig: ToastyConfig,
    private toastyService: ToastyService
  ) {
    this.productFilter = {selectedBrand: "All", selectedPtype: "All"};
  }

  ngOnInit() {
    console.log("init list");
    this.getAllProducts();
  }

  getAllProducts() {
    this.spinnerService.show();
    const x = this.productService.getProducts();
    x.snapshotChanges().subscribe(product => {
      this.spinnerService.hide();
      this.productList = [];
      product.forEach(element => {
        const y = element.payload.toJSON();
        y["$key"] = element.key;
        // let tprod: Product = y as Product; 
        // console.log("{$key: '" + tprod.$key + "', productId:'"+tprod.productId + "', productPtype:'"+tprod.productPtype + "', productCategory:'"+tprod.productCategory+ "', productName:'"+tprod.productName+ "', productDescription:'"+tprod.productDescription+ "', productImageUrl:'"+tprod.productImageUrl+ "', productPrice:'"+tprod.productPrice+ "', productQuantity:'"+tprod.productQuatity+ "', productSeller:'"+tprod.productSeller +"' } ,");
        this.productList.push(y as Product);
      });
    });
  }

  setProductObject(product: Product) {
    console.log(product);
    if(product !=null)
    this.productObject = product;
    else
    this.productObject = new Product;
  }

  removeProduct(key: string) {
    console.log(key);
    this.productService.deleteItem(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
