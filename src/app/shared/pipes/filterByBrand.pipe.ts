import { Pipe, PipeTransform } from "@angular/core";
import { containsElement } from "../../../../node_modules/@angular/animations/browser/src/render/shared";

@Pipe({
  name: "filterByBrand"
})
export class FilterByBrandPipe implements PipeTransform {
  transform(items: any, select?: any , ptype?: any , searchProductName?: any): any {
    console.log("ptype=" + ptype);
    console.log("select=" + select);
    console.log("searchProductName=" + searchProductName);

    let selectedPtypeAllItems = items;
    if (ptype === undefined && select === undefined && (searchProductName == "" || searchProductName ===undefined) ) {
      return null;
    }

    if (searchProductName != "") {

        selectedPtypeAllItems =  searchProductName
        ? selectedPtypeAllItems.filter(item => item["productName"].toLowerCase().includes(searchProductName.toLowerCase()))
        : selectedPtypeAllItems;        

    } 

    if ( ptype !== undefined ) {
      if (ptype !== "All") {
         selectedPtypeAllItems = selectedPtypeAllItems.filter(item => item["productPtype"] === ptype);
      } else {
        selectedPtypeAllItems = selectedPtypeAllItems;
      }

    if (select !== "All") {
      selectedPtypeAllItems =  select
        ? selectedPtypeAllItems.filter(item => item["productCategory"] === select)
        : selectedPtypeAllItems;
    } 

  }

  return selectedPtypeAllItems;
  }
}

// export class FilterByBrandPipe implements PipeTransform {
//   transform(items: any, select?: any): any {
//     if (select !== "All") {
//       return select
//         ? items.filter(item => item["productCategory"] === select)
//         : items;
//     } else {
//       return items;
//     }
//   }
// }

// export class FilterByBrandPipe implements PipeTransform {
//   transform(items: any, filterByBrand: {[key: string]: any }): Array<any> {
//     if (filterByBrand[0] !== "All" && filterByBrand[1] !== "All") {
//       console.log("1=" + filterByBrand[0]);
//       console.log("1=" + filterByBrand[1]);
//       return items.filter(item => {
//               const notMatchingField = Object.keys(filterByBrand)
//                                            .find(key => item[key] !== filterByBrand[key]);

//               return !notMatchingField; // true if matches all fields
//           });
//         } else {
//           return items;
//         }
//   }
// }
