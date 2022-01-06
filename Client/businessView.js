export class BusinessView {
    constructor(user) {
        this.container = null;
        this.username = null;
        this.user = user;
    }
    draw() {
        this.container = document.createElement("div");
        this.container.innerHTML = "Business view";
        document.body.appendChild(this.container);

        const testButton = document.createElement("button")
        testButton.innerHTML = "back";
        testButton.onclick = () => {
            document.body.removeChild(this.container);
            this.user.draw();
        }
        this.container.appendChild(testButton);
    }
}