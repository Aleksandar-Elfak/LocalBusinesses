export class BusinessView {
  constructor(user) {
    this.container = null;
    this.username = null;
    this.user = user;
  }

  draw() {
    this.container = document.createElement("div");
    this.container.className = "businessView";
    document.body.appendChild(this.container);

    // const testButton = document.createElement("button");
    // testButton.innerHTML = "back";
    // testButton.onclick = () => {
    //   document.body.removeChild(this.container);
    //   this.user.draw();
    // };
    // this.container.appendChild(testButton);

    const leftDiv3 = document.createElement("div");
    leftDiv3.className = "leftDiv3";
    leftDiv3.classList.add("bigDiv3");
    this.container.appendChild(leftDiv3);

    const middleDiv3 = document.createElement("div");
    middleDiv3.classList.add("bigDiv3");
    middleDiv3.classList.add("middleDiv3");
    this.container.appendChild(middleDiv3);

    const rightDiv3 = document.createElement("div");
    rightDiv3.innerHTML = "rightDiv3";
    rightDiv3.classList.add("bigDiv3");
    rightDiv3.classList.add("rightDiv3");
    this.container.appendChild(rightDiv3);

    // tri glavna diva
    // pribavljanje informacija o biznisu
    fetch(
      `https://localhost:7294/Business/GetBusiness/${"Alex Hairstylist"}&${"Ana"}`
    ).then((p) => {
      p.json().then((data) => {
        this.drawLeftDiv(leftDiv3, data);
        this.drawMiddleDiv(middleDiv3, data.prices);
        console.log(data);
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
    description.classList.add("description3");
    description.classList.add("div3");
    leftDiv3.appendChild(description);

    // kontakt telefon
    const contact = document.createElement("div");
    contact.innerHTML = "Contact: " + data.contact;
    contact.classList.add("contact3");
    contact.classList.add("div3");
    leftDiv3.appendChild(contact);

    // adresa
    const address = document.createElement("div");
    address.innerHTML = "Address: " + data.address;
    address.classList.add("address3");
    address.classList.add("div3");
    leftDiv3.appendChild(address);
  }

  drawMiddleDiv(middleDiv3, data) {
    const reviewInput = document.createElement("div");
    reviewInput.innerHTML = "review input";
    middleDiv3.appendChild(reviewInput);

    const priceList = document.createElement("div");
    let price = data.split(",");
    for (let i = 0; i < price.length; i++) {
      priceList.innerHTML += price[i];
      priceList.innerHTML += "<br/ >";
      console.log(price[i]);
    }

    middleDiv3.appendChild(priceList);
  }
}
