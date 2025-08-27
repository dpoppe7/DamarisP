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

    // - render() method to insert HTML into the DOM
    render(){
        //grab mount point
        const mount = document.querySelector("#hero");
        mount.innerHTML = `
            <h1>${this.name}<h1/>
            <h2>${this.tagline}<h2/>
            <p>${this.about}<p/>
        `;

    }

    // - animate() method for scroll/entry animations
    animate(){
        const mount = document.querySelector("#hero h1");
        mount.classList.add("fade-in");
    }
} 