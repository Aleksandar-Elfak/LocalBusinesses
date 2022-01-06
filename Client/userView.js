import { BusinessView } from "./businessView.js";
import { BusinessCard } from "./businessCard.js";

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

		const leftDiv2 = document.createElement("div");
		leftDiv2.className= "leftDiv2";
		this.container.appendChild(leftDiv2);

		const searchDiv2= document.createElement("div");
		searchDiv2.className = "searchDiv2";
		leftDiv2.appendChild(searchDiv2);

		const labSearch2 = document.createElement("label");
		labSearch2.innerHTML= "Search:";
		searchDiv2.appendChild(labSearch2);

		const inputSearch2 = document.createElement("input");
		inputSearch2.className="inputSearch2";
		searchDiv2.appendChild(inputSearch2);

		const buttonSearch2 = document.createElement("button");
		buttonSearch2.innerHTML = "Run";
		searchDiv2.appendChild(buttonSearch2);
		
		buttonSearch2.onclick = ()=>{
			const tag = this.container.querySelector(".inputSearch2").value;
			console.log(tag);
			fetch("https://localhost:7294/Business/SearchBusinesses/"+tag)
			.then(p=>
				{
					
					p.json().then(bus=>
						{
							bus.forEach(b => {
							
								const business= new BusinessCard(b.name, b.address, b.contact, b.description, b.img, b.prices, b.rating, b.type);
								//gradovi.push(grad);
								console.log(business);
								let businessCardDiv2 = document.createElement("div");
								businessCardDiv2.className = "businessCardDiv2";
								leftDiv2.appendChild(businessCardDiv2);
								business.draw(businessCardDiv2);

								businessCardDiv2.onclick = () => {
									alert("sear");
								}
							});
							//agencija.crtaj(agencija.kontejner, gradovi);
							
			
						})
		} ) }

		const middleDiv2 = document.createElement("div");
		middleDiv2.className= "middleDiv2";
		this.container.appendChild(middleDiv2);

		const recommendedDiv = document.createElement("div");
		recommendedDiv.innerHTML = "Recommended";
		middleDiv2.appendChild(recommendedDiv);

		fetch("https://localhost:7294/Business/GetRecommended/"+this.username)
			.then(p=>
				{
					
					p.json().then(bus=>
						{
							bus.forEach(b => {
							
								const business= new BusinessCard(b.name, b.address, b.contact, b.description, b.img, b.prices, b.rating, b.type);
								//gradovi.push(grad);
								console.log(business);
								let businessCardDiv2 = document.createElement("div");
								businessCardDiv2.className = "businessCardDiv2";
								middleDiv2.appendChild(businessCardDiv2);
								business.draw(businessCardDiv2);

								businessCardDiv2.onclick = () => {
									alert("rec");
								}
							});
							//agencija.crtaj(agencija.kontejner, gradovi);
							
			
						})
		} ) 




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
