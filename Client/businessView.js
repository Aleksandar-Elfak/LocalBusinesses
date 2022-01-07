import { UserReview } from "./userReview.js";

export class BusinessView {
	constructor(userView, businessName, username) {
		this.container = null;
		this.username = username;
		this.businessName = businessName;
		this.userView = userView;
	}

	draw() {
		this.container = document.createElement("div");
		this.container.className = "businessView";
		document.body.appendChild(this.container);

		const testButton = document.createElement("button");
		testButton.innerHTML = "back";
		testButton.className = "ui yellow button testButton3";
		testButton.onclick = () => {
			document.body.removeChild(this.container);
			this.userView.draw();
		};
		this.container.appendChild(testButton);

		const leftDiv3 = document.createElement("div");
		leftDiv3.className = "leftDiv3 ui segment";
		leftDiv3.classList.add("bigDiv3");
		this.container.appendChild(leftDiv3);

		const middleDiv3 = document.createElement("div");
		middleDiv3.className = "middleDiv3  ui segment";
		middleDiv3.classList.add("bigDiv3");
		this.container.appendChild(middleDiv3);

		const rightDiv3 = document.createElement("div");
		rightDiv3.className = "rightDiv3  ui segment";
		rightDiv3.classList.add("bigDiv3");
		this.container.appendChild(rightDiv3);

		this.drawRightDiv(rightDiv3);

		// tri glavna diva
		// pribavljanje informacija o biznisu
		fetch(
			`https://localhost:7294/Business/GetBusiness/${this.businessName}&${this.username}`
		).then((p) => {
			p.json().then((data) => {
				this.drawLeftDiv(leftDiv3, data);
				this.drawMiddleDiv(middleDiv3, data.prices);
			});
		});
	}

	drawLeftDiv(leftDiv3, data) {
		// pribavljanje informacija o biznisu

		// picture
		const picture = document.createElement("img");
		picture.src = data.img;
		//picture.classList.add("picture3");
		//picture.classList.add("ui rounded image");
		picture.className = "ui rounded image";
		picture.classList.add("div3");
		leftDiv3.appendChild(picture);

		// name
		const name = document.createElement("h1");
		name.innerHTML = data.name;
		name.classList.add("name3");
		name.classList.add("div3");
		leftDiv3.appendChild(name);

		// opis
		const description = document.createElement("div");
		description.innerHTML = "Description: " + data.description;
		description.style.fontSize = "Large";
		description.classList.add("description3");
		description.classList.add("div3");
		leftDiv3.appendChild(description);

		// kontakt telefon
		const contact = document.createElement("div");
		contact.innerHTML = "Contact: " + data.contact;
		contact.style.fontSize = "Large";
		contact.classList.add("contact3");
		contact.classList.add("div3");
		leftDiv3.appendChild(contact);

		// adresa
		const address = document.createElement("div");
		address.innerHTML = "Address: " + data.address;
		address.style.fontSize = "Large";
		address.classList.add("address3");
		address.classList.add("div3");
		leftDiv3.appendChild(address);
	}

	drawMiddleDiv(middleDiv3, data) {
		const reviewInput = document.createElement("div");
		reviewInput.className = "ui segment reviewInput3";
		middleDiv3.appendChild(reviewInput);

		this.drawReviewInput(reviewInput);

		const priceList = document.createElement("div");

		const header = document.createElement("h2");
		header.className = "ui header";
		header.innerHTML = "Price list";
		priceList.appendChild(header);

		let priceData = data.split(",");
		for (let i = 0; i < priceData.length; i++) {
			const price = document.createElement("div");
			price.className = "ui segment price3";
			price.innerHTML += priceData[i];
			priceList.appendChild(price);
		}

		middleDiv3.appendChild(priceList);
	}

	drawReviewInput(host) {
		const inputReview = document.createElement("textarea");
		inputReview.className = "field";
		inputReview.style.marginBottom = "15px";
		host.appendChild(inputReview);

		const bottom = document.createElement("div");
		bottom.className = "bottomInput3";
		host.appendChild(bottom);

		const stars = document.createElement("div");
		bottom.appendChild(stars);

		const lvl = document.createElement("label");
		lvl.innerHTML = "⭐  ";
		stars.appendChild(lvl);

		let rating = null;

		const l = [1, 2, 3, 4, 5];
		l.forEach((element) => {
			const lbl = document.createElement("button");
			lbl.className = "ui button tiny icon yellow";
			lbl.innerHTML = element;
			stars.appendChild(lbl);
			lbl.onclick = () => {
				rating = element;
			};
		});

		const btn = document.createElement("button");
		btn.innerHTML = "Submit";
		btn.className = "ui button small yellow";
		btn.onclick = () => {
			if (rating == null) {
				alert("Pick a rating.");
				return;
			}
			if (inputReview.value.length == "") {
				alert("Input a review.");
				return;
			}
			fetch(
				`https://localhost:7294/Business/Review/${this.username}&${this.businessName}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						review: inputReview.value,
						rating: rating,
						name: this.username,
					}),
				}
			)
				.then((p) => {
					if (p.ok) {
						const rightDiv3 = document.body.querySelector(".rightDiv3");
						while (rightDiv3.firstChild) {
							rightDiv3.removeChild(rightDiv3.lastChild);
						}
						this.drawRightDiv(rightDiv3);
					}
				})
				.finally();
		};
		bottom.appendChild(btn);
	}

	drawRightDiv(rightDiv3) {
		const reviewsTitle = document.createElement("h3");
		reviewsTitle.innerHTML = "Reviews";
		reviewsTitle.style.alignSelf = "center";
		reviewsTitle.className = "reviewsTitle3";
		rightDiv3.appendChild(reviewsTitle);

		fetch(
			"https://localhost:7294/Business/GetBusinessReviews/" + this.businessName
		).then((p) => {
			p.json().then((bus) => {
				bus.forEach((b) => {
					const rev = new UserReview(b.name, b.review, b.rating);
					let reviewCard = document.createElement("div");
					reviewCard.className = "reviewCard";
					reviewCard.style.alignSelf = "center";
					rightDiv3.appendChild(reviewCard);
					rev.draw(reviewCard);
				});
			});
		});
	}
}
