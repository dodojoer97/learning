class Car {
	private engine: string
	private wheels: number
	private color: string

	constructor(builder: CarBuilder) {
		this.engine = builder.engine
		this.wheels = builder.wheels
		this.color = builder.color
	}

	public getSpecs(): string {
		return `Engine: ${this.engine}, Wheels: ${this.wheels}, Color: ${this.color}`
	}
}

class CarBuilder {
	public engine: string
	public wheels: number
	public color: string

	constructor(engine: string) {
		this.engine = engine // Engine is a mandatory parameter
	}

	public setWheels(wheels: number): CarBuilder {
		this.wheels = wheels
		return this
	}

	public setColor(color: string): CarBuilder {
		this.color = color
		return this
	}

	public build(): Car {
		return new Car(this)
	}
}

// Usage:
const carBuilder = new CarBuilder("V8")
const car = carBuilder.setWheels(4).setColor("red").build()
console.log(car.getSpecs()) // Output: Engine: V8, Wheels: 4, Color: red
