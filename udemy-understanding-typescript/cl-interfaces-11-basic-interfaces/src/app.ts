// type AddFunction = (a: number, b: number) => number
interface AddFunction {
  (a: number, b: number): number
}


let add: AddFunction;

add = (n1: number, n2: number) => {
  return n1+ n2
}

add(1,2)

interface Named {
  readonly name?: string;
  outpuName?: string
}

export interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  constructor(name: string = "SOME") {
    this.name = name
  }

  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}`)
  };

}

let user1: Greetable;

user1 = new Person()

user1.greet("HiIII")