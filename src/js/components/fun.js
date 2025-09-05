import { Repository } from './repository.js'; 

export class FunProject extends Repository {
    constructor(name, description, topics, html_url){
        super(name, description, topics, html_url);
    }

    createElement(){
        const div = document.createElement("div");
        div.classList.add("group", "fun-project-card");
        
        div.innerHTML = `
            <div class="relative cursor-default flex flex-col h-full p-8 bg-card-bg bg-opacity-50 rounded-2xl border border-pastel-yellow border-opacity-60 transition-all duration-300 hover:-translate-y-2 hover:bg-card-bg hover:bg-opacity-75 hover:border-opacity-100">
                <!-- Card Header -->
                <div class="flex justify-between items-start mb-6 -mt-5 pt-5 border-b-0">
                    <div class="folder-icon">
                        <svg class="w-9 h-9 text-pink-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                    </div>
                    <div class="flex items-center space-x-3">
                        <a href="${this.html_url}" target="_blank" rel="noopener noreferrer" class="text-light-gray hover:text-pink-accent transition-colors duration-300">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <!-- Card Content -->
                <h3 class="text-white text-2xl font-bold mb-4 font-roboto">
                    ${this.name}
                </h3>
                <p class="text-light-gray text-lg mb-10 flex-grow font-roboto leading-relaxed">
                    ${this.description}
                </p>
                
                <!-- Topics/Tech Stack -->
                ${this.topics && this.topics.length > 0 ? `
                    <div class="text-light-gray text-base font-roboto">
                        ${this.topics.join(', ')}
                    </div>
                ` : ''}
            </div>
        `;

        return div;
    }

    static renderFunProjects(funProjects){
        const mount = document.querySelector("#fun-projects");
        if(!mount) return;

        // Create the container structure
        mount.innerHTML = `
            <div class="mx-auto pt-16 max-w-[1000px] min-h-[50vh] px-4">
                <h2 class="text-center mb-12 text-light-gray font-roboto text-3xl">Fun Projects</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Fun projects will be inserted here -->
                </div>
            </div>
        `;

        const container = mount.querySelector('.grid');
        const fragment = document.createDocumentFragment();
        
        funProjects.forEach(funProject => {
            const card = funProject.createElement();
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }
}