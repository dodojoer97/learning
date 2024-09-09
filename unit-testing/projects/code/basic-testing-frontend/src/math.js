import {validateStringNotEmpty} from "./util/validation"

export function add(numbers) {
  if(!numbers) throw new Error("numbers are mandatory in add")
  let sum = 0;

  for (const number of numbers) {
    sum += +number;
  }
  return sum;
}


export function cleanNumbers(numberValues) {
  const numbers = [];
  for (const numberInput of numberValues) {
    validateStringNotEmpty(numberInput);
    const number = transformToNumber(numberInput);
    validateNumber(number);
    numbers.push(number);
  }

  return numbers
}


export function calculateResult(numberValues) {
  let result = '';
  try {
    const cleanedNumbers = cleanNumbers(numberValues)
    result = add(cleanedNumbers).toString();
  } catch (error) {
    result = error.message;
  }

  return result

}