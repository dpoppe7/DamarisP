// ============================
// Hero Component
// ============================
// Class: Hero
// Purpose: Display the hero section with name, tagline, and animated illustration
// Inputs:
// - name (string)
// - tagline (string)
// - about (string)
// Outputs:
// - HTML for hero section
// - Optional: animation trigger
// Methods:
// - render(): display the hero section on the page
// - animate(): trigger animations (optional, e.g., scroll or load)
// Dependencies: Dark Mode toggle class

export class Hero {
    constructor(profile_image, name, tagline) {
        this.profile_image = profile_image;
        this.name = name;
        this.tagline = tagline;
    }

    render() {
        const mount = document.querySelector("#hero");
        mount.innerHTML = `
            <div class="hero-container">
                <div class="img-wrapper">
                <div class="border-spin"></div>
                <img class="hero-profile-img" src="${this.profile_image}" alt="profile image">
                </div>
                
                
                <h1>
                    ${this.name}
                </h1>
                <h3>
                    ${this.tagline}
                </h3>

                <button class="button-custom">
                    <a href="#projects">View My Work</a>
                </button>

            </div>
        `;
    }
}