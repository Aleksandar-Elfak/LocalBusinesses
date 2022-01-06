import { UserView } from "./userView.js";

export class Start {
	constructor() {
		this.container = null;
		this.username = null;
	}

	draw(host) {
		if (!host) throw new Error("Host is not defined");

		this.container = document.createElement("div");
		this.container.className = "mainDiv1";
		host.appendChild(this.container);

		const left = document.createElement("div");
		left.className = "leftDiv1";
		this.container.appendChild(left);

		const title = document.createElement("div");
		title.className = "title1";
		left.appendChild(title);

		const mainTitle = document.createElement("div");
		mainTitle.className = "mainTitle1";
		mainTitle.innerHTML = "Local Businesses";
		title.appendChild(mainTitle);

		const subTitle = document.createElement("div");
		subTitle.className = "subTitle1";
		subTitle.innerHTML = "Find the service you need";
		title.appendChild(subTitle);

		const loginDiv = document.createElement("div");
		loginDiv.className = "loginDiv1";
		left.appendChild(loginDiv);

		const loginLine = document.createElement("div");
		loginLine.className = "loginLine1";
		loginDiv.appendChild(loginLine);

		const lbl1 = document.createElement("label");
		lbl1.classList = "ui label yellow";
		lbl1.innerHTML = "Username: ";
		loginLine.appendChild(lbl1);

		const input1 = document.createElement("input");
		input1.className = "ui large";
		loginLine.appendChild(input1);

		const loginLine1 = document.createElement("div");
		loginLine1.className = "loginLine1";
		loginDiv.appendChild(loginLine1);

		const lbl2 = document.createElement("label");
		lbl2.classList = "ui label yellow";
		lbl2.innerHTML = "Password: ";
		loginLine1.appendChild(lbl2);

		const input2 = document.createElement("input");
		input2.className = "ui large";
		loginLine1.appendChild(input2);

		const testButton = document.createElement("button");
		testButton.className = "ui button yellow";
		testButton.innerHTML = "Log in";
		testButton.onclick = () => {
			document.body.removeChild(this.container);
			let u = new UserView(this, "vule");
			u.draw();
		};
		loginDiv.appendChild(testButton);

		const right = document.createElement("div");
		right.className = "rightDiv1";
		right.style.height = window.innerHeight;
		this.container.appendChild(right);

		const rightImg = document.createElement("img");
		rightImg.className = "img1";
		rightImg.src = "img1.png";
		right.appendChild(rightImg);
	}
}
