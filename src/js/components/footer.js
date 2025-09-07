export class Footer {
    render() {
        const footerContainer = document.getElementById('footer');

        footerContainer.innerHTML = `
            <img src="src/assets/girl.gif" alt="girl-gif" class="girl-gif"/>
            <p class="made-by">Made with 🩷 by Damaris. 2025</p>
        `;     
    }
}