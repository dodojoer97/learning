namespace App {
    	// Component base class
	export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
		templateElement: HTMLTemplateElement
		hostElement: T
		element: U
		constructor(
			templateId: string,
			hostELementId: string,
			insertAtStart: boolean,
			newElementId?: string
		) {
			this.templateElement = document.getElementById(
				templateId
			) as HTMLTemplateElement
			this.hostElement = document.getElementById(hostELementId) as T
			// Get the content of a html template
			const importedNode: DocumentFragment = document.importNode(
				this.templateElement.content,
				true
			)

			this.element = importedNode.firstElementChild as U
			if (newElementId) {
				this.element.id = newElementId
			}

			this.attach(insertAtStart)
		}

		private attach(insertAtStart: boolean) {
			this.hostElement.insertAdjacentElement(
				insertAtStart ? "afterbegin" : "beforeend",
				this.element
			)
		}

		abstract configure(): void
		abstract renderContent(): void
	}
}