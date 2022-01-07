export class UserReview {
	constructor(name, review, rating, username = null) {
		this.name = name;
		this.review = review;
		this.rating = rating;
		this.username = username;
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

		const bottom = document.createElement("div");
		bottom.className = "userReviewBottom";
		mainDiv.appendChild(bottom);

		const rating = document.createElement("div");
		rating.innerHTML = "⭐  " + this.rating;
		bottom.appendChild(rating);

		const b = document.body.querySelector(".bigDiv3");

		const deleteButton = document.createElement("button");
		deleteButton.innerHTML = "DELETE";
		deleteButton.className = "ui button red tiny";
		if (b != null) deleteButton.className = "hidden2";

		deleteButton.onclick = () => {
			if (b == null) {
				fetch(
					`https://localhost:7294/Business/DeleteReview/${this.username}&${this.name}`,
					{
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					}
				).then((p) => {
					host.removeChild(mainDiv);
				});
			}
		};
		bottom.appendChild(deleteButton);
	}
}
