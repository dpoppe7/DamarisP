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


    // Create element for spotlight carousel items (pinned repos)
    createSpotlightElement(){
        const div = document.createElement("div");
        div.classList.add("carousel-item");
        div.innerHTML = `
            <div class="relative flex justify-center w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.01] transition-transform duration-300">
                <div class="absolute inset-0 bg-gradient-to-br from-card-bg opacity-90"></div>
                
                <!-- Image  -->
                <div class="absolute inset-0 opacity-20">
                </div>
                
                <!-- Content -->
                <div class="relative z-10 p-12 h-full flex flex-col justify-center items-center max-w-2xl">
                    <h3 class="text-4xl font-bold text-white mb-6 font-pixel capitalize">
                        ${this.name}
                    </h3>
                    <p class="text-center mb-6 leading-relaxed">
                        ${this.description}
                    </p>
                    
                    <!-- Tech Stack -->
                    ${this.topics && this.topics.length > 0 ? `
                        <p class="text-center text-sm font-bold text-pastel-yellow mb-8 font-inria uppercase tracking-wide">
                            ${this.topics.join(' • ')}
                        </p>
                    ` : ''}

                    <!-- link to Project Display -->
                    <div class="flex justify-center items-center space-x-4 mb-6 -mt-5 pt-5 border-b-0">
                        <!-- Live Demo Icon -->
                        <div class="link-icon">
                            <a href="${this.live_url}" target="_blank" rel="noopener noreferrer" class="text-pink-accent hover:text-light-gray transition-colors duration-300">
                                <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </a>
                        </div>
                        
                        <!-- GitHub Icon -->
                        <div>
                            <a href="${this.link}" target="_blank" class="text-light-gray hover:text-pink-accent transition-colors duration-300">
                                <i class="fab fa-github text-2xl"></i>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        `;
        return div;
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
                    <h1 class="section-title text-start block">Projects</h1>
                </div>
                
                <!-- Spotlight Carousel -->
                <div class="spotlight-carousel max-w-[1000px] mx-auto mb-16">
                    <div class="relative">
                        <div class="carousel-container overflow-hidden rounded-3xl border border-pastel-yellow">
                            <div class="carousel-track flex transition-transform duration-500 ease-in-out">
                                <!-- Spotlight items will be inserted here -->
                            </div>
                        </div>
                        
                        <!-- Navigation buttons -->
                        <button class="carousel-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-pastel-yellow p-3 rounded-full transition-colors duration-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <button class="carousel-next absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-pastel-yellow p-3 rounded-full transition-colors duration-300">
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
                indicator.className = `w-5 h-1 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-pink-accent' : 'bg-dim-gray'}`;
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
                    indicator.className = `w-5 h-1  rounded-full transition-colors duration-300 ${
                        index === currentSlide ? 'bg-pink-accent' : 'bg-dim-gray'
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