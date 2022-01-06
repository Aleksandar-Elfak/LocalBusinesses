export class UserReview {
	constructor(name, review, rating) {
		this.name = name;
		this.review = review;
		this.rating = rating;
	}

	draw(host) {
		const mainDiv = document.createElement("div");
		mainDiv.className = "userReviewCard ui segment";
		mainDiv.style.width = window.innerWidth * 0.25;
		host.appendChild(mainDiv);

		const name = document.createElement("div");
		name.innerHTML = this.name;
		mainDiv.appendChild(name);

		const review = document.createElement("div");
		review.innerHTML = this.review;
		review.className = "ui segment reviewContent2";
		mainDiv.appendChild(review);

		const rating = document.createElement("div");
		rating.innerHTML = "⭐  " + this.rating;
		mainDiv.appendChild(rating);
	}
}
