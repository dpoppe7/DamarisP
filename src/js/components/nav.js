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
        this.logo_path = logo_path;
    }

    _generateLinksHtml(isMobile = false) {
        const mobileClass = isMobile ? 'block' : '';
        return this.links.map(link => `
            <li>
                <a href="${link.href}" class="${mobileClass} font-roboto text-light-gray 
                hover:text-pink-accent font-medium text-lg transition-colors duration-300">
                    ${link.text}
                </a>
            </li>
        `).join('');
    }

    render(){
        const mount = document.querySelector("#nav");
        mount.innerHTML = `
            <div class="flex items-center justify-between px-6 py-4 bg-dark-bg border-b border-border-color max-w-6xl mx-auto">
                <a href="#" class="flex items-center">
                    <img src="${this.logo_path}" alt="Home" class="w-10 h-10 text-light-gray hover:text-pink-accent hover:scale-110 
                    transition-transform duration-300" />
                </a>

                <ul class="hidden md:flex space-x-8 list-none">
                ${this._generateLinksHtml()}
                </ul>
                    
                <button class="md:hidden text-light-gray hover:text-pink-accent" id="mobile-menu-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" 
                    stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>

                </button>
                
                <div class="hidden md:hidden absolute top-full left-0 w-full bg-dark-bg border-t border-border-color" id="mobile-menu">
                    <ul class="py-4 px-6 space-y-4">
                        ${this._generateLinksHtml(true)}
                    </ul>
                </div>
            </div>
        `;
        this.addMobileMenuListener();
    }

    addMobileMenuListener() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
}