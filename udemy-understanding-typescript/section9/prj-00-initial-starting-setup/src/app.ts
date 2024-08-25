// Validation
interface Validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number 
}

function validate(validatableInput: Validatable): boolean {
    const {value, max, maxLength, min, minLength, required} = validatableInput
    let isValid = true

    if(required) {
        isValid = isValid && value.toString().trim().length !== 0
    }

    if(minLength !== undefined && typeof value === 'string') {
        isValid = isValid && value.length > minLength
    }

    if(maxLength !== undefined && typeof value === 'string') {
        isValid = isValid && value.length < maxLength
    }
    
    if(min !== undefined && typeof value === 'number') {
        isValid = isValid && value >= min

    }

    if(max !== undefined && typeof value === 'number') {
        isValid = isValid && value <= max

    }
    
    return isValid
}

// Autobind decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }

    return adjDescriptor
}

// ProjectInput class
class ProjectInput {
    templateElement: HTMLTemplateElement
    hostElement: HTMLDivElement
    element: HTMLFormElement
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        this.templateElement = document.querySelector("#project-input") as HTMLTemplateElement
        this.hostElement = document.querySelector("#app") as HTMLDivElement

        // Get the content of a html template
        const importedNode: DocumentFragment = document.importNode(this.templateElement.content, true)

        this.element = importedNode.firstElementChild as HTMLFormElement
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement

        this.attach()
        this.configure()
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value
        const enteredDescription = this.descriptionInputElement.value
        const enteredPeople = this.peopleInputElement.value
        console.log("enteredDescription: ", enteredDescription)
        console.log("enteredPeople: ", enteredPeople)
        if(
            validate({value: enteredTitle, required: true, minLength: 5})
        ) {
            alert("invalid inputttt")
        }else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }

        
    }

    private clearInputs() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInput = this.gatherUserInput()
        if(Array.isArray(userInput)) {
            const [title, description, people] = userInput
            console.log(title, description, people)
        }
        
    }

    private configure() {
        this.element.addEventListener("submit", this.submitHandler)
    }


    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element)
    }
}

const projectInput = new ProjectInput()