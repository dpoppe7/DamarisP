// ============================
// Projects Component
// ============================
// Class: Projects
// Purpose: Display a list of project cards dynamically
// Inputs: 
//   - array of project objects {title, description, techStack, repoLink, liveDemo, image}
// Outputs: 
//   - HTML cards for each project
//   - Optional: animated entrance on scroll
// Methods:
//   - renderProjects(): create and insert project cards
//   - Upadted: loadProjects() fetches GitHub repos for my username
//   - filterProjects(): filter by tech stack or tag (DSA-lite practice)
// Dependencies: Dark Mode toggle class
import { Repository } from './repository.js'; 

export class Project extends Repository {
    constructor(name, description, updated_at, topics, html_url){
        super(name, description, updated_at, topics, html_url);
    }

    createElement(){
        const div = document.createElement("div");
        div.classList.add("group");
        div.innerHTML = `
            <div class="bg-card-bg rounded-xl p-6 shadow-md border border-border-color hover:border-light-gray transition-all duration-300 h-full flex flex-col hover:transform hover:scale-105">
                <h3 class="font-roboto text-white text-xl font-semibold mb-3">
                    ${this.name}
                </h3>
                <p class="font-roboto text-white text-base leading-relaxed mb-4 flex-grow">
                    ${this.description}
                </p>
                <div class="space-y-2 mb-4">
                    <p class="font-roboto text-light-gray text-sm">
                        <span class="font-medium">Last Updated:</span> ${this.getFormattedDate()}
                    </p>
                    ${this.topics && this.topics.length > 0 ? `
                        <div class="flex flex-wrap gap-2">
                            ${this.topics.map(topic => `
                                <span class="bg-border-color text-light-gray px-2 py-1 rounded-md text-xs font-medium border border-[#3a3f4e]">
                                    ${topic}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <a href="${this.html_url}" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center justify-center font-pixel bg-pink-accent text-dark-bg px-6 py-3 rounded-lg font-normal text-lg hover:bg-[#d89bc4] focus:outline-none focus:ring-2 focus:ring-pink-accent focus:ring-offset-2 focus:ring-offset-dark-bg w-full group-hover:scale-105 transition-transform duration-300">
                    <span>View Project</span>
                    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            </div>
        `;
        return div;
    }

    // Create element for spotlight carousel items (pinned repos)
    createSpotlightElement(){
        const div = document.createElement("div");
        div.classList.add("carousel-item");
        div.innerHTML = `
            <div class="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.01] transition-transform duration-300">
                <!-- Background with gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-br from-card-bg via-[#1e2332] to-[#2a2f3e] opacity-90"></div>
                
                <!-- Decorative Pattern/Image placeholder -->
                <div class="absolute inset-0 opacity-20">
                    <div class="w-full h-full bg-gradient-to-br from-pink-accent/20 via-transparent to-light-gray/10"></div>
                </div>
                
                <!-- Content -->
                <div class="relative z-10 p-12 h-full flex flex-col justify-center max-w-2xl">
                    <h3 class="text-5xl font-bold text-white mb-6 font-roboto capitalize">
                        ${this.name}
                    </h3>
                    <p class="text-xl text-white mb-6 font-roboto font-medium leading-relaxed">
                        ${this.description}
                    </p>
                    
                    <!-- Tech Stack -->
                    ${this.topics && this.topics.length > 0 ? `
                        <p class="text-sm font-bold text-[#64ffda] mb-8 font-roboto uppercase tracking-wide">
                            ${this.topics.join(' • ')}
                        </p>
                    ` : ''}
                    
                    <!-- Action Buttons -->
                    <div class="flex space-x-4">
                        <a href="${this.html_url}" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center px-6 py-3 bg-pink-accent text-dark-bg font-medium rounded-lg hover:bg-[#d89bc4] transition-colors duration-300">
                            <span class="font-roboto">View Repository</span>
                            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <!-- Decorative elements -->
                <div class="absolute top-8 right-8 opacity-10">
                    <svg class="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
                    </svg>
                </div>
            </div>
        `;
        return div;
    }

    static renderProjects(projects) {
        const mount = document.querySelector("#projects");
        if (!mount) return;

        // Create the container structure if it doesn't exist
        let container = mount.querySelector('.grid');
        if (!container) {
            mount.innerHTML = `
                <div class="mx-auto pt-16 max-w-[1000px] min-h-[50vh] px-4">
                    <h2 class="text-center mb-12 text-light-gray font-roboto text-3xl">Other Projects</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
                </div>
            `;
            container = mount.querySelector('.grid');
        } else {
            container.innerHTML = "";
        }
        const fragment = document.createDocumentFragment();
        projects.forEach(p => {
            const card = p.createElement();
            fragment.appendChild(card);
        });
        container.appendChild(fragment);
    }

    static renderSpotlightProjects(pinnedProjects) {
        const mount = document.querySelector("#projects");
        if (!mount) return;

        // Clear the projects section first, then add spotlight
        mount.innerHTML = '';

        // Create spotlight carousel structure
        const carouselHTML = `
            <div class="spotlight-section mx-auto pt-25 max-w-[1000px] min-h-[50vh] px-4">
                <div class="section-header mb-12">
                    <span class="section-title text-center block text-light-gray font-roboto text-3xl">/ featured projects</span>
                </div>
                
                <!-- Spotlight Carousel -->
                <div class="spotlight-carousel max-w-[1000px] mx-auto mb-16">
                    <div class="relative">
                        <div class="carousel-container overflow-hidden rounded-3xl">
                            <div class="carousel-track flex transition-transform duration-500 ease-in-out">
                                <!-- Spotlight items will be inserted here -->
                            </div>
                        </div>
                        
                        <!-- Navigation buttons -->
                        <button class="carousel-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <button class="carousel-next absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        
                        <!-- Indicators -->
                        <div class="carousel-indicators flex justify-center space-x-2 mt-6">
                            <!-- Indicators will be inserted here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert carousel
        mount.insertAdjacentHTML('afterbegin', carouselHTML);

        // Populate carousel
        const carouselTrack = mount.querySelector('.carousel-track');
        const carouselIndicators = mount.querySelector('.carousel-indicators');
        
        if (carouselTrack && pinnedProjects.length > 0) {
            pinnedProjects.forEach((project, index) => {
                // Add to carousel
                const spotlightElement = project.createSpotlightElement();
                spotlightElement.style.minWidth = '100%';
                carouselTrack.appendChild(spotlightElement);
                
                // Add indicator
                const indicator = document.createElement('button');
                indicator.className = `w-3 h-3 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-[#64ffda]' : 'bg-gray-400'}`;
                indicator.addEventListener('click', () => this.goToSlide(mount, index));
                carouselIndicators.appendChild(indicator);
            });

            // Initialize carousel functionality
            this.initializeCarousel(mount, pinnedProjects.length);
        }
    }

    static initializeCarousel(container, totalSlides) {
        console.log('Initializing carousel with', totalSlides, 'slides'); // Debug log
        
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
            let currentSlide = 0;
            const track = container.querySelector('.carousel-track');
            const prevBtn = container.querySelector('.carousel-prev');
            const nextBtn = container.querySelector('.carousel-next');
            const indicators = container.querySelectorAll('.carousel-indicators button');

            console.log('Track:', track, 'Prev:', prevBtn, 'Next:', nextBtn, 'Indicators:', indicators.length); // Debug log

            if (!track || !prevBtn || !nextBtn) {
                console.error('Carousel elements not found!');
                return;
            }

            const updateCarousel = () => {
                track.style.transform = `translateX(-${currentSlide * 100}%)`;
                indicators.forEach((indicator, index) => {
                    indicator.className = `w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === currentSlide ? 'bg-[#64ffda]' : 'bg-gray-400'
                    }`;
                });
                console.log('Updated to slide:', currentSlide); // Debug log
            };

            const goToSlide = (index) => {
                currentSlide = index;
                updateCarousel();
            };

            const nextSlide = () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            };

            const prevSlide = () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            };

            // Event listeners
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next clicked'); // Debug log
                nextSlide();
            });
            
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Prev clicked'); // Debug log
                prevSlide();
            });
            
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Indicator', index, 'clicked'); // Debug log
                    goToSlide(index);
                });
            });

            // Initialize first state
            updateCarousel();

            // Auto-slide (optional)
            let autoSlideInterval = setInterval(() => {
                console.log('Auto-slide to next'); // Debug log
                nextSlide();
            }, 5000);

            // Pause auto-slide on hover
            const carousel = container.querySelector('.spotlight-carousel');
            if (carousel) {
                carousel.addEventListener('mouseenter', () => {
                    console.log('Mouse enter - pausing auto-slide'); // Debug log
                    clearInterval(autoSlideInterval);
                });
                carousel.addEventListener('mouseleave', () => {
                    console.log('Mouse leave - resuming auto-slide'); // Debug log
                    autoSlideInterval = setInterval(() => {
                        nextSlide();
                    }, 5000);
                });
            }

            // Store the goToSlide function for external access
            this.goToSlide = (containerElement, index) => {
                if (containerElement === container) {
                    goToSlide(index);
                }
            };
        }, 100); // Small delay to ensure DOM is ready
    }
}