// 1. **Single Responsibility Principle (SRP):**
class Product {
	public name: string
	public price: number
	public description: string
	constructor(name: string, price: number, description: string) {
		this.name = name
		this.price = price
		this.description = description
	}
}

class ProductDB {
	saveProduct(product: Product) {
		// save the product to the db
	}
}

// 2. **Open/Closed Principle (OCP):**
interface IOrder {
	products: Product[]
	listProducts(): void
}

class Order implements IOrder {
	public products: Product[]
	constructor(products: Product[]) {
		this.products = products
	}

	public listProducts() {
		console.log(this.products)
	}
}

class FlatDiscountOrder extends Order implements IOrder {
	private discount: number
	constructor(products: Product[], discount: number) {
		super(products)
		this.discount = discount
	}

	listProducts() {
		this.products.forEach((product) => {
			const { price, name, description } = product
			const discountedPrice = price - this.discount // Corrected this line
			console.log({ name, description, price: discountedPrice })
		})
	}
}
class PercentageDiscountOrder extends Order implements IOrder {
	private discount: number
	constructor(products: Product[], discount: number) {
		super(products)
		this.discount = discount
	}

	listProducts() {
		this.products.forEach((product) => {
			const { price, name, description } = product
			const discountedPrice = price - this.discount * price // Corrected this line
			console.log({ name, description, price: discountedPrice })
		})
	}
}
class NoDiscountOrder extends Order implements IOrder {
	constructor(products: Product[]) {
		super(products)
	}

	listProducts() {
		console.log(this.products)
	}
}

// 3. **Liskov Substitution Principle (LSP):**
class User {
	public name: string
	public email: string
	public membership: Membership

	constructor(name: string, email: string, membership: Membership) {
		this.name = name
		this.email = email
		this.membership = membership
	}
}

class Membership {
	discount: number
	constructor(discount: number) {
		this.discount = discount
	}
}

class PremiumMembership extends Membership {
	constructor(discount: number) {
		super(discount)
	}
}

class BasicMembership extends Membership {
	constructor(discount: number) {
		super(discount)
	}
}

const basicMembership = new BasicMembership(1.5)
const basicUser = new User("john", "someemail@gmail.com", basicMembership)

// 4. **Interface Segregation Principle (ISP):**
interface IInventory {
	listProducts(): Product[]
	addProduct(product: Product): void
}

interface IProductDatabase {
	saveProduct(product: Product): void
}

class InventoryManagement implements IInventory {
	private products: Product[]
	private productDB: IProductDatabase

	constructor(products: Product[], productDB: IProductDatabase) {
		this.products = products
		this.productDB = productDB
	}

	listProducts(): Product[] {
		return this.products
	}

	addProduct(product: Product): void {
		this.productDB.saveProduct(product) // now using the injected db
	}
}

const productDB = new ProductDB()
const inventoryManagement = new InventoryManagement([], productDB)

interface IUserDB {
	saveUser(user: User): void
	getUser(name: string): User
}

class UserDB {
	private users: User[] = []
	saveUser(user: User): void {
		this.users.push(user)
	}
	getUser(name: string): User {
		const foundUser = this.users.find((user: User) => user.name === name)
		if (!foundUser) throw new Error(`no user found with name: ${name}`)
		return foundUser
	}
}

interface ICustomerManagement {
	saveUser(user: User): void
	getUser(name: string): User
}

class CustomerManagement implements ICustomerManagement {
	private userDB: UserDB
	constructor(userDB: UserDB) {
		this.userDB = userDB
	}

	saveUser(user: User): void {
		this.userDB.saveUser(user)
	}
	getUser(name: string): User {
		return this.userDB.getUser(name)
	}
}

interface IOrderManagement {
	listProducts(): void
}

class OrderManagement implements IOrderManagement {
	private order: Order
	constructor(order: Order) {
		this.order = order
	}

	public listProducts() {
		this.order.listProducts()
	}
}

// 5. **Dependency Inversion Principle (DIP):**
interface INotifier {}
