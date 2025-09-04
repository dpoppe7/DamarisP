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
//      - Upadted: loadProjects() fetches GitHub repos for my username
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

    static renderProjects(projects) {
        const mount = document.querySelector("#projects");
        if (!mount) return;
        // Create the container structure if it doesn't exist
        let container = mount.querySelector('.grid');
        if (!container) {
            mount.innerHTML = `
                <h2 class="text-center mb-12 text-light-gray font-roboto">Projects</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
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
}