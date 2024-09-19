/// <reference path="base-component.ts" />


namespace App {
    	// List
	export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
{
    assignedProjects: Project[]

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`)

        this.assignedProjects = []

        this.renderContent()

        this.configure()
    }

    private renderProjects() {
        const listEl = document.querySelector(
            `#${this.type}-projects-list`
        ) as HTMLUListElement
        listEl.innerHTML = ""
        for (const project of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul")!.id, project)
            // const listItem = document.createElement('li')
            // listItem.textContent = project.title
            // listEl?.appendChild(listItem)
        }
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault()
            const listEl = this.element.querySelector("ul")!
            listEl.classList.add("droppable")
        }
    }
    @Autobind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer?.getData("text/plain")
        if (projectId) {
            projectState.moveProject(
                projectId,
                this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
            )
        }
    }

    @Autobind
    dragLeaveHandler(event: DragEvent): void {
        console.log("ProjectList ~  ~ event:", event)
        const listEl = this.element.querySelector("ul")!
        listEl.classList.remove("droppable")
    }

    renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector("ul")!.id = listId
        this.element.querySelector("h2")!.textContent =
            this.type.toUpperCase() + " PROJECTS"
    }

    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler)
        this.element.addEventListener("dragleave", this.dragLeaveHandler)
        this.element.addEventListener("drop", this.dropHandler)

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === "active") {
                    return project.status === ProjectStatus.ACTIVE
                } else {
                    return project.status === ProjectStatus.FINISHED
                }
            })
            this.assignedProjects = relevantProjects
            this.renderProjects()
        })
    }
}

}