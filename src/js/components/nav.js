// // ============================
// // Nav Component
// // ============================

// // Class: Nav
// // Purpose: Display the nav bar items
// // Inputs: 
// //   - projects (string)
// //   - fun (string)
// //   - logo/icon (string - path to file)
// // Outputs: 
// //   - navbar html
// // Methods:
// //   - render(): display the hero section on the page
// // Dependencies: Dark Mode toggle class

export class Nav {
    constructor(links, logo_path) {
        this.links = links;
        this.logo_path = this.logo_path;
    }

    // - render() method to insert HTML into the DOM
    render(){
        //grab mount point
        const mount = document.querySelector("#nav");
        mount.innerHTML = `
            <div class="navbar">
                <a href="#" class="logo">
                    <img src="${this.logo_path}" alt="Home" />
                </a>
                <ul class="nav-links">
                    ${this.links.map(link => `
                        <li><a href="${link.href}">${link.text}</a></li>
                    `).join('')}
                </ul>
            </div>
        `;

    }

    // - animate() method for scroll/entry animations
} 