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
    constructor(links) {
      // { text: "Projects", href: "#projects" }
      this.links = links;
    }

    _generateLinksHtml(isMobile = false) {
      return this.links.map(link => `
          <li>
            <button data-page="${link.page}" class="nav-link">
                ${link.text}
            </button>
          </li>
      `).join('');
    }

    render() {
      const mount = document.querySelector("#nav");
      mount.innerHTML = `
      <div class="nav-container">
        <div> 
          <a href="#" class="nav-logo">
            <img src="./src/assets/icon.svg" alt="Home" class="nav-logo"/>
          </a>
        </div>

        <div> 
          <ul class="nav-links">
            ${this.links.map(link => `
              <li class="nav-link">
                <a href="${link.page}">${link.text}</a>
              </li>
            `).join('')}
          </ul> 
        </div>
         
        <div class="mobile-menu-wrapper">
          <button class="mobile-menu-btn" id="mobile-menu-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke-width="2" 
            stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
          </button>
            
          <div class="mobile-menu hidden" id="mobile-menu">
            <ul class="mobile-links">
                ${this._generateLinksHtml(true)}
            </ul>
          </div>
        </div>
        
      </div>
      `;
      this.addEventListeners();
    }

    addEventListeners() {
      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      
      if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.addEventListener('click', () => {
              mobileMenu.classList.toggle('hidden');
          });
      }
    }
}