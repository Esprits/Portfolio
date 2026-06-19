class CurrentPage extends HTMLElement {
	constructor() {
		super();

		this._internals = this.attachInternals(); // Makes states selectable in CSS (with :state())
	}

	connectedCallback() { // Called each time the element is added to the document
		const win = this;

		loadPage("home"); // FIXME For some reason not having "home" here makes it so that it sometimes doesn't load
	}

	diconnectedCallback() { // Called each time the element is removed from the document
		// Unused for now
	}

	attributeChangedCallback(name, oldValue, newValue) { // Called when attributes are changed, added, removed, or replaced.
		// Unused for now
		// If I do plan to use it, add "static observedAttributes = ["attribute"];" before the constructor
	}
}


/* ##### FUNCTIONALITIES ##### */

function loadPage(page = "home") { // Default page will be the home page
	const pageContent = window[page](); // window["string"]() calls a function depending on a string value

	const container = document.getElementsByTagName("current-page")[0];
	container.replaceChildren(pageContent);
}


customElements.define("current-page", CurrentPage);