type Admin = {
  name: string;
  privileges: string[]
}

type Employee = {
  name: string;
  startDate: Date
}

type ElevatedEmployee = Admin & Employee

const employee1: ElevatedEmployee = {
  name: 's',
  privileges: ['s'],
  startDate: new Date()
}

type Combinable = string | number
type Numeric = number | boolean
type Universal = Combinable & Numeric

function isString(a: Combinable): a is string {
  return typeof a === "string"
}

// FUnction overloads
function add(a: number, b : number): number
function add(a: string, b : string): string
function add(a: Combinable, b : Combinable) {
  if(isString(a) || isString(b)) {
    return a.toString() + b.toString()
  }

  return a + b
}

const result = add('ho', 'doe')
result.split(' ')

// Optional chainging

const fetchedUSerData = {
  id: 'asd',
  name: 'ads',
  // job: {title: 'some', description: 'some desc'}
}

// console.log("title: ", fetchedUSerData.job && fetchedUSerData.job.title)
console.log("title: ", fetchedUSerData?.job?.title)

// Nullish coalesing
const userInput = undefined
const storedData = userInput ?? "DEFAULT"

// type UnknownEmployee = Employee | Admin

// function printEmployeeInformation(employee: UnknownEmployee) {
//   console.log("Name: ", employee.name)
//   if('privileges' in employee) {
//     console.log("pPriviliges: ", employee.privileges)
//   }

//   if('startDate' in employee) {
//     console.log("pPriviliges: ", employee.startDate)
//   }

// }

// printEmployeeInformation(employee1)

// class Car {
//   drive() {
//     console.log("driving..")
//   }
// }

// class Truck {
//   drive() {
//     console.log("driving a truck..")
//   }

//   loadCargo(amount: number) {
//     console.log("Loading cargo: ", amount)
//   }
// }

// type Vehicle = Car | Truck 

// const v1 = new Car()
// const v2 = new Truck()

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive()
//   if("loadCargo" in vehicle) {
//     vehicle.loadCargo(1000)
//   }

//   if(vehicle instanceof Truck) {
//     vehicle.loadCargo(1000)
//   }
// }
// useVehicle(v1)
// useVehicle(v2)

// // Discriminated unions
// enum AnimalType  {
//   BIRD = 'bird',
//   HORSE = 'horse'
// }


// interface Bird {
//   type: AnimalType.BIRD
//   flyingSpeed: number;
// }

// interface Horse {
//   type: AnimalType.HORSE
//   runningSpeed: number;
// }

// type Animal = Bird | Horse

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch(animal.type) {
//     case AnimalType.BIRD: 
//       speed = animal.flyingSpeed
//       break
//     case AnimalType.HORSE: 
//       speed = animal.runningSpeed
//       break

//   }
//   console.log("MObing with speed: ", speed)
// }

// moveAnimal({type: AnimalType.BIRD, flyingSpeed: 213})

// // DOM example
// const paragraph = document.querySelector("#message-output")
// // const userInputElement = <HTMLInputElement>document.querySelector("#user-input") 
// const userInputElement = document.querySelector("#user-input") as HTMLInputElement 

// if(userInputElement) {
//   (userInputElement as HTMLInputElement).value = 'asd'
// }
// // userInputElement.value = "Hi"

// // Index properties
// interface ErrorContainer {
//   // id: string;
//   [prop: string] : string;
//   username: string
// }

// const errorBag: ErrorContainer = {
//   emal: "not a valid email",
//   username: "Must Start with a capital"
// }

// FUnction overloads