function home() {
	const container = document.createElement("div");
	container.id = "home-container";

	const bg = createBackgroundLayer();
	const mid = createMiddleLayer();
	const fg = createForegroundLayer();
	const peephole = createPeepholeLayer();

	container.append(bg);
	container.append(mid);
	container.append(fg);
	container.append(peephole);

	return container;
}


/* ##### DOM FUNCTIONS ##### */

function createBackgroundLayer() {
	const bg = document.createElement("div");
	bg.id = "home-background";
	bg.classList.add("z-0");

	return bg;
}

function createMiddleLayer() {
	const mid = document.createElement("div");
	mid.id = "home-middle";
	mid.classList.add("z-5");

	const title = document.createElement("div");
	title.id = "home-title";

	addImagesToTitle(title);

	const subtitle = document.createElement("h2");
	subtitle.id = "home-subtitle";
	subtitle.innerText = "Portfolio";

	mid.append(title);
	mid.append(subtitle);

	return mid;
}

// FIXME Find a way to have name & surnameStart on top of z-15 (vignette)
// - with the issue of them being children of titleDiv meaning that their
// - z-index will never go higher than their parent's (which I want it to
// - be lower than the vignette) RRRRRAAAAAAAAHHH This is so frustrating.
function addImagesToTitle(title) {
	const name = getNameImage();
	const surname = getSurnameImages();

	title.append(name);
	title.append(surname);
}

function getNameImage() {
	const name = document.createElement("div");

	const nameImage = document.createElement("img");
	nameImage.src = "assets/images/lorenzo.png";

	name.append(nameImage);

	return name;
}

function getSurnameImages() {
	const surname = document.createElement("div");

	const surnameStart = document.createElement("img");
	surnameStart.src = "assets/images/mignacca_start.png";
	const surnameEnd = document.createElement("img");
	surnameEnd.src = "assets/images/mignacca_end.png";

	surname.append(surnameStart);
	surname.append(surnameEnd);

	return surname;
}

function createForegroundLayer() {
	const fg = document.createElement("div");
	fg.id = "home-foreground";
	fg.classList.add("z-10");

	return fg;
}

function createPeepholeLayer() {
	const peephole = document.createElement("div");
	peephole.id = "home-peephole";
	peephole.classList.add("z-15");

	return peephole;
}