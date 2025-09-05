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
    constructor(navLinks, socialData) {
      this.navLinks = navLinks;
      this.socialData = socialData;
    }

    render() {
      const mount = document.querySelector("#nav");
      mount.innerHTML = `
        <div class="nav-container">
          <!-- Logo Icon: Hidden on mobile, redirects to hero page -->
          <div> 
            <a href="#" class="nav-logo">
              <img src="./src/assets/icon.svg" alt="Home"/>
            </a>
          </div>

          <!-- Vertical line -->
          <div class="nav-line-decor"></div>

          <!-- Navigation Links: Hidden on mobile -->
          <div> 
            <ul class="nav-links">
              ${this.navLinks.map(link => `
                <li class="nav-link">
                  <a href="${link.page}">${link.text}</a>
                </li>
              `).join('')}
            </ul> 
          </div>

          <!-- Vertical line -->
          <div class="nav-line-decor"></div>

          <!-- Social Links: Icons always visible -->
          <div>
            <ul class="social-links">
              ${this.socialData.map(social => `
                <li class="social-link">
                  <a href="${social.link}" target="_blank">
                    <i class="fab fa-${social.platform.toLowerCase()} text-xl"></i>
                  </a>
                </li>
              `).join('')}
            </ul> 
          </div>

          <!-- Vertical line -->
          <div class="nav-line-decor"></div>
        </div>
      `;
    }
}