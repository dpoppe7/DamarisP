export class IntroAnimation {
    render() {
        const introContainer = document.getElementById("intro");
        const body = document.body;

        // scroll hidden while the intro is displayed
        body.style.overflow = "hidden"; 

        introContainer.classList.add("intro-fade-out");

        introContainer.addEventListener("animationend", () => {
            
            introContainer.remove(); // removes the container from the DOM
            
            // Re-enable scrolling on the body
            body.style.overflow = "";
        });
    }
}
