import { BusinessView } from "./businessView.js";
import { BusinessCard } from "./businessCard.js";
import { UserReview } from "./userReview.js";

export class UserView {
	constructor(start, username) {
		this.container = null;
		this.username = username;
		this.start = start;
	}

	draw() {
		this.container = document.createElement("div");
		this.container.className = "mainDiv2";
		document.body.appendChild(this.container);

		const botDiv2 = document.createElement("div");
		botDiv2.className = "botDiv2";
		this.container.appendChild(botDiv2);

		const backButton2 = document.createElement("button");
		backButton2.innerHTML = "BACK";
		backButton2.style.margin = "5px";
		backButton2.className = "ui button yellow";
		backButton2.onclick = () => {
			document.body.removeChild(this.container);
			this.start.draw(document.body);
		};
		this.container.appendChild(backButton2);

		const topDiv2 = document.createElement("div");
		topDiv2.className = "topDiv2";
		this.container.appendChild(topDiv2);

		const leftDiv2 = document.createElement("div");
		leftDiv2.className = "leftDiv2 ui segment";
		topDiv2.appendChild(leftDiv2);

		const searchDiv2 = document.createElement("div");
		searchDiv2.className = "searchDiv2 ui search";
		leftDiv2.appendChild(searchDiv2);

		const iconInput2 = document.createElement("div");
		iconInput2.className = "ui icon input";
		searchDiv2.appendChild(iconInput2);

		const inputSearch2 = document.createElement("input");
		inputSearch2.className = "inputSearch2 prompt";
		inputSearch2.placeholder = "Search by tags...";
		iconInput2.appendChild(inputSearch2);

		const buttonSearch2 = document.createElement("button");
		buttonSearch2.innerHTML = "Run";
		buttonSearch2.className = "ui button basic black";
		searchDiv2.appendChild(buttonSearch2);

		const results = document.createElement("div");
		results.className = "results2";
		leftDiv2.appendChild(results);

		buttonSearch2.onclick = () => {
			// spustiti input u lowercase
			var tag = this.container
				.querySelector(".inputSearch2")
				.value.toLowerCase();
			console.log(tag);
			fetch("https://localhost:7294/Business/SearchBusinesses/" + tag).then(
				(p) => {
					p.json().then((bus) => {
						results.innerHTML = "";
						bus.forEach((b) => {
							const business = new BusinessCard(
								b.name,
								b.address,
								b.contact,
								b.description,
								b.img,
								b.prices,
								b.rating,
								b.type
							);
							//gradovi.push(grad);
							let businessCardDiv2 = document.createElement("div");
							businessCardDiv2.className = "businessCardDiv2";
							results.appendChild(businessCardDiv2);
							business.draw(businessCardDiv2);

							businessCardDiv2.onclick = () => {
								document.body.removeChild(this.container);
								let u = new BusinessView(this, business.name, this.username);
								u.draw();
							};
						});
						//agencija.crtaj(agencija.kontejner, gradovi);
					});
				}
			);
		};

		inputSearch2.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				buttonSearch2.click();
			}
		});

		const middleDiv2 = document.createElement("div");
		middleDiv2.className = "middleDiv2 ui segment";
		topDiv2.appendChild(middleDiv2);

		const recommendedDiv2 = document.createElement("h3");
		recommendedDiv2.innerHTML = "Recommended";
		recommendedDiv2.className = "recommendedDiv2";
		middleDiv2.appendChild(recommendedDiv2);

		fetch(
			"https://localhost:7294/Business/GetRecommended/" + this.username
		).then((p) => {
			p.json().then((bus) => {
				bus.forEach((b) => {
					const business = new BusinessCard(
						b.name,
						b.address,
						b.contact,
						b.description,
						b.img,
						b.prices,
						b.rating,
						b.type
					);
					//gradovi.push(grad);
					let businessCardDiv2 = document.createElement("div");
					businessCardDiv2.className = "businessCardDiv2";
					middleDiv2.appendChild(businessCardDiv2);
					business.draw(businessCardDiv2);

					businessCardDiv2.onclick = () => {
						document.body.removeChild(this.container);
						let u = new BusinessView(this, business.name, this.username);
						u.draw();
					};
				});
				//agencija.crtaj(agencija.kontejner, gradovi);
			});
		});

		const rightDiv2 = document.createElement("div");
		rightDiv2.className = "rightDiv2 ui segment";
		topDiv2.appendChild(rightDiv2);

		const reviewsTitle = document.createElement("h3");
		reviewsTitle.innerHTML = "Reviews";
		reviewsTitle.className = "reviewsTitle2";
		rightDiv2.appendChild(reviewsTitle);

		fetch(
			"https://localhost:7294/Business/GetUsernameReviews/" + this.username
		).then((p) => {
			p.json().then((bus) => {
				bus.forEach((b) => {
					const rev = new UserReview(b.name, b.review, b.rating, this.username);
					let reviewCard = document.createElement("div");
					reviewCard.className = "reviewCard";
					rightDiv2.appendChild(reviewCard);
					rev.draw(reviewCard);
				});
				//agencija.crtaj(agencija.kontejner, gradovi);
			});
		});
	}
}
