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
    constructor(profile_image, name, tagline, about, button_image) {
        this.profile_image = profile_image;
        this.name = name;
        this.tagline = tagline;
        this.about = about;
    }

    render() {
        const mount = document.querySelector("#hero");
        mount.innerHTML = `
            <div class="">
                <div class="">
                    <img class="" src="${this.profile_image}" alt="profile image" style="max-width: 24% !important;">
                    <h1 class="">
                        ${this.name}
                    </h1>
                    <h2 class="">
                        ${this.tagline}
                    </h2>
                    <p class="">
                        ${this.about}
                    </p>
                    <div class="">
                        <button class=""
                                style="background-image: url('./src/assets/images/button.png'); background-size: 100% 100%;">
                            <span class="font-normal text-white text-lg">View My Work</span>
                        </button>
                        <button class="">
                            Get In Touch
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    animate() {
        const mount = document.querySelector("#hero h1");
        if (mount) {
            mount.classList.add("animate-fade-in-up");
        }
    }
}