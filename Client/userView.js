import { BusinessView } from "./businessView.js";

export class UserView {
	constructor(start, username) {
		this.container = null;
		this.username = username;
		this.start = start;
	}

	draw() {
		this.container = document.createElement("div");
		this.container.innerHTML = "User view";
		document.body.appendChild(this.container);

		const testButton2 = document.createElement("button");
		testButton2.innerHTML = "back";
		testButton2.onclick = () => {
			document.body.removeChild(this.container);
			this.start.draw(document.body);
		};
		this.container.appendChild(testButton2);

		const testButton = document.createElement("button");
		testButton.innerHTML = "User";
		testButton.onclick = () => {
			document.body.removeChild(this.container);
			let u = new BusinessView(this);
			u.draw();
		};
		this.container.appendChild(testButton);
	}
}
