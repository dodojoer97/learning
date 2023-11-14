"use strict";
// ### Exercise 1: User Account Builder
class User {
    constructor(builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.phoneNumber = builder.phoneNumber;
        this.address = builder.address;
    }
    getSpecs() {
        return `First name: ${this.firstName}, LastName: ${this.lastName}, email: ${this.email}, phone number: ${this.phoneNumber}, Address: ${this.address}`;
    }
}
class UserBuilder {
    constructor(firstName, email) {
        this.firstName = firstName;
        this.email = email;
    }
    setLastName(lastName) {
        this.lastName = lastName;
        return this;
    }
    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }
    setAddress(address) {
        this.address = address;
        return this;
    }
    build() {
        return new User(this);
    }
}
// Usage
const userBuilder = new UserBuilder("john", "some.email@gmail.com");
const user = userBuilder
    .setLastName("doe")
    .setPhoneNumber("1234455")
    .setAddress("building a")
    .build();
console.log(user.getSpecs());
