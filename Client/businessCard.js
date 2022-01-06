export class BusinessCard {
	constructor(name, address, contact, description, img, prices, rating, type) {
		this.name = name;
		this.address = address;
		this.contact = contact;
		this.description = description;
		this.img = img;
		this.prices = prices;
		this.rating = rating;
		this.type = type;
	}

	draw(host) {
		const leftPart2 = document.createElement("div");
		leftPart2.className = "leftPart2";
		host.appendChild(leftPart2);

		const nameDiv2 = document.createElement("div");
		nameDiv2.innerHTML = this.name;
		nameDiv2.className = "nameDiv2";
		leftPart2.appendChild(nameDiv2);

		const typeDiv2 = document.createElement("div");
		typeDiv2.innerHTML = this.type;
		typeDiv2.className = "typeDiv2";
		leftPart2.appendChild(typeDiv2);

		const ratingDiv2 = document.createElement("div");
		ratingDiv2.innerHTML =
			"⭐  " + Math.round((this.rating + Number.EPSILON) * 100) / 100;
		ratingDiv2.className = "ratingDiv2";
		leftPart2.appendChild(ratingDiv2);

		const rightPart2 = document.createElement("div");
		rightPart2.className = "rightPart2";
		host.appendChild(rightPart2);

		const img2 = document.createElement("img");
		img2.className = "img2";
		img2.src = this.img;
		rightPart2.appendChild(img2);

		const addressDiv2 = document.createElement("div");
		addressDiv2.innerHTML = this.address;
		addressDiv2.className = "addressDiv2";
		rightPart2.appendChild(addressDiv2);
	}
}
