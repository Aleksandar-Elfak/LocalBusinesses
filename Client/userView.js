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

		const topDiv2 = document.createElement("div");
		topDiv2.className = "topDiv2";
		this.container.appendChild(topDiv2);

		const leftDiv2 = document.createElement("div");
		leftDiv2.className= "leftDiv2";
		topDiv2.appendChild(leftDiv2);

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
									document.body.removeChild(this.container);
									let u = new BusinessView(this);
									u.draw();
								}
							});
							//agencija.crtaj(agencija.kontejner, gradovi);
							
			
						})
		} ) }

		const middleDiv2 = document.createElement("div");
		middleDiv2.className= "middleDiv2";
		topDiv2.appendChild(middleDiv2);

		const recommendedDiv2 = document.createElement("h3");
		recommendedDiv2.innerHTML = "Recommended";
		recommendedDiv2.className= "recommendedDiv2";
		middleDiv2.appendChild(recommendedDiv2);

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
									document.body.removeChild(this.container);
									let u = new BusinessView(this);
									u.draw();
								}
							});
							//agencija.crtaj(agencija.kontejner, gradovi);
							
			
						})
		} ) 



		const botDiv2 = document.createElement("div");
		botDiv2.className = "botDiv2";
		this.container.appendChild(botDiv2);

		const backButton2 = document.createElement("button");
		backButton2.innerHTML = "back";
		backButton2.onclick = () => {
			document.body.removeChild(this.container);
			this.start.draw(document.body);
		};
		this.container.appendChild(backButton2);

		
	}
}
