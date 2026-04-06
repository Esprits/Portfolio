class Sidebar extends HTMLElement {
	constructor() {
		super();

		this._internals = this.attachInternals(); // Makes states selectable in CSS (with :state())
	}

	connectedCallback() { // Called each time the element is added to the document
		const win = this;

		addDOMElements(win);
	}

	diconnectedCallback() { // Called each time the element is removed from the document
		// Unused for now
	}

	attributeChangedCallback(name, oldValue, newValue) { // Called when attributes are changed, added, removed, or replaced.
		// Unused for now
		// If I do plan to use it, add "static observedAttributes = ["attribute"];" before the constructor
	}

	// Get & Set add the "opened" state for CSS
	get expanded() {
		return this._internals.states.has("opened");
	}

	set expanded(flag) {
		if (flag) {
			this._internals.states.add("opened");
		} else {
			this._internals.states.delete("opened");
		}
	}
}


// Fills in the element with its elements
function addDOMElements(win) {
	const test = document.createElement("div");

	win.append(test);
}

customElements.define("side-bar", Sidebar);