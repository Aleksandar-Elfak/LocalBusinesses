export class UserReview {
	constructor(name, review, rating) {
		this.name = name;
		this.review = review;
		this.rating = rating;
	}

	draw(host) {
		const leftPart2 = document.createElement("div");
		leftPart2.className = "leftPart2";
		host.appendChild(leftPart2);

		const nameDiv2 = document.createElement("div");
		nameDiv2.innerHTML = this.name;
		leftPart2.appendChild(nameDiv2);

		const typeDiv2 = document.createElement("div");
		typeDiv2.innerHTML = this.type;
		leftPart2.appendChild(typeDiv2);

		const ratingDiv2 = document.createElement("div");
		ratingDiv2.innerHTML = "⭐  " + this.rating;
		leftPart2.appendChild(ratingDiv2);

		const rightPart2 = document.createElement("div");
		host.appendChild(rightPart2);

		const img2 = document.createElement("img");
		img2.src = this.img;
		rightPart2.appendChild(img2);

		const addressDiv2 = document.createElement("div");
		addressDiv2.innerHTML = this.address;
		rightPart2.appendChild(addressDiv2);
	}
}
