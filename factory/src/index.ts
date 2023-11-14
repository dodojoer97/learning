// 1. **Basic Shapes Factory**:
interface IShape {
	draw(): void
}

class Shape implements IShape {
	draw(): void {
		console.log("draw shape")
	}
}

class Circle extends Shape {
	constructor() {
		super()
	}
}
class Square extends Shape {
	constructor() {
		super()
	}
}
class Triangle extends Shape {
	constructor() {
		super()
	}
}

abstract class ShapeFactory {
	abstract createShape(): Shape
}

class CircleFactory extends ShapeFactory {
	constructor() {
		super()
	}

	createShape(): Circle {
		return new Circle()
	}
}
class SquareFactory extends ShapeFactory {
	constructor() {
		super()
	}

	createShape(): Square {
		return new Square()
	}
}
class TriangleFactory extends ShapeFactory {
	constructor() {
		super()
	}

	createShape(): Triangle {
		return new Triangle()
	}
}

// 2. **Database Connection Factory**:
interface DatabaseConnection {
	connect(): void
	disconnect(): void
}

class Database implements DatabaseConnection {
	connect(): void {}
	disconnect(): void {}
}

abstract class DatabaseFactory implements DatabaseConnection {
	abstract connect(): void
	abstract disconnect(): void
}

class MySQLConnection {
	connect(): void {
		console.log("connect to mysql")
	}
	disconnect(): void {
		console.log("disconnect from mysql")
	}
}

class MongoDBConnection {
	connect(): void {
		console.log("connect to mongodb")
	}
	disconnect(): void {
		console.log("disconnect from mongodb")
	}
}

class PostgreSQLConnection {
	connect(): void {
		console.log("connect to postgres")
	}
	disconnect(): void {
		console.log("disconnect from postgres")
	}
}
