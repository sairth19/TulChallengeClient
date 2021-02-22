class Product{
    uuid: string;
    name: string;
    sku: string;
    description: string;

    constructor(uuid: string, name: string, sku: string, description: string){
        this.uuid = uuid
        this.name = name
        this.sku = sku
        this.description = description
    }
}

class AddProduct {
    productUUID: string
    quantity: number
    constructor(uuid: string, quantity: number) {
      this.productUUID = uuid
      this.quantity = quantity
    }

    add(){
      this.quantity += 1
    }

    remove(){
      if(this.quantity > 0) this.quantity -= 1
    }
  }

  export class AddProductRequest{
    cartUuid: string
    product: AddProduct

    constructor(uuid: string, product: AddProduct){
      this.cartUuid = uuid
      this.product = product
    }
  }
  
  class ProductCart {
    productUUID: string
    name: string
    quantity: number
  
    constructor(id: string, name: string, quantity: number ) {
      this.productUUID = id
      this.quantity = quantity
      this.name = name
    }
  }
  
  class Cart {
    uuid: string
    products: ProductCart[]
  
    constructor(uuid: string, products: ProductCart[]) {
      this.uuid = uuid
      this.products = products
    }
  }


  export {
      Product,
      AddProduct,
      ProductCart,
      Cart
  }