// // ============================
// // Hero Component
// // ============================

// // Class: Hero
// // Purpose: Display the hero section with name, tagline, and animated illustration
// // Inputs: 
// //   - name (string)
// //   - tagline (string)
// //   - about (string)
// // Outputs: 
// //   - HTML for hero section
// //   - Optional: animation trigger
// // Methods:
// //   - render(): display the hero section on the page
// //   - animate(): trigger animations (optional, e.g., scroll or load)
// // Dependencies: Dark Mode toggle class

export class Hero {
    constructor(name, tagline, about) {
        this.name = name;
        this.tagline = tagline;
        this.about = about;
    }

    render(){
        const mount = document.querySelector("#hero");
        mount.innerHTML = `
            <div class="text-center max-w-4xl mx-auto space-y-6">
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
                    <button class="font-pixel bg-pink-accent text-dark-bg px-6 py-3 rounded-lg font-normal text-lg hover:bg-[#d89bc4] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-accent focus:ring-offset-2 focus:ring-offset-dark-bg">View My Work</button>
                    <button class="font-pixel border-2 border-light-gray text-light-gray px-6 py-3 rounded-lg font-normal text-lg hover:border-pink-accent hover:text-pink-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-light-gray focus:ring-offset-2 focus:ring-offset-dark-bg">Get In Touch</button>
                </div>
            </div>
        `;
    }

    animate(){
        const mount = document.querySelector("#hero h1");
        mount.classList.add("animate-fade-in-up");
    }
}