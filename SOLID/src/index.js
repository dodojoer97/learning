"use strict";
// 1. **Single Responsibility Principle (SRP):**
class Product {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
class ProductDB {
    saveProduct(product) {
        // save the product to the db
    }
}
class Order {
    constructor(products) {
        this.products = products;
    }
    listProducts() {
        console.log(this.products);
    }
}
class FlatDiscountOrder extends Order {
    constructor(products, discount) {
        super(products);
        this.discount = discount;
    }
    listProducts() {
        this.products.forEach((product) => {
            const { price, name, description } = product;
            const dis;
            console.log({ name, description, price: price * this.discount });
        });
    }
}
