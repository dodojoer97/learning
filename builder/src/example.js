"use strict";
class Car {
    constructor(builder) {
        this.engine = builder.engine;
        this.wheels = builder.wheels;
        this.color = builder.color;
    }
    getSpecs() {
        return `Engine: ${this.engine}, Wheels: ${this.wheels}, Color: ${this.color}`;
    }
}
class CarBuilder {
    constructor(engine) {
        this.engine = engine; // Engine is a mandatory parameter
    }
    setWheels(wheels) {
        this.wheels = wheels;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    build() {
        return new Car(this);
    }
}
// Usage:
const carBuilder = new CarBuilder("V8");
const car = carBuilder.setWheels(4).setColor("red").build();
console.log(car.getSpecs()); // Output: Engine: V8, Wheels: 4, Color: red
