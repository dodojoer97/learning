namespace App {
    	// Project state managament

	type Listener<T> = (items: T[]) => void

	class State<T> {
		protected listeners: Listener<T>[] = []
		addListener(listenerFN: Listener<T>) {
			this.listeners.push(listenerFN)
		}
	}

	export class ProjectState extends State<Project> {
		private projects: Project[] = []

		private static instance: ProjectState

		// SINGLETON PATTENR
		private constructor() {
			super()
		}

		static getInstance() {
			if (this.instance) {
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
			this.updateListeners()
		}

		moveProject(projectId: string, newStatus: ProjectStatus) {
			const project = this.projects.find(
				(project: Project) => project.id === projectId
			)
			if (project) {
				project.status = newStatus
			}

			this.updateListeners()
		}

		private updateListeners() {
			for (const listenerFN of this.listeners) {
				listenerFN(this.projects.slice())
			}
		}
	}

	export const projectState = ProjectState.getInstance()
}