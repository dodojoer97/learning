// // Code goes here!
// const names: Array<string> = [];
// // const names2: string[] = []
// // names[0].split(" ");

// const promise: Promise<string> = new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve("this is doen");
// 	}, 2000);
// });

// //
// promise.then((value) => console.log(value));

// Creating a generic function
function merge<T, U>(objA: T, objB: U) {
	// return {...objA, ...objB}
	return Object.assign(objA, objB);
}

const mergeOBJ = merge({ name: "ido" }, { age: 123 });
mergeOBJ.age;
