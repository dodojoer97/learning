// // *** Decorator ***
// function Logger(constructor: Function) {
//     console.log("LOggin....");
//     console.log(constructor);
// }

// // @Logger
// // class PersonEX {
// //     name = "max"
// //     constructor() {
// //         console.log("Creating PersonEX object...")
// //     }
// // }

// // const pers = new PersonEX()
// // console.log(pers)



// // *** Decorator factory ***
// function LoggerFactory(logString: string) {
//     return function (constructor: Function) {
//         console.log(logString);
//         console.log(constructor);
//     }
    
// }


// // @LoggerFactory("LOGGING-PERSON")
// // class PersonFactoryEX {
// //     name = "max"
// //     constructor() {
// //         console.log("Creating PersonFactoryEX object...")
// //     }
// // }

// // const persFactoryEx = new PersonFactoryEX()
// // console.log(persFactoryEx)


// // More useful
// function WithTemplate(template: string, hookId: string) {
//     return function(constructor: any) {
//         console.log("Rendering template")
//         const hookEl: HTMLDivElement | null = document.querySelector(hookId)
//         const p = new constructor()
//         if(hookEl) {
//             hookEl.innerHTML = template
//             hookEl.querySelector("h1")!.textContent = p.name
//         }
//     }
// }

// // Multiple decorators
// @LoggerFactory("PersonHTML")
// @WithTemplate("<h1>My Person</h1>", "#app")
// class PersonHTML {
//     name = 'NAME'

//     constructor() {

//     }
// }

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