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
        this.button_image = button_image;
    }

    render() {
        const mount = document.querySelector("#hero");
        mount.innerHTML = `
            <div class="min-h-screen flex items-center justify-center px-4 py-8">
                <div class="text-center max-w-4xl mx-auto space-y-6">
                    <img class="rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-cover mx-auto" src="${this.profile_image}" alt="profile image" style="max-width: 24% !important;">
                    <h1 class="font-pixel text-pink-accent text-5xl md:text-7xl lg:text-8xl font-normal animate-pulse">
                        ${this.name}
                    </h1>
                    <h2 class="font-roboto text-light-gray text-xl md:text-2xl font-medium">
                        ${this.tagline}
                    </h2>
                    <p class="font-roboto text-white text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6">
                        ${this.about}
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button class="font-pixel px-6 py-3 w-48 h-12 text-white hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-accent focus:ring-offset-2 focus:ring-offset-dark-bg transform"
                        style="background-image: url('${this.button_image}'); background-size: 100% 100%;">
                            <span class="font-normal text-white text-lg">View My Work</span>
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