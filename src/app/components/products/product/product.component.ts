import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AddProduct, AddProductRequest, Cart, Product, ProductCart } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  productList: Product[]
  seeingDetails = false
  selectedItem: Product
  productToAdd: AddProduct
  cart: Cart
  cartLoaded = false
  productsLoaded = false

  constructor(private service: ProductService) { }

  ngOnInit(){
    this.service.getProductList().subscribe(products => {
      this.productList = products
      this.productsLoaded = true
    })
    this.service.getUserCart("sairth19").subscribe(cart => {
      this.cart = cart
      this.cartLoaded = true
    })
  }

  selectProduct(product: Product){
    this.selectedItem = product
    this.seeingDetails = true
    const currentQuantity = this.cart.products.find(item => item.productUUID === this.selectedItem.uuid)?.quantity
    this.productToAdd = new AddProduct(product.uuid, currentQuantity ? currentQuantity : 0)    
  }

  editProduct(product: ProductCart){
    let toEdit = this.productList.find(item => item.uuid === product.productUUID)
    this.selectProduct(toEdit)
  }

  addToCart(){
    const data = new AddProductRequest(this.cart.uuid, this.productToAdd)
    this.seeingDetails = false
    this.selectedItem = null
    this.service.addProductToCart(data, "sairth19").subscribe(data => this.cart = data)
  }

  removeProduct(product: ProductCart){
    const data = new AddProductRequest(this.cart.uuid, new AddProduct(product.productUUID, product.quantity))
    this.service.removeProduct(data, "sairth19").subscribe(data => this.cart = data)
  }

  checkout(){
    this.cartLoaded = false
    this.service.checkout("sairth19").pipe(
      switchMap(() => this.service.getUserCart("sairth19"))
    ).subscribe(cart => {
      this.cart = cart
      this.cartLoaded = true
    })
  }
}


