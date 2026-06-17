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


/* ##### DOM FUNCTIONS ##### */

function addDOMElements(win) {
	const sidebarButton = createSidebarButton(win);
	const sidebarContents = createSidebarContents(win);

	win.append(sidebarButton);
	win.append(sidebarContents);
}

function createSidebarButton(win) {
	const sidebarButton = document.createElement("div");
	sidebarButton.id = "sidebar-button";

	// When the sidebar button is clicked, open it
	sidebarButton.addEventListener("click", function(e) {
		toggleSidebar(win);
	}, true);

	return sidebarButton;
}

function createSidebarContents(win) {
	const sidebarContents = document.createElement("div");
	sidebarContents.id = "sidebar-contents";

	const sidebarNav = document.createElement("nav");
	sidebarNav.id = "sidebar-nav";

	fillSidebarNav(win, sidebarNav);

	sidebarContents.append(sidebarNav);

	// When the sidebar is expanded, close it when user clicks outside
	document.addEventListener("click", function(e) {
		if (win.expanded) {
			var node = e.target;

			while (node.parentNode) {
				if (node === sidebarContents) {
					return;
				}

				node = node.parentNode;
			}

			e.stopPropagation();
			closeSidebar(win);
		}
	}, true);

	return sidebarContents;
}

// Adds buttons and more to the sidebar nav
function fillSidebarNav(win, sidebarNav) {
	const sidebarButtons = [
		{"title": "Home", "action": "homePage"},
		{"title": "Projects", "action": "projectsSubmenu", "subButtons": [
			{"title": "School", "action": "schoolProjectsPage"},
			{"title": "Personal", "action": "personalProjectsPage"}
		]},
		{"title": "Documents", "action": "documentsSubmenu", "subButtons": [
			{"title": "Resume", "action": "resumePage"},
			{"title": "Diplomas", "action": "diplomasPage"},
			{"title": "Other Documents", "action": "otherDocsPage"}
		]},
		{"title": "About Me", "action": "aboutPage"},
	];

	createSidebarNavButtons(sidebarNav, sidebarButtons);
}

function createSidebarNavButtons(container, buttons) {
	for (var i = 0; i < buttons.length; i++) {
		const obj = buttons[i];

		const sidebarNavButton = document.createElement("div");
		sidebarNavButton.id = obj.action;
		sidebarNavButton.classList.add("sidebar-nav-button");
		if (obj.action.includes("Submenu")) {
			sidebarNavButton.classList.add("sidebar-nav-button-submenu");
		}

		const buttonText = document.createElement("p");
		buttonText.innerText = obj.title;

		sidebarNavButton.append(buttonText);

		// Creates the div to contain sub-buttons
		const subButtonsDiv = document.createElement("div");
		subButtonsDiv.classList.add("sidebar-nav-subbuttons");

		if (obj?.subButtons) {
			createSidebarNavButtons(subButtonsDiv, obj.subButtons); // Recursively adds the sub-buttons

			sidebarNavButton.append(subButtonsDiv);
		}

		// Adds functionality to the button
		buttonText.addEventListener("click", function(e) {
			if (obj.action.includes("Page")) { // If the button is used to redirect to a page
				pageFunctionality(obj.action);
			}

			if (obj.action.includes("Submenu")) { // If the button is simply used to open a sub-menu
				submenuFunctionality(subButtonsDiv);
			}
		}, true);

		container.append(sidebarNavButton);
	}
}


/* ##### FUNCTIONALITIES ##### */

function toggleSidebar(win) {
	if (win.expanded) {
		closeSidebar(win);
	} else {
		expandSidebar(win);
	}
}

function expandSidebar(win) {
	win.expanded = true;
}

function closeSidebar(win) {
	win.expanded = false;
}

function pageFunctionality(action) {
	// TODO Add the functionality to change pages
}

function submenuFunctionality(submenuDiv) {
	if (submenuDiv.clientHeight) {
		submenuDiv.style.height = 0;
		submenuDiv.classList.remove("expanded");
	} else {
		submenuDiv.style.height = submenuDiv.scrollHeight + "px";
		submenuDiv.classList.add("expanded");
	}
}


customElements.define("side-bar", Sidebar);