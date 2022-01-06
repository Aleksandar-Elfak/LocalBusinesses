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
        loginDiv.innerHTML = "aaaaaaaaaaaaaaaaaaaaaa";
        left.appendChild(loginDiv);

        const right = document.createElement("div");
        right.className = "rightDiv1";
        this.container.appendChild(right);

        const rightImg = document.createElement("img");
        rightImg.className = "img1";
        rightImg.src = "img1.png"
        right.appendChild(rightImg);


        //deo gde se crta user ili biznis

        const testButton = document.createElement("button")
        testButton.innerHTML = "User";
        testButton.onclick = () => {
            document.body.removeChild(this.container);
            let u = new UserView(this);
            u.draw();
        }
        right.appendChild(testButton);
    }
}
