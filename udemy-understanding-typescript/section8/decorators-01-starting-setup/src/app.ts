// *** Decorator ***
// function Logger(constructor: Function) {
//     console.log("LOggin....");
//     console.log(constructor);
// }

// @Logger
// class PersonEX {
//     name = "max"
//     constructor() {
//         console.log("Creating PersonEX object...")
//     }
// }

// const pers = new PersonEX()
// console.log(pers)



// *** Decorator factory ***
// function LoggerFactory(logString: string) {
//     return function (constructor: Function) {
//         console.log(logString);
//         console.log(constructor);
//     }
    
// }


// @LoggerFactory("LOGGING-PERSON")
// class PersonFactoryEX {
//     name = "max"
//     constructor() {
//         console.log("Creating PersonFactoryEX object...")
//     }
// }

// const persFactoryEx = new PersonFactoryEX()
// console.log(persFactoryEx)


// More useful ex
function WithTemplate(template: string, hookId: string) {
    console.log("TEMPLATE FACTORY")
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super()
                console.log("Rendering template")
                const hookEl: HTMLDivElement | null = document.querySelector(hookId)
                if(hookEl) {
                    hookEl.innerHTML = template
                    hookEl.querySelector("h1")!.textContent = this.name
                }
            }
        }
    }
}

// Multiple decorators
// @LoggerFactory("PersonHTML")
@WithTemplate("<h1>My Person</h1>", "#app")
class PersonHTML {
    name = 'NAME'

    constructor() {

    }
}

// Property decorators 

function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator")
    console.log(target, propertyName)
}
// Accessor decorators
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accesssor decorator")
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

// Method decorator
function Log3(target: any, name: string | Symbol,  descriptor: PropertyDescriptor){
    console.log("method decorator")
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

// Paramater decorator
function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Paramater decorator")
    console.log(target)
    console.log(name)
    console.log(position)
}

class Product {
    @Log
    title: string
    private _price: number

    @Log2
    set price(val: number) {
        if(val > 0) {
            this.price =val
        }else {
            throw new Error("Invalid price")
        }
    }

    constructor(t: string,price: number) {
        this.title = t
        this._price = price
    }

    @Log3
    getPriceWithTax(@Log4 tax: number ) {
        return this._price * (1 + tax)
    }
}

// AUtobind


function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }

    return adjustedDescriptor
}

class Printer {
    message = "This works"
    
    @AutoBind
    showMessage() {
        console.log(this.message)
    }
}

const printer = new Printer()

const button = document.querySelector("button") as HTMLButtonElement

button.addEventListener("click", printer.showMessage)


// Validation

interface ValidatorConfig {
    [propery: string]: {
        [validatableProp: string]: string[] // [required, positive]
    }

}

const registeredValidators: ValidatorConfig = {
}


function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] =  {
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] =  {
        [propName]: ['positive']
    }
}

function validate(obj: any): boolean {
    const config = registeredValidators[obj.constructor.name]

    if(!config) return true

    for(const prop in config) {
        for(const validator of config[prop]) {
            switch(validator) {
                case 'required': 
                    return !!obj[prop]
                case 'positive': 
                    return obj[prop] > 0 
            }
        }
    }

    return true
}
class Course {
    @Required
    title: string
    @PositiveNumber
    price: number
    constructor(title: string, price: number) {
        this.title = title
        this.price = price
    }
}

const courseForm = document.querySelector("form") as HTMLFormElement

courseForm.addEventListener("submit", e => {
    e.preventDefault()
    const titleEl = document.querySelector("#title") as HTMLInputElement
    const priceEl  = document.querySelector("#price ") as HTMLInputElement

    const title = titleEl.value
    const price = +priceEl.value

    const createdCourse = new Course(title, price)

    if(!validate(createdCourse)) throw new Error("NOT VALID")
    console.log(createdCourse)

})