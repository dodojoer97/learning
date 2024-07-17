
// // Code goes here!
// const names: Array<string> = ["Max", "Manuel"]

// const promise: Promise<string> = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("done")
//     }, 2000)
// })

// promise.then(data => {
//     data.split("")
// })

// // Generic function
// function merge<T extends object, U extends object>(objA: T, objB: U) {
//     return Object.assign(objA, objB)
// }

// const mergedObj = merge({name: "max"}, {age: 30})

// interface Lengthy {
//     length: number
// }

// function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
//     let descriptionText = "Got no value"
//     if(element.length  === 1) {
//         descriptionText = 'Got 1 element'
//     }else if(element.length > 1) {
//        descriptionText = 'Got ' + element.length + ' elements'
//     }
 
    
//     return [element, descriptionText]
// }

// console.log(countAndDescribe('hi there'))

// // Keyof
// function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
//     return obj[key]
// }

// extractAndConvert({name: "max"}, "name")

// // Generic classes
// class DataStorage<T> {
//     private data: T[] = []

//     addItem(item: T) {
//         this.data.push(item)
//     }

//     removeItem(item: T) {
//         this.data.splice(this.data.indexOf(item), 1)
//     }

//     getItems() {
//         return [...this.data]
//     }
// }

// const textStorage = new DataStorage<string>()
// textStorage.addItem('test')


// Generic utility types
interface CourseGoal {
    title: string
    description: string
    completeUntil: Date
}

function createCourseGoal(title: string, description: string, completeUntil: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = completeUntil

    return courseGoal as CourseGoal
}

const names: Readonly<string[]> = ["max", "sports"]