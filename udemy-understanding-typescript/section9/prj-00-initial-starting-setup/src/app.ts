// Project state managament
class ProjectState {
    private listeners: any[] = []
    private projects: any[] = [

    ]

    private static instance: ProjectState

    // SINGLETON PATTENR
    private constructor() {

    }

    static getInstance() {
        if(this.instance) {
            return this.instance
        }

        this.instance = new ProjectState()
        return this.instance
    }

    addListener(listenerFN: Function) {
        this.listeners.push(listenerFN)
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people: numOfPeople
        }

        this.projects.push(newProject)

        // Call all listeners
        for(const listenerFN of this.listeners) {
            listenerFN(this.projects.slice())
        }
    }
}

const projectState = ProjectState.getInstance()

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



// List
class ProjectList {
    templateElement: HTMLTemplateElement
    hostElement: HTMLDivElement
    element: HTMLElement
    assignedProjects: any[]


    constructor(private type: "active" | "finished") {
        this.templateElement = document.querySelector("#project-list") as HTMLTemplateElement
        this.hostElement = document.querySelector("#app") as HTMLDivElement

        // Get the content of a html template
        const importedNode: DocumentFragment = document.importNode(this.templateElement.content, true)

        this.element = importedNode.firstElementChild as HTMLElement
        this.element.id = `${this.type}-projects`;

        this.assignedProjects = []

        projectState.addListener((projects: any[]) => {
            this.assignedProjects = projects
            this.renderProjects()
        })

        this.attach()
        this.renderContent()
    }

    private renderProjects() {
        const listEl = document.querySelector(`#${this.type}-projects-list`) as HTMLUListElement
        for(const project of this.assignedProjects) {
            const listItem = document.createElement('li')
            listItem.textContent = project.title
            listEl?.appendChild(listItem)
        }

            
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " PROJECTS"
    }

    private attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element)
    }
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

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true
        }

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }
        if(
            !validate(titleValidatable) 
            ||
            !validate(descriptionValidatable) 
            ||
            !validate(peopleValidatable) 
        ) {
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
            projectState.addProject(title, description, people)
            this.clearInputs()
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
const activeProjectList = new ProjectList("active")
const finishedProjectList = new ProjectList("finished")