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

export const styles = {
  // Navigation styles
  nav: {
    container: 'flex items-center justify-between px-6 py-4 bg-dark-bg border-b border-border-color max-w-6xl mx-auto',
    logo: 'w-10 h-10 text-light-gray hover:text-pink-accent hover:scale-110 transition-transform duration-300',
    links: 'hidden md:flex space-x-8 list-none',
    link: 'font-roboto text-light-gray hover:text-pink-accent font-medium text-lg transition-colors duration-300 cursor-pointer',
    mobileBtn: 'md:hidden text-light-gray hover:text-pink-accent',
    mobileMenu: 'hidden md:hidden absolute top-full left-0 w-full bg-dark-bg border-t border-border-color z-50'
  },

  // Hero styles
  hero: {
    container: 'min-h-screen flex items-center justify-center px-4 py-8',
    content: 'text-center max-w-4xl mx-auto space-y-6',
    image: 'rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-cover mx-auto',
    title: 'font-pixel text-pink-accent text-5xl md:text-7xl lg:text-8xl font-normal animate-pulse',
    subtitle: 'font-roboto text-light-gray text-xl md:text-2xl font-medium',
    description: 'font-roboto text-white text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6',
    buttonContainer: 'flex flex-col sm:flex-row gap-4 justify-center mt-8',
    primaryBtn: 'font-pixel px-6 py-3 w-48 h-12 text-white hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-accent focus:ring-offset-2 focus:ring-offset-dark-bg transform',
    secondaryBtn: 'font-pixel border-2 border-light-gray text-light-gray px-6 py-3 rounded-lg font-normal text-lg hover:border-pink-accent hover:text-pink-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-light-gray focus:ring-offset-2 focus:ring-offset-dark-bg'
  },

  // Project carousel styles
  carousel: {
    container: 'relative w-full max-w-6xl mx-auto mb-12',
    slider: 'relative overflow-hidden rounded-xl bg-card-bg',
    track: 'flex transition-transform duration-500 ease-in-out',
    slide: 'min-w-full relative',
    image: 'w-full h-96 object-cover',
    overlay: 'absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/50 to-transparent',
    content: 'absolute bottom-0 left-0 right-0 p-8 text-white',
    title: 'font-pixel text-2xl md:text-3xl text-pink-accent mb-2',
    description: 'font-roboto text-lg mb-4 max-w-2xl',
    techStack: 'font-roboto text-sm text-light-gray mb-4',
    links: 'flex gap-4',
    link: 'inline-flex items-center font-pixel bg-pink-accent text-dark-bg px-4 py-2 rounded-lg hover:bg-[#d89bc4] transition-colors duration-300',
    controls: 'absolute top-1/2 -translate-y-1/2 bg-dark-bg/80 text-white p-2 rounded-full hover:bg-dark-bg transition-colors duration-300',
    prevBtn: 'left-4',
    nextBtn: 'right-4',
    indicators: 'flex justify-center space-x-2 mt-6',
    indicator: 'w-3 h-3 rounded-full transition-colors duration-300',
    indicatorActive: 'bg-pink-accent',
    indicatorInactive: 'bg-light-gray/30'
  },

  // Project card styles
  projectCard: {
    container: 'bg-card-bg rounded-xl p-6 shadow-md border border-border-color hover:border-light-gray transition-all duration-300 h-full flex flex-col hover:transform hover:scale-105 group',
    title: 'font-roboto text-white text-xl font-semibold mb-3',
    description: 'font-roboto text-white text-base leading-relaxed mb-4 flex-grow',
    meta: 'space-y-2 mb-4',
    date: 'font-roboto text-light-gray text-sm',
    topics: 'flex flex-wrap gap-2',
    topic: 'bg-border-color text-light-gray px-2 py-1 rounded-md text-xs font-medium border border-[#3a3f4e]',
    button: 'inline-flex items-center justify-center font-pixel bg-pink-accent text-dark-bg px-6 py-3 rounded-lg font-normal text-lg hover:bg-[#d89bc4] focus:outline-none focus:ring-2 focus:ring-pink-accent focus:ring-offset-2 focus:ring-offset-dark-bg w-full group-hover:scale-105 transition-transform duration-300'
  },

  // Section styles
  section: {
    container: 'min-h-screen py-16 px-6',
    content: 'max-w-6xl mx-auto',
    title: 'font-pixel text-pink-accent text-4xl md:text-5xl text-center mb-12',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'
  },

  // Page navigation
  page: {
    hidden: 'hidden',
    visible: 'block',
    transition: 'transition-opacity duration-500 ease-in-out'
  }
};

// ============================
// Enhanced Navigation Component
// ============================

export class Nav {
    constructor(links, logo_path) {
        this.links = links;
        this.logo_path = logo_path;
        this.currentPage = 'home';
    }

    _generateLinksHtml(isMobile = false) {
        const mobileClass = isMobile ? 'block py-2' : '';
        return this.links.map(link => `
            <li>
            <button data-page="${link.page}" class="${styles.nav.link} ${mobileClass}">
                ${link.text}
            </button>
            </li>
        `).join('');
    }

    render() {
        const mount = document.querySelector("#nav");
        mount.innerHTML = `
        <div class="${styles.nav.container}">
            <button data-page="home" class="flex items-center">
            <img src="${this.logo_path}" alt="Home" class="${styles.nav.logo}" />
            </button>

            <ul class="${styles.nav.links}">
                ${this._generateLinksHtml()}
            </ul>
                
            <button class="${styles.nav.mobileBtn}" id="mobile-menu-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" 
            stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
            </button>
            
            <div class="${styles.nav.mobileMenu}" id="mobile-menu">
            <ul class="py-4 px-6 space-y-4">
                ${this._generateLinksHtml(true)}
            </ul>
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