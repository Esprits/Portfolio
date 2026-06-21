class Welcome extends HTMLElement {
	constructor() {
		super();

		this._internals = this.attachInternals(); // Makes states selectable in CSS (with :state())
	}

	connectedCallback() { // Called each time the element is added to the document
		const win = this;
		win.classList.add("z-30");

		addDOMElements(win);
	}

	diconnectedCallback() { // Called each time the element is removed from the document
		// Unused for now
	}

	attributeChangedCallback(name, oldValue, newValue) { // Called when attributes are changed, added, removed, or replaced.
		// Unused for now
		// If I do plan to use it, add "static observedAttributes = ["attribute"];" before the constructor
	}
}


/* ##### DOM FUNCTIONS ##### */

function addDOMElements(win) {
	const container = document.createElement("div");
	container.id = "welcome-container";

	const door = createDoor(win);
	const welcomeText = createWelcomeText(win);
	const takeAPeekText = createTakeAPeekText(win);
	const peephole = createPeephole(win, container);

	container.append(door);
	container.append(welcomeText);
	container.append(takeAPeekText);
	container.append(peephole);

	win.append(container);
}

function createDoor(win) {
	const door = document.createElement("img");
	door.src = "assets/images/door.jpg";
	door.id = "welcome-door";

	return door;
}

function createWelcomeText(win) {
	const text = document.createElement("h3");
	text.id = "welcome-text";
	text.innerText = "Welcome";

	return text;
}

function createTakeAPeekText(win) {
	const text = document.createElement("img");
	text.id = "welcome-peek-text";
	text.src = "assets/images/take_a_peek.png";

	return text;
}

function createPeephole(win, container) {
	const peephole = document.createElement("img");
	peephole.id = "welcome-peephole";
	peephole.src = "assets/images/peephole.png";

	// When the peephole is clicked, take a peek
	peephole.addEventListener("click", function(e) {
		takeAPeek(win, container);
	}, true);

	return peephole;
}


/* ##### FUNCTIONALITIES ##### */

function takeAPeek(win, container) {
	const website = document.getElementById("website");

	// Zoom into the peephole
	container.style.transform = "scale(20)";
	container.style.opacity = "0";

	// After 1.5 seconds, hide the welcome page and show the website
	setTimeout(() => {
		win.style.display = "none";
		website.style.opacity = "100%";
	}, 1500);
}


customElements.define("welcome-view", Welcome);