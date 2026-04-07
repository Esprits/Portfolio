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

	// Get & Set add the "expanded" state for CSS
	get expanded() {
		return this._internals.states.has("expanded");
	}

	set expanded(flag) {
		if (flag) {
			this._internals.states.add("expanded");
		} else {
			this._internals.states.delete("expanded");
		}
	}
}


// Fills in the element with its elements
function addDOMElements(win) {
	const sidebarButton = createSidebarButton(win);
	const sidebarContents = document.createElement("div");
	sidebarContents.id = "sidebar-contents";

	win.append(sidebarButton);
	win.append(sidebarContents);
}

function createSidebarButton(win) {
	const sidebarButton = document.createElement("div");
	sidebarButton.id = "sidebar-button";

	sidebarButton.addEventListener("click", function(e) {
		expandSidebar(win);
	}, true);

	return sidebarButton;
}


function expandSidebar(win) {
	win.expanded = true;
}


customElements.define("side-bar", Sidebar);