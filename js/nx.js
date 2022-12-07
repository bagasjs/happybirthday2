class Nx {
	constructor() {
		this.state = {};
	}

	async init() {
		const nxInitElements = document.getElementsByTagName("nx-init");
		if(nxInitElements.length > 1) this.throwError(`"<nx-init></nx-init>" can only be declared once per html file`);
		if(nxInitElements.length < 1) return;
		const nxInitElement = nxInitElements[0];

		const dataSource = nxInitElement.getAttribute("href");
		if(dataSource) await fetch(dataSource).then(res=>res.json()).then(data=>Object.keys(data).forEach(key=>this.state[key]=data[key]));

		const stateString = nxInitElement.getAttribute("state");
		const state = JSON.parse(stateString);
		for(const key in state) {
			this.state[key] = state[key];
		}
	}


	set(name, value) {
		this.state[name] = value;
		this.render();
	}

	get(name) {
		return this.state[name];
	}

	throwError(message) {
		const nxErrorElement = document.createElement("nx-error");
		nxErrorElement.style = "display:block; padding : 20px 50px; border: solid black 0.5rem;"
		const escapeHtml = (unsafe) => unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
		nxErrorElement.innerHTML = `nx Error: ${escapeHtml(message)}`;
		document.body.appendChild(nxErrorElement);
	}

	render() {
		const nxValues = document.getElementsByTagName("nx-value");
		Array.from(nxValues).forEach(el => {
			const name = el.getAttribute("name");
			el.innerHTML = this.state[name];
		});
	}
}