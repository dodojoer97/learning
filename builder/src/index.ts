// ### Exercise 1: User Account Builder
class User {
	public firstName: string
	public lastName: string
	public email: string
	public phoneNumber: string
	public address: string
	constructor(builder: UserBuilder) {
		this.firstName = builder.firstName
		this.lastName = builder.lastName
		this.email = builder.email
		this.phoneNumber = builder.phoneNumber
		this.address = builder.address
	}

	public getSpecs(): string {
		return `First name: ${this.firstName}, LastName: ${this.lastName}, email: ${this.email}, phone number: ${this.phoneNumber}, Address: ${this.address}`
	}
}

class UserBuilder {
	public firstName: string
	public lastName: string
	public email: string
	public phoneNumber: string
	public address: string
	constructor(firstName: string, email: string) {
		this.firstName = firstName
		this.email = email
	}

	public setLastName(lastName: string): UserBuilder {
		this.lastName = lastName
		return this
	}
	public setPhoneNumber(phoneNumber: string): UserBuilder {
		this.phoneNumber = phoneNumber
		return this
	}
	public setAddress(address: string): UserBuilder {
		this.address = address
		return this
	}

	public build(): User {
		return new User(this)
	}
}

// Usage
const userBuilder = new UserBuilder("john", "some.email@gmail.com")
const user = userBuilder
	.setLastName("doe")
	.setPhoneNumber("1234455")
	.setAddress("building a")
	.build()
console.log(user.getSpecs())

// ### Exercise 2: Pizza Builder

class Pizza {
	public crust: "regular" | "thin" | "stuffed"
	public size: "small" | "medium" | "large"
	public toppings?: string[]
	constructor(builder: PizzaBuilder) {
		this.crust = builder.crust
		this.size = builder.size
		this.toppings = builder.toppings
	}

	public getDescription(): string {
		return `A ${this.size} pizza with ${this.crust} crust and toppings: ${
			this.toppings ? this.toppings.join(", ") : "none"
		}`
	}
}

class PizzaBuilder {
	public crust: "regular" | "thin" | "stuffed"
	public size: "small" | "medium" | "large"
	public toppings?: string[]
	constructor(
		crust: "regular" | "thin" | "stuffed",
		size: "small" | "medium" | "large"
	) {
		this.crust = crust
		this.size = size
	}

	public setToppings(toppings: string[]): PizzaBuilder {
		this.toppings = toppings
		return this
	}

	public build(): Pizza {
		return new Pizza(this)
	}
}

// Usage
const pizzaBuilder = new PizzaBuilder("thin", "medium")
const pizza = pizzaBuilder.setToppings(["onions"]).build()

// ### Exercise 3: HTML Element Builder
interface IHTMLBuilder {
	tagName: string
	content: string
	attributes: { [key: string]: string }
	nestedElementes: HTMLElementClass[]
	// ... other properties/methods related to building HTML elements
}

interface IAttributeSetter {
	setAttributes(): void
}

interface IContentSetter {
	setContent(): void
}

interface IElementNester {
	nestElements(): void
}

class HTMLElementClass {
	public tagName: string

	constructor(builder: HTMLBuilder) {
		// Depend on abstraction, not on concretion
		this.tagName = builder.tagName
	}
}

class HTMLBuilder {
	public tagName: string
}
