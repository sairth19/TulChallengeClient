import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddProductRequest, Cart, Product } from '../model/product';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProductList(): Observable<Product[]>{
    return this.http.get('http://localhost:8080/api/products').pipe(
      map((data: Product[]) => data.map(item => new Product(item.uuid, item.name, item.sku, item.description)))
    )
  }

  getUserCart(user: string): Observable<Cart>{
    return this.http.get(`http://localhost:8080/api/carts/${user}`).pipe(map((cart: Cart) => new Cart(cart.uuid, cart.products)))
  }

  addProductToCart(productToAdd: AddProductRequest, user: string): Observable<Cart>{
    return this.http.post(`http://localhost:8080/api/carts/${user}`, productToAdd).pipe(
      map((data: Cart) => new Cart(data.uuid, data.products))
    )
  }

  removeProduct(productToAdd: AddProductRequest, user: string): Observable<Cart>{
    return this.http.delete(`http://localhost:8080/api/carts/${user}/${productToAdd.product.productUUID}`).pipe(
      map((data: Cart) => new Cart(data.uuid, data.products))
    )
  }

  checkout(user: string): Observable<any>{
    return this.http.post(`http://localhost:8080/api/carts/${user}/checkout`, {})
  }
}
