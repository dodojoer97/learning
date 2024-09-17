
// Project type
enum ProjectStatus {
    ACTIVE= "ACTIVE",
    FINISHED = "FINISHED"
}

class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ){}
}



// Project state managament

type Listener<T> = (items: T[]) => void

class State<T> {
    protected listeners: Listener<T>[] = []
    addListener(listenerFN: Listener<T>) {
        this.listeners.push(listenerFN)
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [

    ]

    private static instance: ProjectState

    // SINGLETON PATTENR
    private constructor() {
        super()
    }

    static getInstance() {
        if(this.instance) {
            return this.instance
        }

        this.instance = new ProjectState()
        return this.instance
    }



    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.ACTIVE
        )

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


// Component base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement
    hostElement: T
    element: U
    constructor(
        templateId: string,
        hostELementId: string,
        insertAtStart: boolean,
        newElementId? :string
    ) {
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement
        this.hostElement = document.getElementById(hostELementId) as T
        // Get the content of a html template
        const importedNode: DocumentFragment = document.importNode(this.templateElement.content, true)

        this.element = importedNode.firstElementChild as U
        if(newElementId) {
            this.element.id = newElementId
        }

        this.attach(insertAtStart)
    }

    
    private attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" :"beforeend", this.element)
    }

    abstract configure(): void
    abstract renderContent(): void
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    private project: Project 

    get persons() {
        if(this.project.people === 1) {
            return "1 Person"
        }else {
            return `${this.project.people} Persons`
        }
    }

    constructor(hostId: string, project: Project) {
        super("single-project", hostId, false, project.id)
        this.project = project

        this.configure()
        this.renderContent()
    }

    configure(): void {
        
    }

    renderContent(): void {
        this.element.querySelector("h2")!.textContent = this.project.title
        this.element.querySelector("h3")!.textContent = this.persons + " assigned"
        this.element.querySelector("p")!.textContent = this.project.description
    }
}

// List
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[]

    constructor(private type: "active" | "finished") {
        super("project-list", "app" , false,`${type}-projects`)


        this.assignedProjects = []

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if(this.type === 'active' ) {
                    return project.status === ProjectStatus.ACTIVE 
                }else {
                    return project.status === ProjectStatus.FINISHED 
                }
                
            })
            this.assignedProjects = relevantProjects
            this.renderProjects()
        })

        this.renderContent()
    }

    private renderProjects() {
        const listEl = document.querySelector(`#${this.type}-projects-list`) as HTMLUListElement
        listEl.innerHTML = ""
        for(const project of this.assignedProjects) {
             new ProjectItem(this.element.querySelector("ul")!.id, project)
            // const listItem = document.createElement('li')
            // listItem.textContent = project.title
            // listEl?.appendChild(listItem)
        }

            
    }

    renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " PROJECTS"
    }

    configure() {}

}


// ProjectInput class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        super("project-input", "app", true, 'user-input')
        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement

        this.configure()
    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler)
    }

    renderContent(): void {
        
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


   
}


const projectInput = new ProjectInput()
const activeProjectList = new ProjectList("active")
const finishedProjectList = new ProjectList("finished")